// pages/1forum/1forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificate_id: null,
    testpaper: [{
        testpaper_id: 1,
        testpaper_name: "网站建设：部署与发布"
      },
      {
        testpaper_id: 2,
        testpaper_name: "网站建设：简单动态网站搭建"
      },
      {
        testpaper_id: 3,
        testpaper_name: "云服务器基础运维与管理"
      },
      {
        testpaper_id: 4,
        testpaper_name: "云数据库管理与数据迁移"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var certificate_id = Number(options.certificate_id)
    that.setData({
      certificate_id: certificate_id
    })
    // console.log(certificate_id)
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