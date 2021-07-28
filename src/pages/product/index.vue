<template>
  <div class="product container flex-y bg-default">
    <my-swiper :img-urls="product.url" @onBannerItemClick="bannerItemClick"></my-swiper>
    <div class="bg-white">
      <div class="row fs-m fw-normal">{{ product.name }}</div>
      <div class="row">
        <div>
          <span class="fw-normal c-important">{{ product.coin }}</span>
          <span class="fw-normal c-important coin-wraper">{{ "金币+" }}</span>
          <span class="fw-normal c-important">{{ product.amount }}</span>
          <span class="fw-normal c-important coin-wraper">元</span>
        </div>
        <div class="c-secondary fs-s">{{ product.exchangeText }}</div>
      </div>
    </div>
    <div class="row row-single bg-white c-secondary express-wrapper">
      <span>快递</span>
      <span class="c-default">包邮</span>
    </div>
    <div @click="chooseAddress" class="flex-y-center bg-white c-secondary address-warpper" v-if="!recevier.name">
      <img class="address-icon" src="/static/images/address-icon.png"/>
      <span class="c-primary address-title">点击添加收货地址</span>
    </div>
    <div @click="chooseAddress" class="bg-white" v-else>
      <div class="row">
        <div class="flex-x-center-y c-secondary fs-s">
          <span class="recevier-username">{{ recevier.name }}</span>
          <span>{{ recevier.mobile }}</span>
        </div>
      </div>
      <div class="row">
        <span class="recevier-address">{{ recevier.address }}</span>
        <c-icon type="link"/>
      </div>
    </div>
    <div class="row">
      <div class="c-secondary fs-xs exchange-desc">
        <p>兑换说明：</p>
        <p :key="index" v-for="(rule, index) in rules">{{ rule }}</p>
      </div>
    </div>
    <div @click="receiveTap" class="btn btn-row btn-primary fix-bottom">兑换领取</div>
    <mptoast/>
  </div>
</template>

<script>
  import CIcon from '../../components/c-icon'
  import mptoast from 'mptoast'
  import MySwiper from "../../components/MySwiper";
  import { productDetail } from '../../api'

  export default {
    components: {
      MySwiper,
      CIcon,
      mptoast
    },
    data() {
      return {
        productId: 0,
        banners: [1, 2, 3],
        product: {},
        recevier: {},
        indicatorDots: true,
      }
    },
    onLoad(query) {
      this.productId = query.productId
    },
    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    },
    mounted() {
      this.loadData()
    },
    computed: {
      rules() {
        try {
          return this.product.rules.desc.split('\n')
        } catch (err) {
          return []
        }
      }
    },
    methods: {
      loadData() {
        productDetail(this.productId).then(response => {
          this.product = response.data
          if (response.data.sendName) {
            this.recevier = {
              name: response.data.sendName,
              mobile: response.data.mobile,
              address: response.data.address
            }
          }
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },
      chooseAddress() {
        // const _this = this;
        wx.chooseAddress({
          success: res => {
            const info = {}
            info.name = res.userName
            info.mobile = res.telNumber
            info.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
            this.recevier = info
          },
          fail: function () {
            // 用户未授权 弹窗通过opensetting授权
            wx.showModal({
              title: '提示',
              content: '您尚未授权小程序，是否打开设置界面进行授权?',
              success: function (showModal) {
                //  确定打开 调用opensetting 1.1.0
                if (showModal.confirm) {
                  wx.openSetting({
                    success: function (opensetting) {
                      console.log(opensetting);
                      if (opensetting.authSetting['scope.address']) {
                        wx.chooseAddress({
                          success: res => {
                            const info = {}
                            info.name = res.userName
                            info.mobile = res.telNumber
                            info.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
                            this.recevier = info
                          }
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '你未授权小程序，将无法使用部分功能，若需要使用此部分功能，请授权',
                          showCancel: false
                        })
                      }
                    }
                  })
                }
              }

            })
          }
        })
        // if (wx.chooseAddress) {
        //   wx.chooseAddress({
        //     success: res => {
        //       const info = {}
        //       info.name = res.userName
        //       info.mobile = res.telNumber
        //       info.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
        //       this.recevier = info
        //     },
        //     fail: err => {
        //       // console.log(JSON.stringify(err))
        //       this.$mptoast('授权失败，重新授权!')
        //     }
        //   })
        // } else {
        //   console.log('当前微信版本不支持chooseAddress')
        // }
      },
      receiveTap() {
        var _this = this
        if (!_this.recevier.name) {
          _this.$mptoast('请添加收货地址~')
          return
        }
        //领取 调用支付
        this.$fly
          .request({
            method: 'post',
            url: '/mall/pre-buy',
            body: {
              productId: _this.productId,
              name: _this.recevier.name,
              mobile: _this.recevier.mobile,
              address: _this.recevier.address
            }
          })
          .then(res => {
            if (res.code == 200) {
              //调用支付接口
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: res => {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })
                  _this.$fly
                    .request({
                      method: 'post',
                      url: '/mall/do-buy',
                      body: {
                        productId: _this.productId
                      }
                    })
                    .then(res => {
                      if (res.code == 200) {
                        // 支付结束 返回上个页面
                        var pages = getCurrentPages() // 当前页面
                        var beforePage = pages[pages.length - 2] // 前一页
                        wx.navigateBack({
                          success: function () {
                            beforePage.onLoad() // 执行前一个页面的onLoad方法
                          }
                        })
                      } else {
                        _this.$mptoast(res.msg)
                      }
                    })
                },
                fail: function (res) {
                  wx.showToast({
                    title: '操作失败！',
                    icon: 'warn',
                    duration: 1500
                  })
                },
                complete: function (res) {
                  console.log(res)
                }
              })
            } else {
              this.$mptoast(res.msg)
            }
          })
      },
      bannerItemClick(index) {
        console.log(index)
      }
    }
  }
</script>

<style lang="scss">
  .product {
    padding-bottom: 100 rpx;
  }

  .express-wrapper {
    font-size: 16px;
  }

  .address-warpper {
    display: flex;
    align-items: center;
    height: 70px;
    box-sizing: border-box;
    background-color: rgba(187, 66, 46, 0.2);
    border-radius: 35px;
    margin: 0px 17px;

    .address-icon {
      width: 15px;
      height: 20px;
      margin-bottom: 2px;
    }

    .address-title {
      font-size: 16px;
      font-weight: bold;
      margin-top: 2px;
    }
  }

  .coin-wraper {
    font-size: 10px;
  }

  .recevier-username {
    margin-right: 50 rpx;
  }

  .recevier-address {
    margin-right: 50 rpx;
    font-size: 14px;
    color: #333333;
  }

  .exchange-desc{
    margin-bottom: 40px;
  }
</style>
