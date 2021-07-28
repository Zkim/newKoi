<template>
  <div class="reward-rank-header">
    <span class="rank-label">排名</span>
    <span class="user">用户</span>
    <span class="beans-label">翻倍豆</span>
    <span class="amount-label">排名奖励</span>
  </div>
</template>

<script>
  export default {
    name: "RewardRankListHeader",
  }
</script>

<style lang="scss">
  .reward-rank-header {
    display: flex;
    justify-content: space-between;
    height: 43px;
    padding: 0 15px;
    align-items: center;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #351800;
    letter-spacing: 0;

    .rank-label {
      flex: 1.5;
    }

    .user {
      flex: 2.5;
    }

    .beans-label {
      flex: 5;
    }

    .amount-label {
      flex: 1.5;
      text-align: right;
    }
  }
</style>
