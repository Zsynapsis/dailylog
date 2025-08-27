Page({
  data: {
    id: null,  // 计划ID（编辑模式下用）
    mode: 'add', // 模式：add=新增，edit=编辑（拖延）
    title: '',  // 计划标题
    date: new Date().toISOString().split('T')[0], // 默认今天
    time: "08:00" // 默认时间
  },

  onLoad(options) {
    if (options.mode === 'edit' && options.id) {
      this.setData({ id: options.id, mode: 'edit' })

      // 取出已有计划
      let plans = wx.getStorageSync('plans') || []
      let plan = plans.find(p => p.id === options.id)
      if (plan) {
        this.setData({
          title: plan.title,
          date: plan.date,
          time: plan.time
        })
      }
    }
  },

  // 输入标题
  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },

  // 选择日期
  onDateChange(e) {
    this.setData({ date: e.detail.value })
  },

  // 选择时间
  onTimeChange(e) {
    this.setData({ time: e.detail.value })
  },

  // 保存计划（新增 or 编辑）
  savePlan() {
    if (!this.data.title.trim()) {
      wx.showToast({ title: '请输入计划标题', icon: 'none' })
      return
    }

    let plans = wx.getStorageSync('plans') || []

    if (this.data.mode === 'add') {
      // 新增计划
      let newPlan = {
        id: Date.now().toString(),
        title: this.data.title,
        date: this.data.date,
        time: this.data.time,
        status: "pending"
      }
      plans.push(newPlan)
    } else if (this.data.mode === 'edit') {
      // 编辑计划（拖延逻辑：修改时间后 → 回到待办状态）
      plans = plans.map(p => {
        if (p.id === this.data.id) {
          p.title = this.data.title
          p.date = this.data.date
          p.time = this.data.time
          p.status = "pending"   // 拖延后重置为未完成
        }
        return p
      })
    }

    // 保存回本地
    wx.setStorageSync('plans', plans)

    // 提示 + 返回
    wx.showToast({ 
      title: this.data.mode === 'add' ? '保存成功' : '修改成功', 
      icon: 'success' 
    })
    wx.navigateBack()
  }
})
