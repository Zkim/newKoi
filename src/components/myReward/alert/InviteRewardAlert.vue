<template>
  <div class="invite-reward-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"
       @touchmove.stop="catchTouchAction" v-if="isShow">
    <div class="alert-body-box">
      <div class="body-content">
        <img class="bg-img" src="/static/images/reward-invite-alert-bg.png">
        <span class="title">好友参与后，你获得</span>
        <span class="time">{{bean}}个翻倍豆</span>
        <!--        <div class="sure-btn" @click="inviteFriend">-->
        <!--          <img class="sure-btn-icon" src="/static/images/reward-wechat.png">-->
        <!--          <span class="sure-btn-title">邀请好友</span>-->
        <!--        </div>-->
        <button open-type="share" class="sure-btn" @tap="inviteFriend">
          <img class="sure-btn-icon" src="/static/images/reward-wechat.png">
          <span class="sure-btn-title">邀请好友</span>
        </button>
        <!--        <button class="sure-btn" @click="toHideMask">好的</button>-->
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
      bean: ""
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
      inviteFriend() {
        this.$emit('inviteFriend');
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
    },
    onShareAppMessage: function (ops) {
      if (ops.from === "button") {
        console.log(ops.target)
      }
      return {
        title: "转发的demo",//这里是定义转发的标题
        path: `../productDetail/main`,//这里是定义转发的地址
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {

        }
      }
    }
  }
</script>

<style lang="scss">
  .invite-reward-alert {
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
      width: 252px;
      height: 320px;
      top: 50%;
      left: 50%;
      margin-top: -160px;
      margin-left: -126px;
      box-sizing: border-box;
      align-content: center;

      .body-content {
        height: 269px;
        /*background: #FFFFFF;*/
        /*border-radius: 8px;*/
        /*background-color: red;*/
        background: rgba(0, 0, 0, 0.0);
        display: flex;
        flex-flow: column;
        align-items: center;
        position: relative;
        /*z-index: 99;*/

        .bg-img {
          position: absolute;
          width: 252px;
          height: 269px;
          top: 0px;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          margin-top: 64px;
          line-height: 22px;
          z-index: 1000;
        }

        .time {
          margin-top: 18px;
          line-height: 33px;
          font-family: PingFangSC-Semibold;
          font-size: 24px;
          color: #BB422E;
          letter-spacing: 0;
          text-align: center;
          z-index: 1001;
        }

        .sure-btn {
          width: 182px;
          height: 46px;
          background: #BB422E;
          border-radius: 23px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 43px;
          z-index: 1003;

          .sure-btn-icon {
            width: 26px;
            height: 26px;
            margin-right: 3px;
          }

          .sure-btn-title {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #FEE1B6;
            letter-spacing: 0;
            text-align: center;
            line-height: 46px;
            margin-left: 3px;
          }
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
