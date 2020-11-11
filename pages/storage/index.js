//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: 0,
    canSubmit: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../form/form'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    this.getDate()
  },
  storageManager: function(){
    var cftime = '2022'
    var that = this
    if (that.data.canSubmit==true){
      wx.getStorage({
        key: cftime,
        success(res){
          console.log(res.data)
          var times = res.data.times
          if(times>=5){
            that.setData({
              canSubmit: false,
            })
          }else{
            wx.setStorage({
              key: cftime,
              data: {
                times: times + 1,
                value:"value"},
            })
            console.log('缓存成功')
          }
        },
        fail(res){
          wx.setStorage({
            key: cftime,
            data: {
              times: 0,
              value:"value"},
          })
        }
      })
    } else {
      wx.showToast({
        title: '今日提交超过五次',
        icon: 'none'
      })
    }
  },
  getDate: function(){
    var c = '2010-11-1'
    var d
    d = c.split('-')
    var year = Number(d[0])
    var month = Number(d[1])
    var day = Number(d[2])
    console.log(year)
  },
  login: function() {
    // 登录
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否登录',
      success (res) {
        if (res.confirm) {
          wx.login({
            success: res => {
              console.log(res.code)
              that.getUserInfo()
              that.setData({
                hasUserInfo: true
              })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        } else if (res.cancel) {
          that.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  getUserInfo: function(){
    // 获取用户信息
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              that.setData({
                userInfo: res.userInfo,
              })
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
        if (!res.authSetting['scope.userInfo']) {
          //提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(res.userInfo)
                  that.setData({
                    userInfo: res.userInfo,
                  })
                  app.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})
