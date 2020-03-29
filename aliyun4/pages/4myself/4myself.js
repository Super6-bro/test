// pages/4myself/4myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    wechatname: "",
    historical_achievements: [{
        certificate_id: 1,
        certificate_name: "云计算技能认证",
        testpaper_id: 1,
        testpaper_name: "网站建设：部署与发布",
        achievement: 100,
        result: "通过"
      },
      {
        certificate_id: 2,
        certificate_name: "大数据技能认证",
        testpaper_id: 2,
        testpaper_name: "网站建设：简单动态网站搭建",
        achievement: 0,
        result: "未通过"
      },
      {
        certificate_id: 2,
        certificate_name: "大数据技能认证",
        testpaper_id: 2,
        testpaper_name: "网站建设：简单动态网站搭建",
        achievement: 0,
        result: "未通过"
      },
      {
        certificate_id: 2,
        certificate_name: "大数据技能认证",
        testpaper_id: 2,
        testpaper_name: "网站建设：简单动态网站搭建",
        achievement: 0,
        result: "未通过"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                wechatname: res.userInfo.nickName
              })
            }
          })
        }else{
          that.setData({
            avatarUrl: '未授权',
            wechatname: '未授权'
          })
        }
      }
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