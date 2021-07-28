<template>
  <div class="reward-info-item">
    <span class="item-number">{{number}}</span>
    <span class="item-uint">{{unit}}</span>
  </div>
</template>

<script>
  export default {
    name: "RewardInfoItem",
    props: {
      number: {
        type: String,
        default: ""
      },
      unit: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style lang="scss">
  .reward-info-item {
    display: flex;
    flex-flow: column;
    align-items: center;

    .item-number {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #BB422E;
      letter-spacing: 0;
      text-align: center;
      padding-bottom: 3px;
    }

    .item-uint {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      padding-top: 3px;
    }
  }

</style>
