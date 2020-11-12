const util = require("../../utils/util")
const app = getApp()


Page({
  data: {
    userInfo: null,
    time: null,
  },
  onLoad: function(){
    this.timeout()
  },
  onReady: function(){
  },
  //that.data.canSubmit为false时，按钮取消
  storageManager: function(){
    var form = {nickName: "Leo"}
    var time = util.formatTime(new Date()).split(' ')
    console.log(time[0])
    var cftime = '2033'
    var that = this
    if (that.data.canSubmit==true){
      wx.getStorage({
        key: cftime,
        success(res){
          var times = res.data.times
          if(times>=5){
            wx.showToast({
              title: '今日提交超过五次',
              icon: 'none'
            })
            that.setData({
              canSubmit: false,
            })
          }else{
            wx.setStorage({
              key: cftime,
              data: {
                times: times + 1,
                value:form},
            })
            console.log('缓存成功')
            console.log({times:times+1,value:form})
          }
        },
        fail(res){
          wx.setStorage({
            key: cftime,
            data: {
              times: 1,
              value:form},
          })
        console.log({times:1,value:form})
        console.log("缓存成功")
        }
      })
    }
  },
  //缓存读取在一段时间后发送到云端
  timeout: function(){
    var that = this
    //返回timeoutID
    var timeout = setTimeout(function(){
      console.log("send one signal.")
      that.setData({
        time: 100,
      })
    },100)
  },
  //要求用户登录，同时在html中加入无userInfo,不可以发布
  onTabItemTap: function(){
    var that = this
    if (app.globalData.userInfo!=null) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      console.log(that.data.userInfo)
    }else{
      that.setData({
        userInfo: {
          nickName: "匿名用户"
        }
      })
    }
  },
})