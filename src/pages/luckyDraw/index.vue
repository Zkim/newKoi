<template>
  <div style="background: #f7f7f7;padding-top:4rpx;padding-bottom:16rpx;">
    <!-- 商品弹框 -->
    <div class="alert-box" v-if="showCommodityAlert" catchtouchmove="ture">
      <div class="center-box alert-body-box">
        <div class="commodity-alert-text-box" v-for="(item, index) in dataList" :key="index">
          <img class="commodity-user-img" :src="item.icon">
          <p class="commodity-desc">{{item.content}}</p>
          <img class="commodity-img" :src="item.awardIcon">
        </div>
        <div class="commodity-btn-box" v-if="isShowBtn">
          <button class="commodity-alert-btn" @click="bindCommodityBtnTap">查看实物奖品</button>
        </div>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="closeAlert">
      </div>
    </div>
    <!-- 页面 -->
    <!-- 迭代新增 -->
    <div class="lucky-top-box" @click="goGiftPage">
      <img class="lucky-top-img" src="../../../static/images/gift-icon.png" alt="">
      <p class="lucky-top-desc">实物奖品</p>
      <img class="lucky-top-push shape-img" src="../../../static/images/shape-gray.png">
    </div>
    <div class="lucky-list" v-for="(item, index) in sourseList" :key="index">
      <div class="lucky-list-header-box">
        <p class="header-box-number">NO.{{item.teamCode}}</p>
        <p class="header-box-desc">{{item.teamStatus}}</p>
      </div>
      <div style="clear:both; height: 138rpx;">
        <img class="team-img" :src="item.iconList[0]" alt="">
        <img class="team-img" :src="item.iconList[1]" alt="">
        <img class="team-img" :src="item.iconList[2]" alt="">
        <img class="team-img" :src="item.iconList[3]" alt="">
        <img class="team-img" :src="item.iconList[4]" alt="">
      </div>
      <div class="lucky-list-line"></div>
      <div class="lucky-item-desc" @click="showAlert(index)" v-if="item.status">查看中奖详情
        <img class="shape-yellow-img" src="../../../static/images/shape-yellow.png">
      </div>
      <div class="lucky-item-none-desc" v-if="!item.status">队伍成员与往期完全相同，无法获得奖励</div>
    </div>
  </div>
</template>

<script>
  import mptoast from 'mptoast'

  export default {
    data() {
      return {
        sourseList: [],
        dataList: [],
        showCommodityAlert: false,
        isShowBtn: true
      }
    },
    components: {
      mptoast
    },
    methods: {
      goGiftPage() {
        const url = '../prizeIndex/main'
        wx.navigateTo({
          url
        })
      },
      bindCommodityBtnTap() {
        this.showCommodityAlert = !this.showCommodityAlert
        const url = '../prizeIndex/main'
        wx.navigateTo({
          url
        })
      },
      showAlert(index) {
        this.dataList = this.sourseList[index].detailList
        this.isShowBtn = this.sourseList[index].isAward == 1 ? true : false
        this.showCommodityAlert = !this.showCommodityAlert
      },
      closeAlert() {
        this.showCommodityAlert = !this.showCommodityAlert
      }
    },
    onShow() {
      var _this = this;
      this.$fly.request({
        method: 'post',
        url: '/lucky/list',
        body: {}
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          _this.sourseList = res.data
          _this.invite_info = res.data.imgShare
          for (const key in _this.sourseList) {
            _this.sourseList[key].teamStatus = _this.sourseList[key].status == 0 ? "未中奖" : "已中奖"
          }
        } else {
          this.$mptoast(res.msg)
        }
      })
    },
    onShareAppMessage(options) {
      return {
        title: this.invite_info.title,
        path: this.invite_info.path,
        imageUrl: this.invite_info.url
      }
    }
  }

</script>

<style scoped>
  .shape-img {
    width: 28rpx;
    height: 52rpx;
  }

  .shape-yellow-img {
    width: 10rpx;
    height: 18rpx;
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

  .center-box {
    text-align: center;
  }

  .alert-body-box {
    width: 502rpx;
    background: white;
    padding-top: 32rpx;
    margin-top: 200rpx;
    margin-left: 124rpx;
    border-radius: 20rpx;
    padding-bottom: 32rpx;
  }

  .commodity-alert-text-box {
    width: 100%;
    height: 78rpx;
  }

  .commodity-user-img {
    padding-top: 10rpx;
    padding-left: 46rpx;
    float: left;
    width: 58rpx;
    height: 58rpx;
  }

  .commodity-desc {
    float: left;
    font-size: 12px;
    color: #675235;
    padding-top: 24rpx;
    text-align: center;
    padding-left: 240rpx;
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

  .lucky-list {
    background: white;
    margin: 16rpx;
    border-radius: 20rpx;
  }

  .lucky-list-header-box {
    height: 74rpx;
    background: #FAEDDE;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    padding-top: 32rpx;
    padding-left: 40rpx;
  }

  .header-box-number {
    font-size: 14px;
    color: #A29078;
    float: left;
    width: 45%;
    height: 106rpx;
    text-align: left;
  }

  .header-box-desc {
    font-size: 14px;
    color: #675235;
    float: left;
    width: 45%;
    height: 106rpx;
    text-align: right;
  }

  .team-img {
    width: 96rpx;
    height: 96rpx;
    float: left;
    margin-left: 40rpx;
    margin-bottom: 40rpx;
    border-radius: 50%;
  }

  .lucky-list-line {
    background: #F4E8D3;
    width: 100%;
    height: 2rpx;
  }

  .lucky-item-desc {
    height: 70rpx;
    font-size: 14px;
    color: #A29078;
    padding-top: 28rpx;
    padding-left: 40rpx;
    text-align: left;
  }

  .lucky-item-none-desc {
    height: 70rpx;
    font-size: 14px;
    color: #999999;
    padding-top: 28rpx;
    padding-left: 40rpx;
    text-align: left;
  }

  /* 新增 */
  .lucky-top-box {
    background: white;
    margin: 16rpx;
    width: 720rpx;
    height: 100rpx;
  }

  .lucky-top-img {
    float: left;
    width: 46rpx;
    height: 46rpx;
    margin-left: 40rpx;
    margin-top: 26rpx;
  }

  .lucky-top-desc {
    float: left;
    font-size: 16px;
    color: #333333;
    margin-left: 34rpx;
    margin-top: 26rpx;
  }

  .lucky-top-push {
    float: left;
    font-size: 16px;
    color: #333333;
    margin-left: 420rpx;
    margin-top: 30rpx;
  }

</style>
