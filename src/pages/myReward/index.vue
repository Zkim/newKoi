<template>
  <!--  我的奖励-->
  <div class="reward-container flex-y bg-default">
    <div class="reward-container-bg"></div>
    <div class="reward-body">

      <!--    开奖时间等-->
      <RewardHeader :reward-amount="shareAmount"
                    :total-people="openTime"
                    totalPeopleTitle="开奖时间">
      </RewardHeader>

      <!--    排行榜标题-->
      <div class="list-title">
        <span>排名</span>
        <span class="weight-title">前5名</span>
        <span>，可获得额外现金奖励~</span>
      </div>

      <!--    奖励排名-->
      <RewardRankList :list="list"></RewardRankList>

      <!--    翻倍豆 -->
      <RewardBeans :act-list="actList"
                   @beanBtnClicked="beanBtnClicked">
      </RewardBeans>

      <mptoast/>

      <!--    参与成功弹框-->
      <JoinSuccessAlert :is-show="showAlert"
                        :noclickhide="true"
                        @onHideHander="onHideHander"
                        :time="openTime">
      </JoinSuccessAlert>

      <!--    邀请好友提示弹框-->
      <InviteRewardAlert :is-show="showInviteAlert"
                         :noclickhide="true"
                         @onHideHander="onHideHander"
                         @inviteFriend="inviteFriend"
                         :bean="bean">
      </InviteRewardAlert>

      <!--    领取金豆弹框-->
      <ReceiveBeansAlert :is-show="showBeansAlert"
                         :noclickhide="true"
                         @onHideHander="onHideHander"
                         :bean="bean"
                         unit="豆"
                         sub-title="开奖时自动加倍">
      </ReceiveBeansAlert>

      <!--    奖励分完提示弹框-->
      <RewardDivideOverAlert :is-show="showDivideOverAlert"
                             :noclickhide="true"
                             @onHideHander="onHideHander"
                             :time="nextTime">
      </RewardDivideOverAlert>

      <!--    金币兑换商品提示弹框-->
      <ExchangedMeaasgeAlert :is-show="showExchangedMeaasgeAlert"
                             :noclickhide="true"
                             @onHideHander="onHideHander"
                             :beans="bean">
      </ExchangedMeaasgeAlert>
    </div>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import RewardHeader from "../../components/myReward/RewardHeader"
  import RewardInfo from "../../components/myReward/RewardInfo"
  import RewardRankList from "../../components/myReward/RewardRankList"
  import RewardBeans from "../../components/myReward/RewardBeans"
  import JoinSuccessAlert from '../../components/myReward/alert/JoinSuccessAlert'
  import InviteRewardAlert from '../../components/myReward/alert/InviteRewardAlert'
  import ReceiveBeansAlert from '../../components/myReward/alert/ReceiveBeansAlert'
  import RewardDivideOverAlert from '../../components/myReward/alert/RewardDivideOverAlert'
  import ExchangedMeaasgeAlert from '../../components/myReward/alert/ExchangedMeaasgeAlert.vue'
  import {rewardRankList, getReward} from '../../api'

  export default {
    components: {
      mptoast,
      RewardHeader,
      RewardInfo,
      RewardRankList,
      RewardBeans,
      JoinSuccessAlert,
      InviteRewardAlert,
      ReceiveBeansAlert,
      RewardDivideOverAlert,
      ExchangedMeaasgeAlert
    },
    data() {
      return {
        showAlert: false,
        showInviteAlert: false,
        showBeansAlert: false,
        showDivideOverAlert: false,
        showExchangedMeaasgeAlert: false,
        shareAmount: "",
        actList: [],
        // imgShare: {},
        list: [],
        openTime: "",
        // share: {},
        videoAd: null,
      }
    },
    onShow() {
      if (this.shared) {
        setTimeout(() => {
          this.bean = this.alertBeans
          this.showInviteAlert = true
          this.shared = false
        }, 500)
      }
    },

    mounted() {
      this.loadData()
    },
    onLoad(options) {
      this.shared = false
      this.invite_code = options.invite_code
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-bf2d036aec05566e'
        })
        this.videoAd.onLoad(() => {
        })
        this.videoAd.onError((err) => {
        })
      }
    },
    methods: {
      loadData() {
        var _this = this
        rewardRankList().then(response => {
          console.log(response.data)
          const {shareAmount, actList, imgShare, list, openTime, share, joinStatus} = response.data
          _this.shareAmount = shareAmount
          _this.actList = actList
          _this.rewardImgShare = imgShare
          _this.list = list
          _this.openTime = openTime
          _this.rewardShare = share
          _this.alertBeans = actList[0].beans
          if (joinStatus) {
            _this.showAlert = true
          } else {
            _this.showAlert = false
          }
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },

      beanBtnClicked(item) {
        console.log(item.type)
        switch (item.type) {
          case 0:
            break;
          case 12:
            this.getRewardRequest(item.type)
            break;
          case 13:
            this.bean = item.beans
            this.showExchangedMeaasgeAlert = true
            break;
          case 1:
            this.allocVideo(item.type)
            break;
        }
      },

      getRewardRequest(type) {
        var _this = this
        getReward(type).then(res => {
          _this.bean = res.data.beans
          _this.showBeansAlert = true
          _this.loadData()
        }).catch(res => {
          if (res.code === 7004) {
            _this.getRewardBtnTitle = "已领取"
            _this.nextTime = res.data.nextPeriod
            _this.showDivideOverAlert = true
            return
          }
          _this.$mptoast(res.msg)
          if (res.msg) {
            _this.$mptoast(res.msg)
          } else {
            _this.$mptoast(res)
          }
        })
      },

      inviteFriend() {
        this.shared = false
        this.showInviteAlert = false;
      },

      onHideHander() {
        this.showAlert = false
        this.showInviteAlert = false
        this.showBeansAlert = false
        this.showDivideOverAlert = false
        this.showExchangedMeaasgeAlert = false
      },

      allocVideo(index) {
        console.log("allocVideo")
        var _this = this;
        if (this.videoAd) {
          wx.hideLoading()
          this.videoAd.show().catch(() => {
            this.videoAd.load()
              .then(() =>
                this.videoAd.show()
              )
              .catch(err => {
                console.log('激励视频 广告显示失败')
              })
          })
          this.videoAd.onClose(res => {
            _this.videoAd.offClose()
            if (res && res.isEnded) {
              _this.getRewardRequest(index)
            } else {

            }
          })
        } else {
          wx.hideLoading()
        }
      },
    },

    onShareAppMessage: function (ops) {
      /**
       "imgShare": {
            "title": "就在刚刚，我成功瓜分了千元现金，赶紧来试试~",
            "url": "https://api.youliaostore.com/images/share1.png",
            "page": "pages/homeIndex/main?type=1&invite_code=576c53",
            "imgUrl": "https://api.youliaostore.com/images/redbag.png",
            "icon": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eojJEQSNzdFD2SyXFuBg3lzzyrEa5BMjcunDxt682xTRrUkXznZxku3TNic4gaNFe8BIiadibBkFDVzw/132"
        }
       */
      if (ops.from === "button") {
        this.shared = true
        return {
          title: this.rewardImgShare.title,
          imageUrl: this.rewardImgShare.imgUrl,
          path: this.rewardImgShare.page,
        }
      }
      /**
       "share": {
            "title": "网友沸腾，这么好的东西，为什么现在才发现！",
            "url": "https://api.youliaostore.com/images/team.png",
            "page": "pages/homeIndex/main?type=0&invite_code=576c53"
        }
       */
      return {
        title: this.rewardShare.title,
        imageUrl: this.rewardShare.imgUrl,
        path: this.rewardShare.page,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {

        }
      }
    },
  }
</script>

<style lang="scss">
  .reward-container {
    position: relative;
    background: #C14C38;
    width: 100%;
    height: 100%;

    .reward-container-bg {
      position: absolute;
      background: #C14C38;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1000;
    }

    .reward-body {
      .list-title {
        margin-top: 10px;
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.58px;

        .weight-title {
          color: #FEE1B7;
        }
      }
    }
  }

  .noscroll {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
  }
</style>
