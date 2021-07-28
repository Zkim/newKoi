<template>
  <div class="reward-beans">
    <div class="reward-beans-title">
      <span>每领</span>
      <span class="title-weight">10个</span>
      <span>翻倍豆</span>
      <span>瓜分金额</span>
      <span class="title-weight">翻1倍</span>
    </div>
    <div :class="actList.length >= 4 ? 'bean-items' : 'bean-items-swapper'">
      <RewardBeanItem v-for="(item, index) in actList" :key="index"
                      :item="item"
                      @beanClicked="getBeans(item)"
                      :is-show-invite="(item.type === 0)?true:false"
                      :isShow3Item="actList.length >= 4 ? false : true"
      ></RewardBeanItem>
    </div>
  </div>
</template>

<script>
  import RewardBeanItem from './RewardBeanItem'

  export default {
    name: "RewardBeans",
    props: {
      actList: {
        type: Array,
        default: [],
      },
      actListTemp: [0, 1, 2, 3]
    },
    components: {
      RewardBeanItem
    },
    methods: {
      getBeans(item) {
        this.$emit("beanBtnClicked", item)
      }
    }
  }
</script>

<style lang="scss">
  .reward-beans {
    height: 153px;
    background: #FEE1B7;
    border-radius: 10px;
    margin: 10px 8px 13px 8px;

    .reward-beans-title {
      height: 53px;
      line-height: 53px;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.67px;
      text-align: center;

      .title-weight {
        color: #C14B37;
        font-weight: bold;
      }
    }

    .bean-items {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      margin: 0 13px;
    }

    .bean-items-swapper {
      display: flex;
      flex-flow: row;
      align-items: center;
      /*justify-content: space-between;*/
      margin: 0 9px;
    }
  }
</style>
