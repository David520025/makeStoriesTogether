const app = getApp()
Page({

  data: {
     storyContent:'',
     storyAuthor:''
  },

  onLoad: function (options) {

  },
  // 输入文本 信息传递到 add方法中的data中
  bindkeyinputstory:function(e){
     this.setData({
      storyContent : e.detail.value
     })
  },
// 输入作者
  bindkeyinputauthor:function(e){
    this.setData({
      storyAuthor : e.detail.value
    })
 },

 //上传 故事
  onAdd: function () {
    var that = this
    const db = wx.cloud.database()
    console.log('newdata');
    db.collection('newData').add({
      data: {
        storyContent: that.data.storyContent,
        storyAuthor: that.data.storyAuthor
      },

      success: res => {
        console.log('res',res)

        wx.showModal({
          title: '成功',
          content: '成功上传故事',
          showCancel: false
        })

        that.setData({
          storyContent : '',
          storyAuthor : ''
        })

      },

    })
  },

  //跳转到故事页
  inquere:function(){
    wx.navigateTo({
      url: '../aboutMe/aboutMe',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})