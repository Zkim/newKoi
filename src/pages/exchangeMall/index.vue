<template>
  <div class="bg-box">
    <!-- 兑换弹框 -->
    <div class="alert-box" v-if="showExchangeAlert" catchtouchmove="ture">
      <div class="center-box">
        <img class="exchange-alert-img" src="/static/images/exchange-alert.png">
        <div class="exchange-alert-text-box">
          <p class="exchange-alert-title">{{amount}}</p>
          <p class="exchange-alert-desc">元</p>
        </div>
        <div class="exchange-btn-box">
          <navigator class="exchange-more-btn" open-type="switchTab" url="../homeIndex/main">获得更多红包</navigator>
          <!-- <button class="exchange-more-btn" @click="bindExchangeMoreTap">获得更多红包</button> -->
          <button class="exchange-withdrawal-btn" @click="bindExchangeWithdrawalTap">现在去提现</button>
        </div>
        <ad unit-id="adunit-188e865d544f6ca0" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        <div class="center-box">
          <img class="close-img" src="/static/images/close-alert.png" @click="closeExchange">
        </div>
      </div>
    </div>
    <div style="height:10rpx;"></div>
    <div class="top-box">
      <div class="top-text-box">
        <p class="top-title-text">{{diamond}}</p>
        <br>
        <p class="top-desc-text">金币余额（个）</p>
      </div>
      <div class="withdrawal-box" @click="getInfo">明细</div>
    </div>
    <mptoast />
    <ad unit-id="adunit-822b0fbbbc660303"></ad>
    <div :style="'height:' + listHeight + 'rpx;'">
      <div class="item-box" v-for="(item, index) in dataSource" :key="index">
        <img class="item-img" @click="allocVideo(index)" :src="item.url">
        <p class="item-title">{{item.name}}</p>
        <p class="item-desc">{{item.exchangeMsg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        dataSource: [],
        listHeight: 0,
        showExchangeAlert: false,
        amount: 0,
        needVideo: 1,
        videoAd: null,
        notWatch: 0,
        diamond: 0
      }
    },
    components: {
      mptoast,

    },
    onLoad(options) {
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-7f8c3e3606ed25e9'
        })
        this.videoAd.onLoad(() => {})
        this.videoAd.onError((err) => {})
      }
    },
    async onPullDownRefresh() {
      this.loadData()
      wx.stopPullDownRefresh();
    },
    methods: {
      loadData() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/my/diamond-index',
          body: { }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            _this.diamond = res.data.diamond
            _this.dataSource = res.data.awardList
            _this.needVideo = res.data.needVideo
            var lenght = _this.dataSource.length / 2
            if (_this.dataSource.length % 2 != 0) {
              lenght = _this.dataSource.length / 2 + 0.5
            }
            this.listHeight = (lenght * 450) + 30 * lenght
          } else {
            this.$mptoast(res.msg)
          }
        })
      },
      allocVideo(index) {
        var _this = this;
        if (_this.needVideo == 0 || _this.dataSource[index].id != 1) {
          _this.pushItem(index)
          return
        }
        // 用户触发广告后，显示激励视频广告
        if (_this.videoAd) {
          // wx.hideLoading()
          _this.videoAd.show().catch(() => {
            // 失败重试
            _this.videoAd.load()
              .then(() =>
                _this.videoAd.show()
              )
              .catch(err => {
                console.log('激励视频 广告显示失败')
              })
          })
          _this.videoAd.onClose(res => {
            _this.videoAd.offClose()
            // 用户点击了【关闭广告】按钮
            if (res && res.isEnded) {
              // 正常播放结束，可以下发游戏奖励
              _this.pushItem(index)
            } else {
              // 播放中途退出，不下发游戏奖励
              _this.notWatch = 1
              _this.pushItem(index)
              return
            }
          })
        } else {
          // wx.hideLoading()
        }
      },
      pushItem(index) {
        //点击图片
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/my/exchange-award',
          body: {
            awardId: _this.dataSource[index].id,
            notWatch: this.notWatch
          }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            if (_this.notWatch == 1) {
              _this.loadData()
              _this.notWatch = 0
              return
            }
            _this.amount = res.data.amount
            _this.showExchangeAlert = !_this.showExchangeAlert
          } else {
            this.$mptoast(res.msg)
          }
        })
      },
      getInfo() {
        const url = '../diamondDetails/main'
        wx.navigateTo({
          url
        })
      },
      bindExchangeMoreTap() {
        this.showExchangeAlert = !this.showExchangeAlert
        wx.navigateBack({
          delta: 2
        })
      },
      closeExchange() {
        this.showExchangeAlert = !this.showExchangeAlert
        this.loadData()
      },
      bindExchangeWithdrawalTap() {
        this.goWithdrawal()
        this.showExchangeAlert = !this.showExchangeAlert
        this.loadData()
      },
      goWithdrawal() {
        const url = '../withdrawal/main'
        wx.navigateTo({
          url
        })
      }
    },
    mounted() {
      this.loadData()
    },
  }

</script>

<style>
  .alert-box {
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .top-box {
    height: 72px;
    background: white;
    border-radius: 10px;
    margin: 20rpx;
  }

  .top-text-box {
    float: left;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .top-title-text {
    padding-left: 20rpx;
    padding-top: 10rpx;
    font-size: 30px;
    color: #333333;
  }

  .top-desc-text {
    padding-left: 20rpx;
    font-size: 12px;
    color: #999999;
  }

  .withdrawal-box {
    width: 70px;
    height: 36px;
    color: #C65745;
    font-size: 16px;
    border-width: 1rpx;
    border-color: #C65745;
    border-style: solid;
    border-radius: 30rpx;
    text-align: center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50rpx;
    position: absolute;
    top: 60rpx;
  }

  .center-box {
    text-align: center;
  }

  .exchange-alert-img {
    position: relative;
    width: 502rpx;
    height: 516rpx;
    padding-top: 200rpx;
  }

  .exchange-alert-text-box {
    position: absolute;
    top: 330rpx;
    text-align: right;
    width: 100%;
  }

  .exchange-alert-title {
    color: #D3573F;
    font-size: 36px;
    float: left;
    width: 56%;
  }

  .exchange-alert-desc {
    color: #D3573F;
    font-size: 14px;
    width: 61%;
    padding-top: 42rpx;
  }

  .exchange-btn-box {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 480rpx;
  }

  .exchange-more-btn {
    width: 364rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: #DF775B;
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 184rpx;
  }

  .exchange-withdrawal-btn {
    width: 364rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: white;
    font-size: 16px;
    color: #C55745;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1rpx;
    border-color: #DF775B;
    border-style: solid;
    margin-top: 36rpx;
  }

  .exchange-withdrawal-btn::after {
    border: none;
  }

  .close-img {
    width: 50rpx;
    height: 50rpx;
    padding-top: 20rpx;
  }

  .bg-box {
    background: #f7f7f7;
    margin-bottom: 20rpx;
  }

  .item-box {
    float: left;
    width: 344rpx;
    height: 450rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
    margin-top: 10rpx;
    margin-bottom: 20rpx;
    background: white;
  }

  .item-img {
    width: 344rpx;
    height: 344rpx;
  }

  .item-title {
    font-size: 14px;
    color: #000000;
    padding-left: 20rpx;
    padding-top: 12rpx;
  }

  .item-desc {
    font-size: 10px;
    color: #999999;
    padding-left: 20rpx;
    padding-top: 4rpx;
  }

</style>
