<template>
  <div class="exchanged-message-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"
       @touchmove.stop="catchTouchAction" v-if="isShow">
    <div class="alert-body-box">
      <div class="body-content">
        <div class="tips-warpper top">
          <span class="tips-text">当天用金币兑换</span>
          <span class="tips-time">1次</span>
          <span class="tips-text">商品</span>
        </div>
        <div class="tips-warpper middle">
          <span class="tips-text">即可获得</span>
          <span class="tips-time">{{beans}}</span>
          <span class="tips-text">翻倍豆</span>
        </div>
        <button class="sure-btn" @click="toHideMask">我知道了</button>
      </div>
      <img class="close-img" src="/static/images/close-alert.png" @click="toHideMask">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showBgk: false
      }
    },
    props: {
      isShow: false,
      noclickhide: false,
      beans: ""
    },
    methods: {
      catchTouchAction: function () {

      },
      hideMask(e) {
        if (!e) {
          this.toHideMask()
        } else if (e.target.id === 'mask') {
          if (this.noclickhide) return
          this.toHideMask()
        }
      },
      showMask() {
        this.showBGK()
        this.$emit('onShowHander')
      },
      toHideMask() {
        this.hideBGK()
        this.$emit('onHideHander')
      },
      showBGK() {
        this.isShow = true
        let _this = this
        setTimeout(() => {
          _this.showBgk = true
        }, 100)
      },
      hideBGK() {
        let _this = this
        setTimeout(() => {
          this.showBgk = false
          setTimeout(() => {
            _this.isShow = false
          }, 200)
        }, 100)
      }
    }
  }
</script>

<style lang="scss">
  .exchanged-message-alert {
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    .alert-body-box {
      position: absolute;
      width: 274px;
      height: 228px;
      top: 50%;
      left: 50%;
      margin-top: -137px;
      margin-left: -137px;
      box-sizing: border-box;
      align-content: center;

      .body-content {
        height: 186px;
        background: #FFFFFF;
        border-radius: 8px;
        display: flex;
        flex-flow: column;
        align-items: center;

        .tips-warpper {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: 30px;

          .tips-text {
            color: #333333;
          }

          .tips-time {
            color: #BB422E;
          }
        }

        .top {
          margin-top: 32px;
        }

        .sure-btn {
          width: 182px;
          height: 46px;
          background: #BB422E;
          border-radius: 23px;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #FEE1B6;
          letter-spacing: 0;
          text-align: center;
          line-height: 46px;
          margin-top: 24px;
        }
      }

      .close-img {
        position: absolute;
        width: 25px;
        height: 25px;
        bottom: 0px;
        left: 50%;
        margin-left: -12.5px;
      }
    }
  }
</style>
