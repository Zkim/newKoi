<template>
  <div class="reward-bean-item" @click="beanBtnClicked" :class="isShow3Item?'reward-bean-item-3':'reward-bean-item-4'">
    <img class="bottom-icon" src="../../../static/images/reward-bean-item-icon.png" alt="">
    <span class="beans-count">{{item.beans}}豆</span>

    <button open-type="share" v-if="isShowInvite" class="item-btn-share" @tap="beanBtnClicked">
      <img class="bg-img" src="../../../static/images/reward-bean-item-btn-icon.png" alt="">
      <span class="btn-title">领</span>
    </button>
    <div class="item-btn" v-else>
      <img class="bg-img" src="../../../static/images/reward-bean-item-btn-icon.png" alt="">
      <span class="btn-title">领</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RewardBeanItem",
    props: {
      item: {
        type: Object,
        default: {}
      },
      isShowInvite: Boolean,
      default: false,
      isShow3Item: Boolean,
    },
    methods: {
      beanBtnClicked() {
        this.$emit("beanClicked")
      },
      // onShareAppMessage(){
      //   console.log("saaaaaaaaaaaaaa")
      //   return {
      //     title: "daadad",
      //     path: "/pages/index?productId=",
      //     imageUrl:"",
      //   }
      // }
    }
  }
</script>

<style lang="scss">
  .reward-bean-item {
    background: #D0553F;
    width: 79px;
    height: 87px;
    position: relative;
    border-radius: 6px;
    display: flex;
    flex-flow: column;
    align-items: center;

    .bottom-icon {
      position: absolute;
      width: 79px;
      height: 39px;
      bottom: 0px;
      z-index: 0;
    }

    .beans-count {
      margin-top: 10px;
      font-size: 16px;
      color: #FDD9A8;
      letter-spacing: 0;
      text-align: center;
      z-index: 1;
    }

    .item-btn-share {
      width: 34px;
      height: 34px;
      z-index: 2;
      position: relative;
      margin-top: 12px;
      background-color: rgba(0, 0, 0, 0.0);
      border: none;

      .bg-img {
        position: absolute;
        width: 34px;
        height: 34px;
        left: 0;
        top: 0;
      }

      .btn-title {
        position: absolute;
        left: 0;
        top: 0;
        height: 34px;
        width: 34px;
        line-height: 34px;
        font-size: 16px;
        color: #C14B37;
        letter-spacing: 0.67px;
        text-align: center;
      }
    }

    button::after {
      border: none;
    }

    .item-btn {
      width: 34px;
      height: 34px;
      z-index: 2;
      position: relative;
      margin-top: 12px;

      .bg-img {
        width: 34px;
        height: 34px;
      }

      .btn-title {
        position: absolute;
        left: 0;
        top: 0;
        height: 34px;
        width: 34px;
        line-height: 34px;
        font-size: 16px;
        color: #C14B37;
        letter-spacing: 0.67px;
        text-align: center;
      }
    }
  }

  .reward-bean-item-3{
    margin: 0 4px;
  }
</style>
