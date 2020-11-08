// pages/user/user.js
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    avatarUrl: './user-unlogin.png'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (e) {
    //
  
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        //wx.navigateTo({
        //  url: '../userConsole/userConsole',
        //})
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
    //

    console.log('onLoad')
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.netstart()
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
  netstart: function () {
    var that = this
    console.log("正在查询网络状态")

    wx.getNetworkType({
      success: function (res) {
        console.log(res.networkType)
        if (res.networkType == "none") {
          that.setData({
            networkType: false
          })
        }else{
           that.setData({
            networkType: true
          })
        }
      }
    })
  },
  userbody:function () {
    wx.navigateTo({
      url: '../userbody/userbody?id=1'
    })
  },
  Feedback:function(){
    wx.navigateTo({
      url: '../Feedback/Feedback?id=1'
    })
  }
})