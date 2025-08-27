App({
  onLaunch() {
    if (!wx.getStorageSync('plans')) {
      wx.setStorageSync('plans', [])
    }
  }
})
