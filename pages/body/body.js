// pages/user/user.js
var app = getApp();
var options1;

Page({
  data: {
    items:[
    ]
  },
  onLoad: function (options,userinfo) {
    var that = this;
    console.log('options:' + options);
    const db = wx.cloud.database() //获取数据库的引用
    db.collection('db').get({
      success:function(res){
        console.log(res.errMsg)
      }
    })
    db.collection('db').where({
      qidian: options.qidian,
      usertype: options.usertype,
      cartype: options.cartype
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          items: res.data
        })
      }
    })
    // this.lodingto()
    this.dbRequest(options)
    //调用应用实例的方法获取全局数据
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    //这里写用户下拉的时候你执行的动作，如：发起wx.request请求一次，或者其他请求
    this.dbRequest();
  },
  // 进入详情页
  tocaruser: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../caruser/caruser?nickName=' + 'Leo' + ''
    })
  },
  
  lodingto: function () {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',

    })
  },
  closeloding: function () {
    wx.hideLoading()
  },
  dbRequest: function(options){
    
  }
})