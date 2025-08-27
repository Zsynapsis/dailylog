Page({
  data: {
    plans: [],
    // selectedDate: '', // 当前显示的日期
    today: ''
},
// onShow() {
//   // 如果没选日期默认今天
//   if (!this.data.today) {
//     this.setData({ today: this.getToday() })
//   }
//   this.loadPlans(this.data.today)
// },

  onShow() {
    
    this.setData({ today: this.getToday() })
    this.loadPlans()
  },

  getToday() {
    let d = new Date()
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  },

  loadPlans() {
    let allPlans = wx.getStorageSync('plans') || []
    let today = new Date().toISOString().split('T')[0]
    let todayPlans = allPlans.filter(p => p.date === today)
  
    // ✅ 限制已完成的最多 2 条（只影响显示，不删除存储）
    let donePlans = todayPlans.filter(p => p.status === 'done')
    if (donePlans.length > 2) {
      donePlans.sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0))
      let keepIds = donePlans.slice(0, 2).map(p => p.id)
      todayPlans = todayPlans.filter(p => p.status !== 'done' || keepIds.includes(p.id))
    }
  
    this.setData({ plans: todayPlans })
  },
    // // ✅ 根据选择日期加载计划
    // loadPlans(date) {
    //   let allPlans = wx.getStorageSync('plans') || []
    //   let datePlans = allPlans.filter(p => p.date === date)
  
    //   // 限制已完成最多显示 2 条
    //   let donePlans = datePlans.filter(p => p.status === 'done')
    //   if (donePlans.length > 2) {
    //     donePlans.sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0))
    //     let keepIds = donePlans.slice(0, 2).map(p => p.id)
    //     datePlans = datePlans.filter(p => p.status !== 'done' || keepIds.includes(p.id))
    //   }
  
    //   this.setData({ plans: datePlans })
    // },
    // 切换完成状态
    setDone(e) {
      let id = e.currentTarget.dataset.id
      let allPlans = wx.getStorageSync('plans') || []
      allPlans = allPlans.map(p => {
        if (p.id === id) {
          if (p.status === "done") {
            // 已完成 → 取消
            p.status = "pending"
            p.finishedAt = null
          } else {
            // 未完成 → 设置为已完成
            p.status = "done"
            p.finishedAt = Date.now()
          }
        }
        return p
      })
      wx.setStorageSync('plans', allPlans)
      this.loadPlans()
   },

  setDelay(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/addPlan/addPlan?id=${id}&mode=edit`
    })
  },

  goAddPlan() {
    wx.navigateTo({
      url: '/pages/addPlan/addPlan'
    })
  },

  goProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  },
    // ✅ 去日历页
  goCalendar() {
    wx.navigateTo({
      url: '/pages/calendar/calendar'
    })
   }
})
