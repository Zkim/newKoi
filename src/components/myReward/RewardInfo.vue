<template>
  <div class="reward-info">
    <div class="reward-info-top">
      <span class="top-title">恭喜你获得</span>
      <div class="amount-wrapper">
        <span class="amount-label">{{amount}}</span>
        <span class="reward-unit">元</span>
      </div>
      <div class="withdraw-btn" @click="withdrawBtnClicked">立即提现</div>
    </div>
    <div class="reward-info-bottom">
      <RewardInfoItem :number="baseAmount" unit="瓜分金额(元)"></RewardInfoItem>
      <RewardInfoItem :number="bens" unit="翻倍豆(个)"></RewardInfoItem>
      <RewardInfoItem :number="times" unit="开奖翻倍"></RewardInfoItem>
      <RewardInfoItem :number="rankAmount" unit="排名奖励(元)"></RewardInfoItem>
    </div>
  </div>
</template>

<script>
  import RewardInfoItem from './RewardInfoItem'

  export default {
    name: "RewardInfo",
    components: {
      RewardInfoItem
    },
    props: {
      amount: {
        type: String,
        default: ""
      },
      baseAmount: {
        type: String,
        default: ""
      },
      rankAmount: {
        type: String,
        default: ""
      },
      bens: {
        type: String,
        default: ""
      },
      times: {
        type: String,
        default: ""
      }
    },
    methods: {
      withdrawBtnClicked() {
        console.log("-----------")
        this.$emit("withdrawBtnClicked")
      }
    }
  }
</script>

<style lang="scss">
  .reward-info {
    background: #FEE1B7;
    border-radius: 10px;
    margin: 10px 8px 0 8px;

    .reward-info-top {
      height: 158px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 25px;
      padding-top: 22px;

      .top-title {
        font-size: 18px;
        color: #333333;
        letter-spacing: 0.75px;
        text-align: center;
      }

      .amount-wrapper {
        .amount-label {
          font-size: 36px;
          color: #BB422E;
          letter-spacing: 0;
          text-align: center;
          font-weight: 500;
        }

        .reward-unit {
          font-size: 16px;
          color: #BB422E;
          letter-spacing: 0;
          text-align: center;
        }
      }

      .withdraw-btn {
        background: #BB422E;
        border: 0 solid #979797;
        border-radius: 27.5px;
        font-size: 18px;
        color: #FEE1B7;
        letter-spacing: 0;
        text-align: center;
        width: 218px;
        height: 55px;
        line-height: 55px;
      }
    }

    .reward-info-bottom {
      height: 74px;
      background: #F6E7D5;
      border-radius: 0 0 10px 10px;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-around;
    }
  }

</style>
