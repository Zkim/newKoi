<template>
  <div class="bg-box">
    <div class="alert-box" v-if="showCustomerAlert" catchtouchmove="ture">
      <div class="center-box">
        <button class="shareAlertBtn" @click="tapCustomer">
          <img class="customer-img" src="../../../static/images/customer.png">
        </button>
      </div>
    </div>
    <div class="alert-box" v-if="showWechatAlert" catchtouchmove="ture">
      <div class="center-box">
        <button class="shareAlertBtn" @click="copyWechat">
          <img class="wechat-img" src="../../../static/images/add-wecat.png">
        </button>
        <div class="center-box">
          <img class="close-img" src="../../../static/images/close-alert.png" @click="showWechat">
        </div>
      </div>
    </div>
    <mptoast />
    <div class="top-box">
      <button class="login-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="isLogin == false"></button>
      <div class="item-box" @click="clickBonus">
        <img class="icon-img" src="../../../static/images/bonus-icon.png">
        <p class="icon-text">现金余额</p>
      </div>
      <div class="item-box" @click="clickPrize">
        <img class="icon-img" src="../../../static/images/prize-icon.png">
        <p class="icon-text">我的订单</p>
      </div>
      <div class="item-box">
        <button class='item-box-btn' open-type='feedback'></button>
        <img class="icon-img" src="../../../static/images/demond-icon.png">
        <p class="icon-text">意见反馈</p>
      </div>
      <div class="item-box" @click="clickContact">
        <img class="icon-img" src="../../../static/images/contact-icon.png">
        <p class="icon-text">联系客服</p>
      </div>
      <div class="item-box" @click="clickCooperation">
        <img class="icon-img" src="../../../static/images/cooperation-icon.png">
        <p class="icon-text">商务合作</p>
      </div>
    </div>
    <swiper class="swiper-box" indicator-dots="true" autoplay="true" interval="5000" duration="1000" v-if="dataInfo.banners">
      <block v-for="(item, index) in dataInfo.banners" :index="index" :key="index">
        <swiper-item @click="pushRenRen(index)">
          <img :src="item.url" class="slide-image" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <ad unit-id="adunit-589a79f54902affb" ad-type="video" ad-theme="white"></ad>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        isSelect: false,
        dataSource: {},
        typeString: null,
        arrLenght: 0,
        showCustomerAlert: false,
        showWechatAlert: false,
        isLogin: false,
        dataInfo: {}
      }
    },
    components: {
      mptoast,
    },
    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    methods: {
      pushRenRen(index) {
        var _this = this;
        wx.aldstat.sendEvent('点击banner', {
          '页码': index
        });
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
                    method: "post",
                    url: "/user/user-login",
                    body: {
                      'encryptData': e.mp.detail.encryptedData,
                      'iv': e.mp.detail.iv,
                      'jsCode': res.code
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
            },
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
          success: function (res) {}
        });
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
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/my/index',
          body: {}
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            this.isLogin = res.data.isLogin
            _this.dataInfo = res.data
          } else {
            this.$mptoast(res.msg)
          }
        })
      },
      clickBonus() {
        const url = '../withdrawal/main'
        wx.navigateTo({
          url
        })
      },
      clickPrize() {
        const url = '../prizeIndex/main'
        wx.navigateTo({
          url
        })
      },
      clickDemond() {
        const url = '../exchangeMall/main'
        wx.navigateTo({
          url
        })
      }
    },
    mounted() {
      this.loadData()
    }
  }

</script>

<style>
  .slide-image {
    width: 720rpx;
    height: 200rpx;
  }

  .swiper-box {
    width: 720rpx;
    height: 200rpx;
    margin-left: 15rpx;
    margin-right: 15rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;

  }

  .alert-box {
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .shareAlertBtn {
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    background-color: transparent;
    border: none;
  }

  .shareAlertBtn::after {
    border: none;
  }

  .login-btn {
    color: rgba(0, 0, 0, 0);
    text-align: center;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 220rpx;
    position: absolute;
    top: 0;
  }

  .login-btn::after {
    border: none;
  }

  .center-box {
    text-align: center;
  }

  .customer-img {
    position: relative;
    width: 552rpx;
    height: 344rpx;
    padding-top: 200rpx;
  }

  .wechat-img {
    position: relative;
    width: 552rpx;
    height: 424rpx;
    padding-top: 200rpx;
  }

  .close-img {
    width: 50rpx;
    height: 50rpx;
    padding-top: 20rpx;
  }

  .bg-box {
    background: #f7f7f7;
    padding: 4rpx;
  }

  .top-box {
    height: 168rpx;
    background: white;
    border-radius: 10px;
    margin: 20rpx;
  }

  .item-box {
    width: 96rpx;
    height: 122rpx;
    float: left;
    margin-left: 40rpx;
    margin-top: 40rpx;
    text-align: center;
  }

  .item-box-btn {
    width: 96rpx;
    height: 140rpx;
    background-color: white;
    border-radius: 0rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 40rpx;
    background-color: transparent;
  }

  .item-box-btn::after {
    border: 0;
  }

  .icon-img {
    width: 48rpx;
    height: 48rpx;
  }

  .icon-text {
    font-size: 12px;
    color: #333333;
  }

</style>
