<template>
  <div class="join-success-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"
       @touchmove.stop="catchTouchAction" v-if="isShow">
    <div class="alert-body-box">
      <div class="body-content">
        <span class="title">恭喜你参与成功</span>
        <span class="time">{{time}}开奖</span>
        <span class="subtitle">记得来领取奖金哦~</span>
        <button class="sure-btn" @click="toHideMask">好的</button>
      </div>
      <img class="close-img" src="/static/images/close-alert.png" @click="toHideMask">
    </div>
  </div>
</template>

<script>
  export default {
    name: "JoinSuccessAlert",
    data() {
      return {
        showBgk: false
      }
    },
    props: {
      isShow: false,
      noclickhide: false,
      time: ""
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
  .join-success-alert {
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
        .title {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          margin-top: 10px;
          line-height: 22px;
        }

        .time {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #BB422E;
          letter-spacing: 0;
          text-align: center;
          margin-top: 22px;
          line-height: 22px;
        }

        .subtitle {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: 22px;
          margin-top: 2px;
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
