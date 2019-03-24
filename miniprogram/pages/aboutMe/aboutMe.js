// pages/aboutMe/aboutMe.js
Page({

  data: {
    storyResult:[],
  },

// 获取整个集合
  onLoad: function (options) {
    var that = this

    const db = wx.cloud.database()
    db.collection('xiaoming').get({
       success(res){ 
         console.log("res",res)
    // 给对象添加一个元素  sub ,数组方法
         let data = res.data.map(function(value,index,array){
           let sub = index + 1;
           value.sub = sub;
           return value;
         });

         console.log(data);

         that.setData({
           storyResult: data
         })
         console.log("storyResult---")
         console.log(that.data.storyResult[0].storyAuthor)
      },
 // 未查到数据时调用
      fail: function (res) {
        wx.showModal({
          title: '无故事',
          content: '没有与我相关的故事',
          showCancel: false
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})