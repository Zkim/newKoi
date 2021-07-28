<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  onShow() {
    wx.login({
      success(res) {
        // 需要从服务端获取用户openId
        // wx.request({
        //   url: 'https://blog.superwang.cn/getOpenId', //后端接口地址
        //   method: "post",
        //   data: {
        //     jscode : res.code
        //   },
        //   success(res){
        //     // 上传openId
        //     // wx.xmAdSednOpenid(res.data.data.openid)
        //   }
        // })
      }
    })
  },
  log() {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style lang="scss">
@import './themes/normalize';
@import './themes/class';
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
