Page({
  data: {
    markDays: [] // 有待办的日期
  },

  onShow() {
    let allPlans = wx.getStorageSync('plans') || []
    // 去重，标记有计划的日期
    let dates = [...new Set(allPlans.map(p => p.date))]
    this.setData({
      markDays: dates.map(d => ({ day: d }))
    })
  },

  // ✅ 点击日期 → 返回首页并传参
  onDayClick(e) {
    let date = e.detail.day
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2] // 上一个页面（首页）
    prevPage.setData({ selectedDate: date })
    prevPage.loadPlans(date)
    wx.navigateBack()
  }
})
