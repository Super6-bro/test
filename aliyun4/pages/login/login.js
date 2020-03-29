// pages/login/login.js
var url = getApp().globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button'),
    disabled:true,
    show: false,
    btn: [{
      text: '确定'
    }],
    openid: '',
    wechat_name: '',
    phone: '',
    sex: null,
    city: '',
    create_time: '',
    frequency: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this

    //加载中
    wx.showToast({
      title: '疯狂访问服务器',
      icon: 'loading',
      duration: 100000,
      mask:true
    })

    //判断是否来过
    wx.login({
      success: function (e) {
        // console.log(e)

        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            // console.log(res.userInfo)
            let info = res.userInfo

            //用code换openID
            wx.request({
              url: url+'user/getOpenID',
              data: {
                code: e.code
              },
              success: function (data) {
                // console.log(data.data)

                //判断是否授权
                wx.request({
                  url: url+'user/findUserByOpendId',
                  data: {
                    openid: data.data
                  },
                  success: function (id) {
                    // console.log(id.data.openid)

                    //如果来过修改信息进入下一个页面
                    if (id.data.openid != null && id.data.openid != ""){
                      that.gettime()
                      wx.request({
                        url: url+'user/updateUserById',
                        method: "post",
                        data:{
                          openid: id.data.openid,
                          wechat_name: info.nickName,//'PGone',
                          sex: info.gender,//1,
                          city: info.city,//'地球',
                          frequency: id.data.frequency+1,
                          new_time: that.data.create_time
                        },
                        success:function(res){
                          // console.log(res)
                          if(res.data > 0){
                            wx.switchTab({
                              url: '../2test/2test',
                            })
                          }
                        }
                      })
                    }else{
                      wx.hideToast(),
                      that.setData({
                        disabled:false
                      })
                      console.log(that.data.disabled)
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  //登录
  login: function() {
    var that = this
    
    //获取js.code
    wx.login({
      success: function(e) {
        // console.log(e)
        //获取用户信息
        wx.getUserInfo({
          success: function(res) {
            // console.log(res.userInfo)
            let info = res.userInfo
            that.setData({
              wechat_name: info.nickName,
              sex: info.gender,
              city: info.city
            })
            //用code换openID
            wx.request({
              url: url+'user/getOpenID',
              data: {
                code: e.code
              },
              success: function(data) {
                // console.log(data.data)
                that.setData({
                  openid: data.data
                })
              }
            })
          }
        })
      }
    })
  },

  //展开弹窗
  showtrue: function() {
    var that = this
    that.login()
    this.setData({
      show: true
    })
  },

  //获取时间
  gettime:function(){
    let that = this

    //得到创建时间
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    if (h < 10) {
      h = "0" + h
    }
    if (m < 10) {
      m = "0" + m
    }
    if (s < 10) {
      s = "0" + s
    }
    let time = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s
    // console.log(time)
    that.setData({
      create_time: time
    })
  },

  //确定按钮
  show_state: function() {
    let that = this
    let td = that.data

    //获取时间
    that.gettime()

    //电话校验
    let phone = td.phone
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      console.log("输入有误")
      that.setData({
        phone: null
      })
      wx.showToast({
        title: '请输入正确的手机号码哦',
        image: '../../images/wrong.png',
      })
      return false;
    } else {
      var user = {
        openid: td.openid,
        wechat_name: td.wechat_name,
        phone: td.phone,
        sex: td.sex,
        city: td.city,
        create_time: td.create_time,
        frequency: td.frequency
      }
      //提交用户信息
      wx.request({
        url: url+'user/addUser',
        method: "post",
        data: user,
        success: function(res) {
          // console.log(res.data)

          //判断是否提交成功
          if(res.data = 1){
            //进入下一个页面
            wx.switchTab({
              url: '../2test/2test'
            })
          }else{
            wx.showToast({
              title: '登录失败',
              image: '../../images/wrong.png',
            })
            return false
          }
        }
      })
    }

    //关闭弹窗
    this.setData({
      show: false
    })
  },

  //获取输入值
  phonenumber: function(e) {
    let that = this
    // console.log(e.detail.value)
    that.setData({
      phone: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})