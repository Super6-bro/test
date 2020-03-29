// pages/conclude/conclude.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificate_id: 0,
    testpaper_id: 0,
    achievement: 0,
    result: "未知"
  },
  toIndex: function() {
    wx.switchTab({
      url: '/pages/1discover/1discover'
    })
  },
  toMyInfo: function() {
    var that = this
    wx.reLaunch({
      url: '/pages/4myself/4myself'
    })
    // console.log(that.data.achievement)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var achievement = Number(options.achievement)
    var certificate_id = Number(options.certificate_id)
    var testpaper_id = Number(options.testpaper_id)
    that.setData({
      achievement: achievement,
      certificate_id: certificate_id,
      testpaper_id: testpaper_id
    })
    // console.log(that.data.achievement)
    if (that.data.achievement > 10){
      that.setData({
        result: "通过"
      })
    }else{
      that.setData({
        result: "未通过"
      })
    }
    // console.log(that.data.achievement)
    // console.log(that.data.certificate_id)
    // console.log(that.data.testpaper_id)
    // console.log(that.data.result)
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