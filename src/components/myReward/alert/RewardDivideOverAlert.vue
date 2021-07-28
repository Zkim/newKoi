<template>
  <div class="divide-over-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"
       @touchmove.stop="catchTouchAction" v-if="isShow">
    <div class="alert-body-box">
      <div class="body-content">
        <span class="title">哎呀，抢光啦~</span>
        <div class="tips-warpper">
          <span class="tips-text">下一波</span>
          <span class="tips-time">{{time}}</span>
          <span class="tips-text">再来抢吧</span>
        </div>
        <button class="sure-btn" @click="toHideMask">我知道了</button>
      </div>
      <div class="ad-warpper" v-show="!isShowAd">
        <ad unit-id="adunit-822b0fbbbc660303"></ad>
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
      time: "",
      isShowAd: true
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
        console.log("showMask")
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
  .divide-over-alert {
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .alert-body-box {
      position: absolute;
      top: 108px;
      box-sizing: border-box;
      align-content: center;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      .body-content {
        height: 186px;
        width: 274px;
        background: #FFFFFF;
        border-radius: 8px;
        display: flex;
        flex-flow: column;
        align-items: center;
        .title {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          margin-top: 30px;
          line-height: 22px;
        }

        .tips-warpper{
          font-family: PingFangSC-Semibold;
          line-height: 22px;
          font-size: 16px;
          letter-spacing: 0;
          text-align: center;
          margin-top: 18px;
          .tips-text{
            color: #333333;
          }
          .tips-time{
            color: #BB422E;
          }
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

      .ad-warpper {
        width: 316px;
        margin-top: 8px;
        background: rgba(4,4,4,0.70);
        border: 0 solid #979797;
        border-radius: 6px;
      }

      .close-img {
        width: 25px;
        height: 25px;
        margin-top: 8px;
      }
    }
  }
</style>
