const app = getApp()

Page({
  data:{
    submit: false
  },
  onLoad:function(){
       //this.pop()
       //this.showsheet()
  },
  bindSubmit:function(e){
    console.log(e.detail.value)
    var length = e.detail.value['input'].length
    console.log(length)
    if (length==11) {
      this.setData({
        submit: true
      })
    } else {
      wx.showToast({
        title: '号码不正确',
      })
    }
  },
  pop:function(){
    wx.showModal({
      title: '提示',
      content: '是否登录',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 0,
          })
        }
      }
    }) 
  },
  showsheet:function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })    
  }
})