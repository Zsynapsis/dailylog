Page({
  data: {
    finishedPlans: []
  },

  onShow() {
    let allPlans = wx.getStorageSync('plans') || []
    let finished = allPlans
      .filter(p => p.status === 'done')
      .sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0))
    this.setData({ finishedPlans: finished })
  }
})
