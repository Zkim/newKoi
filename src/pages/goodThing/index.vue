<template>
  <div class="goodthing container flex-y bg-default">
    <div class="goodthing-header card">
      <div class="card-content flex-x-between flex-x-center-y">
        <div class="flex-y">
          <span class="fs-xl fw-thick">{{ amount }}</span>
          <span class="fs-s">金币余额</span>
        </div>
        <div class="goodthing-header-right">
          <div class="btn btn-outline btn-s get-reward-btn" :class="watchStatus===1 ? 'get-reward-btn-disable' : 'get-reward-btn'" @click="allocVideo">{{watchStatus===1?"今日已领":"领取金币"}}</div>
          <div class="btn btn-outline btn-s" @click="gotoCoinDetail()" >明细</div>
        </div>
      </div>
    </div>
    <div class="product-list flex-x flex-wrap">
      <div :key="index" @click="onProductClick(product)" class="product" v-for="(product, index) in products">
        <div class="card">
          <img :src="product.url" class="product-img" />
          <div class="product-info">
            <p class="product-label fw-normal">{{ product.name }}</p>
            <p class="product-amount">
              <span class="fw-normal c-important">{{ product.coin }}</span>
              <span class="fw-normal c-important coin-wraper">{{ "金币+" }}</span>
              <span class="fw-normal c-important">{{ product.amount }}</span>
              <span class="fw-normal c-important coin-wraper">元</span>
            </p>
            <p class="product-hint fs-xs c-secondary">{{ product.exchangeText }}</p>
          </div>
        </div>
      </div>
    </div>
    <button @getuserinfo="bindGetUserInfo" class="login-button fix-full" open-type="getUserInfo" v-if="!isLogin"></button>
    <!--    领取金豆弹框-->
    <ReceiveBeansAlert :is-show="showBeansAlert" :noclickhide="true" :bean="bean"
                       @onHideHander="onHideHander" is-show-ad="false" unit="币" sub-title=""></ReceiveBeansAlert>
    <RewardDivideOverAlert :is-show="showDivideOverAlert" :noclickhide="true" :time="nextTime"
                           @onHideHander="onHideHander" is-show-ad="false"></RewardDivideOverAlert>
  </div>
</template>

<script>
import mptoast from 'mptoast'
import myswiper from '../../components/MySwiper'
import {getReward, mallIndex} from '../../api'
import ReceiveBeansAlert from '../../components/myReward/alert/ReceiveBeansAlert'
import RewardDivideOverAlert from '../../components/myReward/alert/RewardDivideOverAlert'


export default {
  data() {
    return {
      amount: '0.00',
      products: [],
      isLogin: false,
      bean: "",
      showBeansAlert: false,
      showDivideOverAlert: false,
      nextTime:"",
      getRewardBtnTitle: "领取金币",
      watchStatus: 0
    }
  },
  components: {
    mptoast,
    myswiper,
    ReceiveBeansAlert,
    RewardDivideOverAlert
  },
  onLoad(options) {
    if (wx.createRewardedVideoAd) {
      this.videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-bf2d036aec05566e'
      })
      this.videoAd.onLoad(() => {
      })
      this.videoAd.onError((err) => {
      })
    }
  },
  async onPullDownRefresh() {
    this.loadData()
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  methods: {
    pushRenRen(index) {
      var _this = this
      wx.aldstat.sendEvent('点击banner', {
        页码: index
      })
      if (_this.dataInfo.banners[index].appid == 'wxd889b93f7e88344e') {
        wx.navigateToMiniProgram({
          appId: 'wxd889b93f7e88344e',
          path: 'pages/home/home?channelid=6773', //打开的页面路径，如果为空则打开首页
          envVersion: 'release',
          success(res) {}
        })
      } else if (_this.dataInfo.banners[index].appid == 'wxb6c5b1f1dcea0138') {
        wx.navigateToMiniProgram({
          appId: 'wxb6c5b1f1dcea0138',
          path: 'live/pages/random/random?cc=SZZSKJFU&ald_media_id=57132&ald_link_key=ba01d2ad8e215d58',
          envVersion: 'release',
          success(res) {}
        })
      } else if (_this.dataInfo.banners[index].appid == 'wx6bb4d07d0f44b40c') {
        wx.navigateToMiniProgram({
          appId: 'wx6bb4d07d0f44b40c',
          path: '',
          envVersion: 'release',
          success(res) {}
        })
      }
    },
    bindGetUserInfo(e) {
      const self = this
      if (this.isLogin == true) {
        return
      }
      if (e.mp.detail.userInfo) {
        const fly = this.$fly
        wx.login({
          success(res) {
            if (res.code) {
              fly
                .request({
                  method: 'post',
                  url: '/user/user-login',
                  body: {
                    encryptData: e.mp.detail.encryptedData,
                    iv: e.mp.detail.iv,
                    jsCode: res.code
                  }
                })
                .then(res => {
                  console.log(res)
                  if (res.code === 200) {
                    wx.setStorage({
                      key: 'token',
                      data: res.data.userToken
                    })
                    self.loadData()
                  } else {
                    self.$mptoast(res.msg)
                  }
                })
            }
          }
        })
      }
    },
    tapCustomer() {
      this.showCustomerAlert = !this.showCustomerAlert
    },
    copyWechat() {
      var _this = this
      wx.setClipboardData({
        data: 'zhangxiaosi1994',
        success: function(res) {}
      })
      this.showWechatAlert = !this.showWechatAlert
    },
    showWechat() {
      this.showWechatAlert = !this.showWechatAlert
    },
    clickContact() {
      this.showCustomerAlert = !this.showCustomerAlert
    },
    clickCooperation() {
      this.showWechatAlert = !this.showWechatAlert
    },
    loadData() {
      mallIndex().then(res => {
        this.isLogin = res.data.isLogin
        this.products = res.data.list
        this.amount = res.data.amount
        this.watchStatus = res.data.watchStatus
      }).catch(response => {
        if (response.msg) {
          this.$mptoast(response.msg)
        } else {
          this.$mptoast(response)
        }
      })
    },
    onProductClick(product) {
      console.log("onProductClick")
      wx.navigateTo({
        url: '../product/main?productId=' + product.productId
      })
    },
    gotoCoinDetail() {
      wx.navigateTo({
        url: '../diamondDetails/main'
      })
    },
    bindGetUserInfo(e) {
      const self = this
      if (this.isLogin == true) {
        return
      }
      if (e.mp.detail.userInfo) {
        const fly = this.$fly
        wx.login({
          success(res) {
            if (res.code) {
              fly
                .request({
                  method: 'post',
                  url: '/user/user-login',
                  body: {
                    encryptData: e.mp.detail.encryptedData,
                    iv: e.mp.detail.iv,
                    jsCode: res.code
                  }
                })
                .then(res => {
                  console.log(res)
                  if (res.code === 200) {
                    wx.setStorage({
                      key: 'token',
                      data: res.data.userToken
                    })
                    self.loadData()
                  } else {
                    self.$mptoast(res.msg)
                  }
                })
            }
          }
        })
      }
    },
    getRewardBtnClick(){
      getReward(14).then(res => {
        this.bean = res.data.beans
        this.showBeansAlert = true
        this.loadData()
      }).catch(res => {
        if (response.msg) {
          this.$mptoast(response.msg)
        } else {
          this.$mptoast(response)
        }
      })
    },
    onHideHander() {
      this.showBeansAlert = false
      this.showDivideOverAlert = false
    },
    allocVideo() {
      if (this.watchStatus === 1){
        return
      }
      var _this = this;
      if (this.videoAd) {
        wx.hideLoading()
        this.videoAd.show().catch(() => {
          this.videoAd.load()
            .then(() =>
              this.videoAd.show()
            )
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
        })
        this.videoAd.onClose(res => {
          _this.videoAd.offClose()
          if (res && res.isEnded) {
            _this.$mptoast("看完了-----")
            _this.getRewardBtnClick()
          } else {

          }
        })
      } else {
        wx.hideLoading()
      }
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="scss">
.goodthing {
  padding: 16rpx;
}
.product {
  box-sizing: border-box;
  width: 50%;
  margin-top: 20rpx;
  &:nth-of-type(2n + 1) {
    padding-right: 10rpx;
  }
  &:nth-of-type(2n) {
    padding-left: 10rpx;
  }
}
.product-info {
  padding: 16rpx;
}
.product-img {
  height: 350rpx;
  width: 100%;
}
.product-amount {
  margin: 12rpx 0;
}
.coin-wraper{
  font-size: 10px;
}
.product-amount-enable {
  margin-right: 18rpx;
}
.product-btn {
  padding: 12rpx 0;
}

.login-button {
  opacity: 0;
}
  .product-label{
    font-size: 16px;
  }
.goodthing-header-right {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;

  .get-reward-btn{
    background: #BB422E;
    border: 1px solid #BB422E;
    border-radius: 19px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    margin-right: 10px;
  }

  .get-reward-btn-disable{
    background: #999999;
    border: 1px solid #999999;
    border-radius: 19px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    margin-right: 10px;
  }
}
</style>
