<template>
  <div class="reward-rank-item">
    <span class="rank-label">{{item.rank}}</span>
    <div class="img-warpper">
      <img class="icon" :src="item.avatarUrl" alt="">
      <span class="me-tag" v-if="item.isMe">我</span>
    </div>
    <span class="beans-label">{{item.beans}}</span>
    <span class="amount-label">{{item.amount+"元"}}</span>
  </div>
</template>

<script>
  export default {
    name: "RewardRankListItem",
    props: {
      item: {
        type: Object,
        default: {}
      },
    }
  }
</script>

<style lang="scss">
  .reward-rank-item {
    display: flex;
    justify-content: space-between;
    height: 43px;
    padding: 0 15px;
    align-items: center;

    .rank-label {
      flex: 1.5;
      font-size: 14px;
      color: #351800;
      letter-spacing: 0;
    }

    .img-warpper {
      flex: 2.5;
      position: relative;
      .icon {
        width: 32px;
        height: 32px;
        border-radius: 16px;
      }
      .me-tag{
        position: absolute;
        top: 0;
        background: #BB422E;
        border: 1px solid #FEE1B7;
        border-radius: 16px;
        font-family: PingFangSC-Semibold;
        font-size: 10px;
        color: #FEE1B7;
        letter-spacing: 0.42px;
        text-align: center;
        line-height: 14px;
        height: 14px;
        width: 26px;
        left: 3px;
      }
    }

    .beans-label {
      flex: 5;
      font-size: 12px;
      color: #BC4430;
      letter-spacing: 0;
    }

    .amount-label {
      flex: 1.5;
      font-size: 12px;
      color: #BC4430;
      letter-spacing: 0;
      text-align: right;
    }
  }
</style>
