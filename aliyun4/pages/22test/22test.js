// pages/22test/22test.js
var url = getApp().globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testpaper_id: null,
    index: 0,
    count: null,
    judge: "",
    itemType: null,
    optionsType: 0,
    bottom_show: null,
    next_hidden: false,
    sub_hidden: true,
    checked: false,
    disabled: false,
    achievement: 0,
    subChecked: '',
    page: 1,
    to: null,
    itembank: [],
    hours: 0, // 时
    minute: 0, // 分
    second: 0, // 秒
    h: 0,
    m: 0,
    s: 0,
    feed_class: "",
    answer_class: "",
    again_class: "",
    feed_content: '',
    feed_time: '',
    openid: '',
    done: null,
    not_done: null,
  },

  //计时器
  time: function() {
    var that = this
    setInterval(function() {
      that.setData({
        second: that.data.second + 1,
        s: that.data.s + 1
      })
      if (that.data.second == 60) {
        that.setData({
          minute: that.data.minute + 1,
          second: 0,
          m: that.data.m + 1,
          s: 0
        })
      }
      if (that.data.minute == 60) {
        that.setData({
          hours: that.data.hours + 1,
          minute: 0,
          h: that.data.h + 1,
          m: 0
        })
      }
      // console.log(that.data.hours + ':' + that.data.minute + ':' + that.data.second)
    }, 1000)
  },

  //请求题目
  request: function() {
    var that = this
    wx.request({
      url: url + 'itembank/findItembankAll',
      data: {
        testpaper_id: that.data.testpaper_id,
        page: that.data.page,
        limit: 10,
      },
      success: function(res) {
        that.setData({
          itembank: that.data.itembank.concat(res.data)
        })
        // console.log(that.data.itembank)
        that.changeItemType()
      }
    })
  },

  //跳成绩页面
  toAch: function() {
    wx.reLaunch({
      url: '/pages/conclude/conclude?achievement=' + this.data.achievement + '&certificate_id=' + this.data.certificate_id + '&testpaper_id=' + this.data.testpaper_id,
    })

    //提交成绩
    wx.request({
      url: '',
      data: {

      },
      success: function(res) {
        if (res.data = 1) {
          console.log("提交成功")
        } else {
          console.log("失败")
        }
      }
    })
  },

  //单选选择事件
  radioValue: function(e) {
    var that = this
    var td = that.data
    this.setData({
      subChecked: e.detail.value
    })
    // console.log(td.itembank[td.index].answer)
    if (e.detail.value == td.itembank[td.index].answer) {
      that.setData({
        //判断对错
        judge: "正确",
        //总成绩加分
        achievement: td.achievement + td.itembank[td.index].score
      })
    } else {
      that.setData({
        judge: "错误"
      })
    }
    //一次性选择  其他按钮无效
    that.setData({
      disabled: true
    })
  },

  //多选选择事件
  checkValue: function(e) {
    console.log(e)
  },

  //显示纠错
  feed: function() {
    var that = this
    if (that.data.bottom_show == 0) {
      that.setData({
        bottom_show: null,
        feed_class: ""
      })
    } else {
      that.setData({
        bottom_show: 0,
        feed_class: "botton_active",
        answer_class: "",
        again_class: "",
      })
    }
  },

  //显示解析
  answer: function() {
    var that = this
    if (that.data.bottom_show == 1) {
      that.setData({
        bottom_show: null,
        answer_class: "",
      })
    } else {
      that.setData({
        bottom_show: 1,
        feed_class: "",
        answer_class: "botton_active",
        again_class: "",
      })
    }
  },

  //显示重复
  again: function() {
    var that = this
    if (that.data.bottom_show == 2) {
      that.setData({
        bottom_show: null,
        again_class: "",
      })
    } else {
      that.setData({
        bottom_show: 2,
        feed_class: "",
        answer_class: "",
        again_class: "botton_active",
      })
    }
  },

  //下一题
  next: function() {
    var that = this
    var td = that.data

    //判断是否完成选择
    if (td.judge == "") {
      //提示
      wx.showModal({
        title: '提示',
        content: '还没有选择，是否进入下一题',
        success: function(res) {
          if (res.confirm) {
            // console.log("确定")
            that.next_content()
            that.setData({
              not_done: td.not_done + 1
            })
          } else if (res.cancel) {
            // console.log("取消")
            return false
          }
        }
      })
    } else {
      that.next_content()
    }
  },

  //下一题执行内容
  next_content: function() {
    var that = this
    var td = that.data

    //懒加载
    if (that.data.index + 3 == that.data.itembank.length) {
      that.setData({
        page: that.data.page + 1
      })
      that.request();
      // console.log(that.data.itembank)
    }

    //初始化
    that.setData({
      index: td.index + 1,
      feed_hidden: true,
      answer_hidden: true,
      again_hidden: true,
      judge: "",
      checked: false,
      disabled: false,
      subChecked: '',
      s: 0,
      m: 0,
      h: 0,
      done: td.done + 1
    })

    //判断是否为最后一题
    if (td.itembank.length == td.index + 1) {
      that.setData({
        sub_hidden: false,
        next_hidden: true
      })
    } else {
      that.setData({
        sub_hidden: true,
        next_hidden: false
      })
    }
    // console.log(td.itembank)
  },

  //获取总题数
  count: function() {
    var that = this
    wx.request({
      url: url + 'itembank/finditembankCountByTestpaperId',
      data: {
        testpaper_id: that.data.testpaper_id
      },
      success: function(res) {
        // console.log(res.data)
        that.setData({
          count: res.data
        })

        //动态设置标题
        wx.setNavigationBarTitle({
          title: '阿里云ACP云计算' + "(" + that.data.count + ")",
        })
        // console.log(that.data.count)
      }
    })
  },

  //判断题目类型
  changeItemType: function() {
    var that = this
    var td = that.data
    var itemUrl = td.itembank[td.index].quote
    if (itemUrl == null || itemUrl == "") {
      return false
    }
    if (itemUrl.indexOf(".jpg") > -1 || itemUrl.indexOf(".png") > -1) {
      that.setData({
        itemType: 0
      })
    } else if (itemUrl.indexOf(".mp3") > -1 || itemUrl.indexOf(".rmvb") > -1) {
      that.setData({
        itemType: 1
      })
    } else if (itemUrl.indexOf(".mp4") > -1 || itemUrl.indexOf(".avi") > -1) {
      that.setData({
        itemType: 2
      })
    }
  },

  //判断多单选
  changeOptionsType: function() {
    var that = this
  },

  //选题
  //输入题号
  to: function(e) {
    // console.log(e.detail.value)
    var that = this
    that.setData({
      to: Number(e.detail.value)
    })
  },

  //执行跳转
  jump: function() {
    var that = this
    if (that.data.to == 0 || that.data.to == null || !(/\S/.test(that.data.to)) || !(/^\S/.test(that.data.to))) {
      wx.showToast({
        title: '请输入正确的值',
        image: '../../images/wrong.png',
      })
      return false
    }
    wx.request({
      url: url + 'itembank/findItembankAndOptionsById',
      data: {
        testpaper_id: that.data.testpaper_id,
      },
      success: function(res) {
        // console.log(res.data)
        if (that.data.itembank.length == that.data.count) {
          that.setData({
            index: that.data.to - 1
          })
        } else {
          that.setData({
            itembank: res.data,
            index: that.data.to - 1
          })
          // console.log(that.data.itembank)
        }
        that.setData({
          to: null
        })

        //判断是否为最后一题
        if (that.data.itembank.length == that.data.index + 1) {
          that.setData({
            sub_hidden: false,
            next_hidden: true
          })
        } else {
          that.setData({
            sub_hidden: true,
            next_hidden: false
          })
        }
        // console.log(res.data)
        // console.log(that.data.itembank)
      }
    })
  },

  //获取时间
  gettime: function() {
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
      feed_time: time
    })
  },

  //获取纠错反馈
  getfeed: function(e) {
    let that = this
    // console.log(e.detail.value)
    that.setData({
      feed_content: e.detail.value
    })
  },

  //提交纠错反馈
  subfeed: function() {
    let that = this

    //判断输入值
    if (that.data.feed_content.length == 0 || !(/\S/.test(that.data.feed_content)) || !(/^\S/.test(that.data.feed_content))) {
      wx.showToast({
        title: '请输入正确的值',
        image: '../../images/wrong.png',
      })
      return false
    }
    //获得提交时间
    that.gettime()

    //获取openid
    wx.login({
      success: function(e) {
        // console.log(e)
        //用code换openID
        wx.request({
          url: 'http://192.168.0.104:8080/yunitembank/user/getOpenID',
          data: {
            code: e.code
          },
          success: function(data) {
            // console.log(data.data)
            that.setData({
              openid: data.data
            })

            //传纠错值
            // console.log(that.data.feed_content + " " + that.data.feed_time + " " + that.data.openid)
            wx.request({
              url: url + 'feedback/addFeedback',
              method: 'post',
              data: {
                feedback_content: that.data.feed_content,
                feedback_time: that.data.feed_time,
                openid: that.data.openid
              },
              success: (res) => {
                // console.log(res)
                if (res.data = 1) {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success'
                  })
                } else {
                  wx.showToast({
                    title: '提交失败',
                    image: '../../images/wrong.png',
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var prevExitState = that.exitState // 尝试获得上一次退出前 onSaveExitState 保存的数据
    if (prevExitState !== undefined) { // 如果是根据 restartStrategy 配置进行的冷启动，就可以获取到
      that.setData({
        testpaper_id: prevExitState.testpaper_id,
        index: prevExitState.index,
        count: prevExitState.count,
        achievement: prevExitState.achievement,
        itembank: prevExitState.itembank,
        hours: prevExitState.hours,
        minute: prevExitState.minute,
        second: prevExitState.second,
        h: prevExitState.h,
        m: prevExitState.m,
        s: prevExitState.s,
        openid: prevExitState.openid,
        done: prevExitState.done,
        not_done: prevExitState.not_done,

      })
      // console.log(prevExitState)
    }
    that.setData({
      testpaper_id: Number(options.testpaper_id)
    })
    that.request();
    that.count();
    that.time();
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
   * 生命周期函数--保存退出状态
   */
  onSaveExitState: function() {
    let that = this
    var exitState = {
      testpaper_id: that.data.testpaper_id,
      index: that.data.index,
      count: that.data.count,
      achievement: that.data.achievement,
      itembank: that.data.itembank,
      hours: that.data.hours,
      minute: that.data.minute,
      second: that.data.second,
      h: that.data.h,
      m: that.data.m,
      s: that.data.s,
      openid: that.data.openid,
      done: that.data.done,
      not_done: that.data.not_done,
    } // 需要保存的数据

    return {
      data: exitState,
      expireTimeStamp: Date.now() + 24*60*60*1000 // 超时时刻
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

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