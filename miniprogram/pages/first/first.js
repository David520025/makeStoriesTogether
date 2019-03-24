const app =  getApp();

Page({
  data: {
    avatarUrl:'./user-unlogin.png',
  },

  onLoad: function (options) {
    console.log('avatarUrl', this.data.avatarUrl)
    if (!wx.cloud) {
      console.error("初始化失败，请使用 2.2.3 或以上的基础库以使用云能力")
      return
    }

  // 授权2-2；获取用户的当前设置 授权状态； （必须重新onload 一次后，云开发后台才获取了状态，系统才能得到信息，但是不会有弹窗了）
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
     })
  },
  //授权2-1；点击同意获得授权  userInfo
  onGetUserInfo:function(res){
    console.log("res",res)
    console.log("res", res.detail.userInfo)
    //如果拒绝授权的话，就没有获得到userInfo,判断条件就是undefined
    if (res.detail.userInfo){
      this.setData({
        avatarUrl: res.detail.userInfo.avatarUrl
      })
    }
  },

  // 待确认这段代码的功能  ,确认后放入onload()里； 调用login里面的云函数得道openid  
  onGetOpenid:function(){
   //调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  })
  },


//跳转到making页
  goToMaking(){
    wx.navigateTo({
      url: '../making/making',
    })
  },
  goToaboutMe(){
    wx.navigateTo({
      url: '../aboutMe/aboutMe',
    })
  },
  
  onShareAppMessage: function () {

  }
})