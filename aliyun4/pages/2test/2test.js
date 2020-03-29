// pages/2test/2test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificate_id: null,
    testpaper: [{
      testpaper_id: 1,
      testpaper_name: "阿里云ACP云计算",
      img_src: "https://mmbiz.qpic.cn/mmbiz_jpg/9cOKU3FHMmW1X2JzribII2yibiaTgIhTGqmZ7xrI5MSt2WQPfaaLT7DYnCkU5B32jeTVrzscAnCJbJFJWicqns2K5A/0?wx_fmt=jpeg",
      schedule: "共135题 / 已答37题 / 完成率27.4%",
      time: "下午1:37"
    },
    {
      testpaper_id: 2,
      testpaper_name: "大话西游：至尊宝的心",
      img_src: "../../images/logo.jpg",
      schedule: "共135题，已答37题，完成率27.4%",
      time: "昨天"
    },
    {
      testpaper_id: 3,
      testpaper_name: "来不急的谎言：疫情下的意大利",
      img_src: "../../images/strawberry.jpg",
      schedule: "共135题，已答37题，完成率27.4%",
      time: "3月9日"
    },
      {
        testpaper_id: 1,
        testpaper_name: "排队“抄作业”，德国车企也被要求生产医疗设备",
        img_src: "../../images/coronavirus.jpg",
        schedule: "共135题 / 已答37题 / 完成率27.4%",
        time: "下午1:37"
      },
      {
        testpaper_id: 2,
        testpaper_name: "打小怪爆技能书，吊打boss不是梦",
        img_src: "../../images/game.jpg",
        schedule: "共135题，已答37题，完成率27.4%",
        time: "昨天"
      },
      {
        testpaper_id: 3,
        testpaper_name: "B端产品“竞品分析”的体系方法论",
        img_src: "https://mmbiz.qpic.cn/mmbiz_jpg/9cOKU3FHMmW1X2JzribII2yibiaTgIhTGqmZ7xrI5MSt2WQPfaaLT7DYnCkU5B32jeTVrzscAnCJbJFJWicqns2K5A/0?wx_fmt=jpeg",
        schedule: "共135题，已答37题，完成率27.4%",
        time: "3月9日"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})