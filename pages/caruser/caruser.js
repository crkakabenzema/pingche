// pages/caruser/caruser.js
var app = getApp();
var nickName;
var id;
Page({
  data: {
    items: [
      { name: "张三", qidian: "上海浦东", cfdate: "2017-5-9", zhongdian: "深圳福田", usertype: "乘客" ,userlength:"122"},
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数;
    // console.log(options);
    var that = this;
    console.log(options)
   
    const db = wx.cloud.database() //获取数据库的引用
    db.collection('db').where({
      qidian: options.qidian,
      usertype: options.usertype,
      cartype: options.cartype
    }).get({
      success:function(res){
        console.log('res.data:' + res.data)
        that.setData({
          items: res.data
        })
      }
    })
    // this.torequire();

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
  onShareAppMessage: function () {
    return {
      title: '靖江人拼车',
      desc: '拼车信息',
      path: '/page/user?id=123'
    }
  },

  // 拨打电话
  calltel: function (e) {
    var tel = e.target.dataset.tel;
    var name = e.target.dataset.name;
    wx.makePhoneCall({
      phoneNumber: '' + tel + '',
      success: function () {
      }
    })
  }
})