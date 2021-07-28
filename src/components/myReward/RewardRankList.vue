<template>
  <div class="reward-rank-list">
    <RewardRankListHeader></RewardRankListHeader>

    <RewardRankListItem v-for="(item, index) in list" :key="index" :item="item"></RewardRankListItem>
  </div>
</template>

<script>
  import RewardRankListItem from './RewardRankListItem'
  import RewardRankListHeader from './RewardRankListHeader'

  export default {
    name: "RewardRankList",
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    components: {
      RewardRankListItem,
      RewardRankListHeader
    }
  }
</script>

<style lang="scss">
  .reward-rank-list {
    background: #FEE1B7;
    border-radius: 10px;
    margin: 10px 8px 0 8px;
  }
</style>
