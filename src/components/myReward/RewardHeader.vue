<template>
  <div class="reward-header">
    <div class="header-title">
      <img class="icon-left" src="../../../static/images/reward-header-left-icon.png">
      <img class="icon-center" src="../../../static/images/reward-header-center-icon.png" alt="" :mode="heightFix">
      <img class="icon-right" src="../../../static/images/reward-header-right-icon.png">
    </div>
    <div class="header-content">
      <div class="total-reward">
        <span class="nuber">{{rewardAmount}}</span>
        <span class="subtitle">总奖金(元)</span>
      </div>
      <div class="total-reward">
        <span class="nuber">{{totalPeople}}</span>
        <span class="subtitle">{{totalPeopleTitle}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RewardHeader",
    props: {
      rewardAmount: {
        type: String,
        default: ""
      },
      totalPeople: {
        type: String,
        default: ""
      },

      totalPeopleTitle: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style lang="scss">
  .reward-header {
    /*width: 100%;*/
    .header-title {
      margin: 17px 3px 0px 10px;
      height: 83px;
      display: flex;
      flex-flow: row;
      align-items: start;
      justify-content: space-between;

      .icon-left {
        width: 56px;
        height: 60px;
      }

      .icon-center {
        padding-left: 5px;
        margin-top: 30px;
        height: 38px;
        width: 243px;
      }

      .icon-right {
        width: 68px;
        height: 83px;
      }
    }

    .header-content {
      height: 74px;
      margin: 0px 38px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;

      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-around;

      .total-reward {
        display: flex;
        flex-flow: column;
        font-family: PingFangSC-Semibold;
        letter-spacing: 0;
        text-align: center;

        .nuber {
          font-size: 21px;
          color: #FEE1B7;
        }

        .subtitle {
          font-size: 14px;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
