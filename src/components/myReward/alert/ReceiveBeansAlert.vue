<template>
  <div class="receive-beans-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"
       @touchmove.stop="catchTouchAction" v-if="isShow">
    <div class="alert-body-box">
      <div class="body-content">
        <img class="bg-img" src="/static/images/recived-beans-alert-bg.png">
        <span class="title">恭喜获得</span>
        <div class="bean-detail">
          <span class="bean-count">{{bean}}</span>
          <span class="bean-unit">{{unit}}</span>
        </div>
        <button class="sure-btn" @click="toHideMask">开心收下</button>
        <span class="sub-title">{{subTitle}}</span>
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
      bean: "",
      unit: "豆",
      isShowAd: true,
      subTitle: "开奖时自动加倍"
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
  .receive-beans-alert {
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
      top: 34px;
      box-sizing: border-box;
      align-content: center;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      .body-content {
        width: 252px;
        height: 266px;
        background: rgba(0, 0, 0, 0.0);
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .bg-img {
          position: absolute;
          width: 252px;
          height: 266px;
          top: 0px;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .title {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #D1563F;
          text-align: center;
          line-height: 18px;
          margin-top: 40px;
          z-index: 1000;
        }

        .bean-detail {
          margin-top: 20px;
          z-index: 1001;

          .bean-count {
            font-family: Avenir-Heavy;
            font-size: 36px;
            color: #A16830;
            text-align: center;
            line-height: 28px;
            margin-right: 3px;
          }

          .bean-unit {
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #A16830;
            text-align: center;
            line-height: 28px;
            margin-left: 3px;
          }
        }

        .sure-btn {
          width: 146px;
          height: 50px;
          line-height: 50px;
          background: #FADDB3;
          border: 0 solid #979797;
          border-radius: 25px;
          font-family: PingFangSC-Semibold;
          font-size: 18px;
          color: #A16830;
          letter-spacing: 1.12px;
          text-align: center;
          margin-top: 50px;
          z-index: 1003;
        }

        .sub-title {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #E9CE9A;
          letter-spacing: 0.75px;
          text-align: center;
          line-height: 17px;
          margin-top: 15px;
          z-index: 1004;
        }
      }

      .ad-warpper {
        width: 316px;
        /*height: 89px;*/
        margin-top: 8px;
        background: rgba(4, 4, 4, 0.70);
        border: 0 solid #979797;
        border-radius: 6px;
      }

      .close-img {
        width: 25px;
        height: 25px;
        margin-top: 18px;
      }
    }


  }
</style>
