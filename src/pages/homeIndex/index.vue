<template>
  <div style="background: #f7f7f7; padding-bottom: 10rpx;">
    <!-- 红包弹框 -->
    <div class="alert-box" v-if="showEnvelopesAlert" catchtouchmove="ture">
      <div class="center-box" @click="binEnvelopesBtnTap">
        <img class="envelopes-img" src="/static/images/envelopes-alert.png">
        <div class="envelopes-alert-text-box">
          <p class="envelopes-alert-title">{{dataInfo.teamInfo.assistInfo.num}}</p>
          <p class="envelopes-alert-desc">{{dataInfo.typeStr}}</p>
        </div>
        <ad unit-id="adunit-188e865d544f6ca0" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        <div class="center-box">
          <img class="close-img" src="/static/images/close-alert.png" @click="showEnvelopes">
        </div>
      </div>
    </div>
    <!-- 组队弹框 -->
    <div class="alert-box" v-if="showTeamAlert" catchtouchmove="ture">
      <img class="team-alert-img" src="/static/images/team-box-img.png">
      <div class="alert-body-box">
        <div class="commodity-alert-text-box" v-for="(item, index) in dataInfo.teamPopup" :key="index">
          <img class="commodity-user-img" :src="item.avatarUrl">
          <p class="commodity-name">{{item.name}}</p>
          <div class="commodity-right-box">
            <p class="commodity-desc">{{item.content}}</p>
            <img class="commodity-img" :src="item.url">
          </div>
        </div>
        <div class="commodity-btn-box">
          <button class="commodity-alert-btn" @click="bindCommodityBtnTap">查看奖励</button>
        </div>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="closeAlert">
      </div>
    </div>
    <!-- 瓜分弹框 -->
    <div class="alert-box" v-if="showCarveAlert" catchtouchmove="ture">
      <div class="center-box" @click="tapCarve">
        <img class="carve-img" src="../../../static/images/red-bag-img.png">
        <div class="carve-alert-text-box">
          <p class="carve-alert-title">18</p>
          <p class="carve-alert-desc">元</p>
        </div>
      </div>
    </div>
    <mptoast />
    <div class="center-box" v-if="isLogin==false">
      <button class="center-button" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <img class="center-img" src="../../../static/images/redEnvelopes-nomal.png">
      </button>
    </div>
    <div class="center-box" v-if="isLogin==true">
      <img class="center-img" src="../../../static/images/redEnvelopes.png">
      <div class="amount-detail-warpper">
        <p class="center-money-title">￥</p>
        <p class="center-money-text">{{dataInfo.shareAmount}}</p>
      </div>
      <form @submit="bindOpenTap" report-submit='true' class="center-button">
        <button class="openBtn" form-type="submit"> {{dataInfo.shareInfo.status==0 ? "参与瓜分":"24:00开奖"}} </button>
      </form>
    </div>
    <div class="bottom-box" v-if="isLogin==true">
      <div style="text-align:center; margin-bottom: 20rpx;">
        <text class="bottom-header-title">组队领最高</text>
        <text class="bottom-header-desc">18元现金</text>
      </div>
      <div style="position: relative; margin-bottom: 10rpx;">
        <img class="team-img" :src="iconList[0]" alt="">
        <img class="team-leader-img" src="../../../static/images/leader-icon.png">
        <img class="team-img" :src="iconList[1]" alt="">
        <img class="team-img" :src="iconList[2]" alt="">
      </div>
      <button class="team-bottom-btn" open-type="share">邀好友领现金</button>
      <button class="team-btn" @click="clickMyAward">我的奖励</button>
    </div>
    <div @click="headerClick" v-if="showHeader">
      <img class="top-header-img" src="/static/images/top-header-img.png">
    </div>
    <JoinSuccessAlert :is-show="showJoinSuccessAlert" :noclickhide="true"
                      @onHideHander="onHideHander"></JoinSuccessAlert>
    <ad unit-id="adunit-cb5283e1285b02fe" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import JoinSuccessAlert from '../../components/myReward/alert/JoinSuccessAlert'

  export default {
    data() {
      return {
        dataInfo: {},
        iconList: [],
        actList: [],
        redBagInfoText: "",
        showEnvelopesAlert: false, //用来控制显示与否的变量
        showCarveAlert: false,
        showTeamAlert: false,
        videoAd: null,
        isLogin: false,
        renRenTimer: null,
        amount: '',
        invite_code: "",
        interstitialAd: null,
        renRenNum: 0,
        notWatch: 0,
        showHeader: true,
        showJoinSuccessAlert: false
      }
    },
    components: {
      mptoast,
      JoinSuccessAlert
    },
    onLoad(options) {
      this.invite_code = options.invite_code
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-bf2d036aec05566e'
        })
        this.videoAd.onLoad(() => {})
        this.videoAd.onError((err) => {})
      }

      if (wx.createInterstitialAd) {
        this.interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-dc9711bc00e737b4'
        })
        this.interstitialAd.onLoad(() => {})
        this.interstitialAd.onError((err) => {})
        this.interstitialAd.onClose(() => {})
      }
      var showHeader = wx.getStorageSync('showHeader')
      if (showHeader == 1) {
        this.showHeader = false
      }

    },
    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    methods: {
      clickMyAward() {
        const url = '../teamAward/main'
        wx.navigateTo({
          url
        })
      },
      bindCommodityBtnTap() {
        this.showTeamAlert = false
        this.clickMyAward()
      },
      clickBonus() {
        const url = '../withdrawal/main'
        wx.navigateTo({
          url
        })
      },
      headerClick() {
        wx.setStorage({
          key: 'showHeader',
          data: 1
        })
        this.showHeader = false
      },
      pushRenRenTime() {
        var _this = this;
        wx.setStorage({
          key: 'redBagType',
          data: 5
        })
        wx.navigateToMiniProgram({
          appId: 'wxd889b93f7e88344e',
          path: 'pages/home/home?channelid=6773', //打开的页面路径，如果为空则打开首页
          envVersion: 'release',
          success(res) {
            _this.renRenTimer = setInterval(() => {
              _this.renRenNum++;
            }, 1000);
          }
        })
      },
      pushTiaoLingTime() {
        var _this = this;
        wx.setStorage({
          key: 'redBagType',
          data: 7
        })
        wx.navigateToMiniProgram({
          appId: 'wxb6c5b1f1dcea0138',
          path: 'live/pages/random/random?cc=SZZSKJFU&ald_media_id=57132&ald_link_key=ba01d2ad8e215d58', //打开的页面路径，如果为空则打开首页
          envVersion: 'release',
          success(res) {
            _this.renRenTimer = setInterval(() => {
              _this.renRenNum++;
            }, 1000);
          }
        })
      },
      pushWanZhuanTime() {
        var _this = this;
        wx.setStorage({
          key: 'redBagType',
          data: 8
        })
        wx.navigateToMiniProgram({
          appId: 'wx6bb4d07d0f44b40c',
          path: '',
          envVersion: 'release',
          success(res) {
            _this.renRenTimer = setInterval(() => {
              _this.renRenNum++;
            }, 1000);
          }
        })
      },
      //点击team按钮
      tapTeamBtn(e) {
        console.log(e.mp.detail.formId);
        if (this.dataInfo.status == 2) {
          this.loadData()
        } else {
          var _this = this;
          this.$fly.request({
            method: 'post',
            url: '/lucky/join-team',
            body: {
              invite_code: _this.invite_code,
              formId: e.mp.detail.formId
            }
          }).then(res => {
            if (res.code == 200) {
              _this.loadData()
            } else {
              _this.$mptoast('请求失败')
            }
          })
        }
      },
      bindGetUserInfo(e) {
        const self = this
        if (this.isLogin == true) {
          return
        }
        if (e.mp.detail.userInfo) {
          const fly = this.$fly
          wx.login({
            success(res) {
              if (res.code) {
                fly
                  .request({
                    method: "post",
                    url: "/user/user-login",
                    body: {
                      'encryptData': e.mp.detail.encryptedData,
                      'iv': e.mp.detail.iv,
                      'jsCode': res.code
                    }
                  })
                  .then(res => {
                    console.log(res)
                    if (res.code === 200) {
                      wx.setStorage({
                        key: 'token',
                        data: res.data.userToken
                      })
                      self.loadData()
                    } else {
                      self.$mptoast(res.msg)
                    }
                  })
              }
            },
          })
        } else {}
      },
      closeAlert() {
        this.showTeamAlert = !this.showTeamAlert
      },
      tapCarve() {
        this.showCarveAlert = !this.showCarveAlert
        this.showEnvelopesAlert = !this.showEnvelopesAlert
      },
      showEnvelopes() {
        this.showEnvelopesAlert = !this.showEnvelopesAlert
      },
      touchForbidden(e) {
        e.preventDefault()
      },
      binEnvelopesBtnTap() {
        this.showEnvelopesAlert = !this.showEnvelopesAlert
        this.clickMyAward()
      },
      //瓜分奖金接口
      openDayMoney(isSubscribe, formId) {
        var _this = this;
        _this.$fly.request({
          method: 'post',
          url: '/money/join',
          body: {
            invite_code: _this.invite_code,
            isSubscribe: isSubscribe,
            formId: formId
          }
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            _this.rewardRankList()
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      bindLuckDrawTap() {
        var _this = this;
        if (this.isLogin == false) {
          return
        }
        if (this.dataInfo.status == 5) {
          _this.$fly.request({
            method: 'post',
            url: '/home/clear-status',
            body: {}
          }).then(res => {
            console.log(res)
            if (res.code == 200) {
              _this.loadData()
            } else {
              _this.$mptoast(res.msg)
            }
          })
        } else {
          const url = '../luckyDraw/main'
          wx.navigateTo({
            url
          })
        }

      },
      bindOpenTap(e) {
        if (this.dataInfo.shareInfo.status == 1) {
          this.rewardRankList()
          return
        }
        console.log(e.mp.detail.formId);
        var _this = this;
        var isSubscribe = 0
        //订阅消息
        wx.requestSubscribeMessage({
          tmplIds: ['nQMRmflbjTBJ5A7cBEaa7GEwG2zo8T4B8tugWU0IH7g'],
          success(res) {
            isSubscribe = 1
            _this.openDayMoney(isSubscribe, e.mp.detail.formId)
          },
          fail(res) {
            isSubscribe = 0
            _this.openDayMoney(isSubscribe, e.mp.detail.formId)
          }
        })
      },
      bindRedBagTap(index) {
        var _this = this;
        wx.aldstat.sendEvent('点击浮动红包', {
          '红包名': _this.actList[index].name
        });
        if (_this.actList[index].type == 1) {
          if (this.dataInfo.isShow == 0) {
            return
          }
          new Promise((resolve, reject) => {
            wx.showLoading({
              title: "加载中…"
            })
            resolve()
          }).then(() => {
            _this.allocVideo(index)
          })
        } else if (_this.actList[index].type == 5) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '需要使用10秒以上并授权，才可以获得奖励哦',
            success(res) {
              if (res.confirm) {
                _this.pushRenRenTime()
              }
            }
          })
        } else if (_this.actList[index].type == 7) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '需要使用10秒以上并授权，才可以获得奖励哦',
            success(res) {
              if (res.confirm) {
                _this.pushTiaoLingTime()
              }
            }
          })
        } else if (_this.actList[index].type == 8) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '需要使用10秒以上并授权，才可以获得奖励哦',
            success(res) {
              if (res.confirm) {
                _this.pushWanZhuanTime()
              }
            }
          })
        } else {
          _this.tapGift(index)
        }
      },
      tapGift(index) {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/share/award',
          body: {
            type: this.actList[index].type,
            notWatch: this.notWatch
          }
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            if (_this.notWatch == 1) {
              _this.loadData()
              _this.notWatch = 0
              return
            }
            if (res.data.times) {
              _this.times = res.data.times
              _this.showGiftAlert = !_this.showGiftAlert
            }
            _this.loadData()

          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      allocVideo(index) {
        var _this = this;
        // 用户触发广告后，显示激励视频广告
        if (this.videoAd) {
          wx.hideLoading()
          this.videoAd.show().catch(() => {
            // 失败重试
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
            // 用户点击了【关闭广告】按钮
            if (res && res.isEnded) {
              // 正常播放结束，可以下发游戏奖励
              _this.tapGift(index)
            } else {
              // 播放中途退出，不下发游戏奖励
              _this.notWatch = 1
              _this.tapGift(index)
              return
            }
          })

        } else {
          wx.hideLoading()
        }
      },
      loadData() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/money/index',
          body: {
            invite_code: _this.invite_code,
          }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            _this.dataInfo = res.data
            _this.isLogin = res.data.isLogin
            _this.actList = res.data.actList
            _this.iconList = _this.dataInfo.teamInfo.iconList
            if (_this.dataInfo.teamPopup) {
              _this.showTeamAlert = !_this.showTeamAlert
            } else if (_this.dataInfo.teamInfo.assistInfo) {
              _this.dataInfo.typeStr = _this.dataInfo.teamInfo.assistInfo.type == "coin" ? "金币" : "元"
              _this.showCarveAlert = !_this.showCarveAlert
            }else {
              _this.showCarveAlert = false
              _this.showTeamAlert = false
            }

            _this.invite_info = _this.dataInfo.share
            console.log(_this.dataInfo.share)
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },

      // 参与瓜分
      rewardRankList(){
        this.$router.push({
          path: '/pages/myReward/main',})
        // this.$router.push({
        //   path: '/pages/rewardResult/main',query:{awardDate: "2020-04-18"}})
      }
    },
    onShow() {
      var _this = this;
      this.loadData()
      var redBagType = wx.getStorageSync('redBagType')
      if (this.renRenNum >= 10) {
        _this.$fly.request({
          method: 'post',
          url: '/share/award',
          body: {
            type: redBagType
          }
        }).then(res => {
          if (res.code == 200) {
            _this.times = res.data.times
            _this.showGiftAlert = !_this.showGiftAlert
            _this.loadData()
          }
        })
      }
      this.renRenNum = 0
      clearTimeout(this.renRenTimer);
      if (this.interstitialAd) {
        this.interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    },
    onShareAppMessage(options) {
      return {
        title: this.invite_info.title,
        path: this.invite_info.page,
        imageUrl: this.invite_info.url
      }
    },
  }

</script>

<style scoped>
  .top-header-img {
    position: fixed;
    height: 80rpx;
    width: 100%;
    top: 0;
  }

  /* alert */
  .alert-box {
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .envelopes-img {
    position: relative;
    width: 502rpx;
    height: 532rpx;
    padding-top: 200rpx;
  }

  .envelopes-alert-text-box {
    position: absolute;
    top: 320rpx;
    text-align: right;
    width: 100%;
  }

  .envelopes-alert-text-box-bottom {
    position: absolute;
    top: 400rpx;
    text-align: center;
    width: 100%;
  }

  .envelopes-alert-title {
    color: #A16830;
    font-size: 36px;
    float: left;
    width: 54%;
    font-weight: bold;
  }

  .envelopes-alert-desc {
    color: #A16830;
    font-size: 14px;
    width: 62%;
    padding-top: 40rpx;
  }

  .carve-alert-text-box {
    position: absolute;
    top: 360rpx;
    text-align: right;
    width: 100%;
  }

  .carve-alert-text-box-bottom {
    position: absolute;
    top: 420rpx;
    text-align: center;
    width: 100%;
  }

  .carve-alert-title {
    color: #FEE1B7;
    font-size: 60px;
    float: left;
    width: 54%;
    font-weight: bold;
  }

  .carve-alert-desc {
    color: #FEE1B7;
    font-size: 16px;
    width: 62%;
    padding-top: 90rpx;
  }

  .envelopes-alert-info {
    color: #A16830;
    font-size: 12px;
    padding-top: 20rpx;
  }

  .carve-img {
    position: relative;
    width: 534rpx;
    height: 622rpx;
    padding-top: 200rpx;
  }

  .team-alert-img {
    position: relative;
    width: 682rpx;
    height: 668rpx;
    padding-top: 200rpx;
    padding-left: 34rpx;
  }

  .alert-body-box {
    position: absolute;
    top: 320rpx;
    text-align: right;
    width: 100%;
  }

  .commodity-alert-text-box {
    width: 100%;
    height: 126rpx;
  }

  .commodity-user-img {
    padding-top: 10rpx;
    padding-left: 72rpx;
    float: left;
    width: 58rpx;
    height: 58rpx;
  }

  .commodity-name {
    float: left;
    font-size: 14px;
    color: #FDD9A8;
    padding-top: 20rpx;
    text-align: center;
    padding-left: 30rpx;
  }

  .commodity-right-box {
    text-align: right;
    position: absolute;
    right: 64rpx;
    float: left;
  }

  .commodity-desc {
    float: left;
    font-size: 14px;
    color: #FDD9A8;
    padding-top: 20rpx;
    text-align: center;
  }

  .commodity-img {
    float: left;
    width: 24rpx;
    height: 22rpx;
    padding-top: 30rpx;
    text-align: right;
    padding-left: 14rpx;
  }

  .commodity-btn-box {
    padding-top: 28rpx;
  }

  .commodity-alert-btn {
    width: 414rpx;
    height: 88rpx;
    border-radius: 40rpx;
    background: #DFB58C;
    font-size: 14px;
    color: #55380F;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .commodity-alert-btn::after {
    border: none;
  }

  .close-img {
    width: 50rpx;
    height: 50rpx;
    padding-top: 20rpx;
  }

  /* center */

  .center-box {
    height: 400rpx;
    margin: 16rpx;
    text-align: center;
    border-radius: 20rpx;
    position: relative;
  }

  .center-button {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .center-button::after {
    border: none;
  }

  .center-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /*z-index: 3000;*/
  }

  .amount-detail-warpper{
    position: absolute;
    height: 55px;
    width: 100%;
    top: 40px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  /* open-center */
  .center-money-title {
    color: #E9CE9A;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .center-money-text {
    color: #E9CE9A;
    font-size: 40px;
    font-weight: bolder;
  }

  .openBtn {
    color: #D0553F;
    background: #E9CE9A;
    font-size: 17px;
    height: 100rpx;
    line-height: 100rpx;
    width: 300rpx;
    border-radius: 60rpx;
    top: 107px;
    left: 4rpx;
    font-weight: bold;
  }

  /* bottom */

  .bottom-box {
    margin: 16rpx;
    height: 400rpx;
    border-radius: 20rpx;
    background: #FEE1B7;
    padding-bottom: 12rpx;
    padding-top: 40rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
  }

  .bottom-header-title {
    color: #351800;
    font-size: 18px;
    font-weight: bold;
  }

  .bottom-header-desc {
    color: #BB422E;
    font-size: 18px;
    padding-right: 40rpx;
    padding-bottom: 6rpx;
    word-break: break-all;
  }

  .team-img {
    width: 96rpx;
    height: 96rpx;
    float: left;
    margin-right: 17rpx;
    margin-top: 17rpx;
    margin-left: 87rpx;
    margin-bottom: 40rpx;
    border-radius: 50%;
  }

  .team-leader-img {
    position: absolute;
    top: 80rpx;
    left: 86rpx;
    width: 90rpx;
    height: 38rpx;
  }

  .team-btn {
    width: 220rpx;
    height: 92rpx;
    line-height: 92rpx;
    border-radius: 40rpx;
    background: #FEE1B7;
    color: #BB422E;
    font-size: 18px;
    margin-top: 18rpx;
    border-width: 1rpx;
    border-color: #BB422E;
    border-style: solid;
    float: left;
  }

  .team-bottom-btn {
    width: 370rpx;
    height: 92rpx;
    line-height: 92rpx;
    border-radius: 40rpx;
    background: #BB422E;
    color: #FEE1B7;
    font-size: 18px;
    margin-top: 18rpx;
    float: left;
    margin-left: 26rpx;
    margin-right: 26rpx;
  }

</style>
