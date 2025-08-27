Page({
  goSettings() {
    wx.showToast({
      title: '信息设置功能待实现',
      icon: 'none'
    })
  },

  goCompleted() {
    wx.navigateTo({
      url: '/pages/profileCompleted/profileCompleted'
    })
  }
})
