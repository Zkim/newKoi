<template>
  <!--  我的奖励-->
  <div class="reward-container flex-y bg-default">
    <div class="reward-container-bg"></div>
    <div>
      <!--    开奖时间等-->
      <RewardHeader :reward-amount="shareAmount"
                    :total-people="joinNum"
                    totalPeopleTitle="参与人数">
      </RewardHeader>

      <!--    我的奖励-->
      <RewardInfo @withdrawBtnClicked="withdrawBtnClicked"
                  :amount="amount"
                  :base-amount="baseAmount"
                  :bens="bens"
                  :times="times"
                  :rank-amount="rankAmount">
      </RewardInfo>

      <!--    奖励排名-->
      <RewardRankList :list="list"></RewardRankList>

    </div>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import RewardHeader from "../../components/myReward/RewardHeader"
  import RewardInfo from "../../components/myReward/RewardInfo"
  import RewardRankList from "../../components/myReward/RewardRankList"
  import {rewardResult} from '../../api'

  export default {
    components: {
      mptoast,
      RewardHeader,
      RewardInfo,
      RewardRankList,
    },
    data() {
      return {
        shareAmount: "",
        list: [],
        openTime: "",
        bens: "",
        joinNum: "",
        amount: "",
        baseAmount: "",
        rankAmount: "",
        times: "",
        awardDate: ""
      }
    },
    mounted() {
      this.loadData()
    },
    onLoad(options) {
      console.log(options)
      this.awardDate = options.awardDate
    },
    methods: {
      loadData() {
        rewardResult(this.awardDate).then(response => {
          console.log(response.data)
          const {shareAmount, list, openTime, bens, joinNum, amount, baseAmount, rankAmount, times} = response.data
          this.shareAmount = shareAmount
          this.list = list
          this.openTime = openTime
          this.bens = bens
          this.joinNum = joinNum
          this.amount = amount
          this.baseAmount = baseAmount
          this.rankAmount = rankAmount
          this.times = times
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },

      withdrawBtnClicked() {
        this.$router.push({
          path: '/pages/withdrawal/main',
        })
      }
    }
  }
</script>

<style lang="scss">
  .reward-container {
    position: relative;
    background: #C14C38;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;

    .reward-container-bg {
      position: absolute;
      background: #C14C38;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1000;
    }
  }
</style>
