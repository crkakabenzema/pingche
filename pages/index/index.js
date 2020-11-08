//index.js
const app = getApp()

var shengIndex;
var shiIndex;
var xianIndex;
var qZ;
var height = '100vh';
var humanlength = 1;
var time;
var date;
var cfdate;
var qidian;
var zhongdian;

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    city_select: false,
    qZ: '',
    animationData: {},//动画
    origin: '起点',
    back: '终点',
    shi: '泰州',
    xian: "靖江市",
    shi1: '上海',
    xian1: "浦东新区",
    size: "1",
    time: time,
    resetButton: false,
    peoplelength: [1, 2, 3, 4, 5, 6],
    objectArray: [
      { id: 0, name: 1 },
      { id: 1, name: 2 },
      { id: 2, name: 3 },
      { id: 3, name: 4 },
      { id: 5, name: 6 },
    ],
    index: 0,
    imgUrls:[
      "../../images/tel.png",
       "../../images/add.png",
        "../../images/search.png",
         "../../images/tel.png"
    ]
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    var that = this;
    that.setData({
      provinces: app.data.province,
      cartype: app.data.cartype,
    });
    this.timeselect();
    this.huoqutupian()
    this.netstart()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  // 确定按钮
  formSubmit: function (e) {
    console.log(e)
    const db = wx.cloud.database() //获取数据库的引用
    db.collection('db').get({
      success:function(res){
        console.log(res.errMsg)
      }
    })
    var submitbody = e.detail.value;
    wx.navigateTo({
          url: '../body/body?qidian=' + submitbody.qidian + '&&zhongdian=' + submitbody.zhongdian + '&&userlength=' + submitbody.userlength + '&&date=' + submitbody.date + '&&cartype' + submitbody.cartype +'&&time=' + submitbody.time + '&&usertype=' + submitbody.usertype + '',
    })
  },

  // 网络状态
  netstart: function () {
    var that = this
    console.log("正在查询网络状态")
    wx.getNetworkType({
      success: function (res) {
		  console.log(res.networkType)
        if (res.networkType == "none") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请检查数据和wifi是否打开',
            success: function (res) {
            }
          })
          that.setData({
            networkType:false
          })
        }else{
          that.setData({
            submit: "submit",
            networkType:true
          })
        }
      }
    })
  },

  // 选择起点
  indexFlexQ: function () {
    qZ = 'q';
    this.qsfunction()
  },
  // 选择终点
  indexFlexZ: function () {
    qZ = 'z';
    this.qsfunction()
  },
  // 起点和终点调用函数
  qsfunction: function () {
    height = '100vh'
    this.donghua();
    this.setData({
      city_select: true,
      provinces: app.data.province,
      citys: '',
      qZ: qZ,
      areas: '',
      carLengthType: false,

    })
  },

  // 日期选择
  bindDateChange: function (e) {
    date = e.detail.value;
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择函数
  bindTimeChange: function (e) {
    time = e.detail.value
    this.setData({
      time: e.detail.value
    })
  },
  // 时间计算函数
  timeselect: function () {

    const Date1 = new Date();
    var year = Date1.getFullYear();
    var month = Date1.getMonth() + 1
    var date1 = Date1.getDate()
    var hours = Date1.getHours()
    var minutes = Date1.getMinutes();
    var month1 = month + 1;
    // console.log(month1)
    if (month < 10) {
      month = "0" + month;
    }
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    if (date1 < 10) {
      date1 = "0" + date1;
    }
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    date = year + "-" + month + "-" + date1;
    time = hours + ":" + minutes;

    var endtime = year + "-" + month1 + "-" + date1;
    // console.log(date);
    // console.log(time);

    this.setData({
      "endtime": endtime,
      "date": date,
      "time": time
    });

  },
  // 人数选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 返回上一级
  resetBottom: function () {
    if (this.data.citys.length == 0) {
      this.setData({
        provinces: '',
        citys: app.data.city[shengIndex].cities,
        areas: '',
      })
    } else {
      this.setData({
        provinces: app.data.province,
        citys: '',
        areas: '',
      })
    }
  },
  // 点击省
  provincesBottom: function (e) {
    console.log(e)
    shengIndex = e.target.dataset.shengname;
    this.setData({
      sheng: this.data.provinces[shengIndex],
      provinces: '',
      citys: app.data.city[shengIndex].cities,
      resetButton: true,
    })
  },
  // 市
  citysBottom: function (e) {
    shiIndex = e.target.dataset.shiname;
    this.setData({
      provinces: '',
      citys: '',
      areas: app.data.area[shengIndex][shiIndex].areaes
    })
  },
  // 县
  areasBottom: function (e) {
    xianIndex = e.target.dataset.xianname;
    var sheng = app.data.province[shengIndex];
    var shi = app.data.city[shengIndex].cities[shiIndex];
    var xian = app.data.area[shengIndex][shiIndex].areaes[xianIndex];
    this.donghua2();

    if (qZ === 'q') {
      qidian = shi + "-" + xian;
      this.setData({
        shi: shi,
        xian: xian
      })
    } else {
      zhongdian = shi + '-' + xian
      this.setData({
        shi1: shi,
        xian1: xian
      })
    }
  },
  timefresh: function(){
    const Date1 = new Date();
    var year = Date1.getFullYear();
    var month = Date1.getMonth() + 1
    var date1 = Date1.getDate()
    var hours = Date1.getHours()
    var minutes = Date1.getMinutes();
  },
  // 获取图片
  huoqutupian: function () {
    //
    var imgUrls = []
    var that = this
  },
  closecity: function () {
    this.donghua2();
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '靖江人拼车',
      desc: '靖江人自己的拼车，无需任何费用',
      path: '/page/user?id=123'
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 动画二
  donghua2: function () {
    height = '0vh';
    var animation = wx.createAnimation({

      transformOrigin: "50% 50%",
      duration: 250,
      timingFunction: "ease",
      delay: 0
    })
    animation.skew(45, -45).rotate(-180, 180, ).scale3d(0.5, 0.5, 0.5).height('50vh').step();
    animation.skew(-45, -45).rotate(180, -180).scale3d(0.1, 0.1, 0.1).height(height).step();
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {

    }.bind(this), 700);
  },
  // 动画一
  donghua: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    setTimeout(function () {
      animation.height(height).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0);
  },

   // 上传图片
   doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
