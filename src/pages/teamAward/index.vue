<template>
  <div class="bg-box">
    <div class="alert-box" v-if="showNoGoldAlert" catchtouchmove="ture">
      <div class="center-box show-alert-box" @click="tapCarve">
        <p class="alert-desc-text alert-title-box aler-header-box">只差</p>
        <p class="alert-center-text alert-title-box">{{diffContent}}</p>
        <p class="alert-desc-text alert-title-box">即可提取</p>
        <button class="alert-btn">再去赚点</button>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="showEnvelopes">
      </div>
    </div>
    <div class="alert-box" v-if="showGoldAlert" catchtouchmove="ture">
      <div class="center-box show-alert-box" @click="switchCarve">
        <p class="alert-desc-text">已存入余额，快去兑换商品~</p>
        <button class="alert-btn">去兑换</button>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="showEnvelopes">
      </div>
    </div>
    <div class="alert-box" v-if="showNoMoneyAlert" catchtouchmove="ture">
      <div class="center-box show-alert-box" @click="tapCarve">
        <p class="alert-desc-text alert-title-box aler-header-box">只差</p>
        <p class="alert-center-text alert-title-box">{{diffContent}}</p>
        <p class="alert-desc-text alert-title-box">即可提现</p>
        <button class="alert-btn">再去赚点</button>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="showEnvelopes">
      </div>
    </div>
    <div class="alert-box" v-if="showMoneyAlert" catchtouchmove="ture">
      <div class="center-box show-alert-box" @click="tapCarveMoney">
        <p class="alert-desc-text">已存入余额，快去提现吧</p>
        <button class="alert-btn">立即提现</button>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="showEnvelopes">
      </div>
    </div>
    <mptoast />
    <!-- top -->
    <div class="top-box">
      <div class="top-text-box">
        <p class="top-title-text">{{dataSource.cash}}</p>
        <p class="top-desc-text">现金奖励（元）</p>
      </div>
      <div style="clear:both"></div>
      <div class="top-text-box">
        <p class="top-title-text">{{dataSource.coin}}</p>
        <p class="top-desc-text">金币奖励（个）</p>
      </div>
      <div class="withdrawal-box" @click="withdrawal('cash')">提取</div>
      <div class="withdrawal-box-money" @click="withdrawal('coin')">提取</div>
    </div>
    <ad unit-id="adunit-e6fde9573cf1c585"></ad>
    <!-- bottom -->
    <div class="bottom-box">
      <div class="title-box">
        <p class="title-box-text">{{dataSource.rules.title}}</p>
      </div>
      <text class="desc-text">{{dataSource.rules.desc}}</text>
    </div>
    <ul style="border-radius: 40rpx;background: white; margin-top:20rpx">
      <li class="body-list-box" v-for="(item, index) in dataSource.list" :key="index">
        <div class="body-item-box">
          <p class="list-item-title">{{item.title}}</p>
          <p class="list-item-time">{{item.time}}</p>
        </div>
        <div class="body-item-box body-item-right-box">
          <p class="list-item-desc" :style="{color:item.type == '0' ?'#C55745':'#3FCF57'}">{{item.content}}</p>
        </div>
      </li>
      <div style="text-align: center; height: 76rpx; width: 100%;">
        <p class="body-bottom-desc">仅展示当天奖励明细</p>
      </div>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        showNoGoldAlert: false,
        showGoldAlert: false,
        showNoMoneyAlert: false,
        showMoneyAlert: false,
        isSelect: false,
        dataSource: {},
        typeString: null,
        diffContent: 0
      }
    },
    components: {
      mptoast,
    },
    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    methods: {
      loadData() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/money/award-index',
          body: { }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            this.dataSource = res.data
          } else {
            this.$mptoast(res.msg)
          }
        })
      },
      switchCarve() {
        this.showEnvelopes()
        wx.switchTab({
           url:'../goodThing/main'
        })
      },
      tapCarve() {
        this.showEnvelopes()
        wx.navigateBack({
          delta: 2
        })
      },
      tapCarveMoney() {
        this.showEnvelopes()
        const url = '../withdrawal/main'
        wx.navigateTo({
          url
        })
      },
      showEnvelopes() {
        this.showNoGoldAlert = false
        this.showGoldAlert = false
        this.showNoMoneyAlert = false
        this.showMoneyAlert = false
      },
      withdrawal(typeStr) {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/money/take-award',
          body: {
            type : typeStr
           }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            if (typeStr == "cash") {
              if (res.data.status == 0) {
                _this.showMoneyAlert = !_this.showMoneyAlert
              } else {
                _this.showNoMoneyAlert = !_this.showNoMoneyAlert
                _this.diffContent = res.data.diffContent
              }
            } else {
              if (res.data.status == 0) {
                _this.showGoldAlert = !_this.showGoldAlert
              } else {
                _this.showNoGoldAlert = !_this.showNoGoldAlert
                _this.diffContent = res.data.diffContent
              }
            }
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      payWithdraw() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/pay/withdraw-share',
          body: {
            type: this.typeString
          }
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$mptoast('提现成功')
          } else {
            this.$mptoast(res.msg)
          }
        })
      }
    },
    mounted() {
      this.loadData()
    },
  }

</script>

<style>
  .bg-box {
    background: #f7f7f7;
    padding: 20rpx;
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

  .close-img {
    width: 50rpx;
    height: 50rpx;
    padding-top: 20rpx;
  }

  .center-box {
    height: 400rpx;
    margin: 16rpx;
    text-align: center;
    border-radius: 20rpx;
    position: relative;
  }

  .show-alert-box {
    width: 500rpx;
    height: 320rpx;
    background: white;
    position: relative;
    margin-top: 200rpx;
    margin-left: 130rpx;
    text-align: center;
  }

  .alert-desc-text {
    color: #333333;
    font-size: 16px;
    padding-top: 80rpx;
    margin-bottom: 56rpx;
  }


  .alert-title-box {
    float: left;
  }

  .aler-header-box {
    margin-left: 110rpx;
  }

  .alert-center-text{
    color: #BB422E;
    font-size: 16px;
    padding-top: 80rpx;
    margin-bottom: 56rpx;
  }

  .alert-btn {
    width: 364rpx;
    height: 92rpx;
    line-height: 92rpx;
    font-size: 16px;
    color: #FEE1B6;
    background: #BB422E;
    border-radius: 60rpx;
  }

  .body-list-box {
    height: 116rpx;
    padding: 20rpx 24rpx 20rpx 32rpx;
  }

  .body-item-box {
    width: 48%;
    float: left;
    height: 96rpx;
    padding-top: 20rpx;
  }

  .body-item-right-box {
    text-align: right;
  }

  .list-item-title {
    color: #333333;
    font-size: 13px;
  }

  .list-item-time {
    color: #999999;
    font-size: 13px;
    padding-top: 4rpx;
  }

  .list-item-desc {
    padding-top: 24rpx;
    font-size: 15px;
    color: #C55745;
  }

  .top-box {
    height: 272rpx;
    background: white;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .top-text-box {
    float: left;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .top-title-text {
    padding-left: 20rpx;
    padding-top: 10rpx;
    font-size: 30px;
    color: #333333;
  }

  .top-desc-text {
    padding-left: 10px;
    font-size: 12px;
    color: #999999;
  }

  .withdrawal-box {
    width: 70px;
    height: 36px;
    color: white;
    font-size: 16px;
    background: #BB422E;
    text-align: center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50rpx;
    position: absolute;
    top: 50rpx;
  }

  .withdrawal-box-money {
    width: 70px;
    height: 36px;
    background: white;
    font-size: 16px;
    color: #BB422E;
    text-align: center;
    border-radius: 20px;
    border-width: 1rpx;
    border-color: #BB422E;
    border-style: solid;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50rpx;
    position: absolute;
    top: 180rpx;
  }


  .title-box {
    background: white;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .title-box-line {
    width: 3px;
    height: 14px;
    background: #C65745;
    float: left;
    margin-right: 6px;
    margin-top: 3px;
  }

  .title-box-text {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }

  .bottom-box {
    height: auto;
    background: white;
    border-radius: 10px;
    padding-top: 4px;
    margin-top: 20rpx;
    padding-bottom: 6px;
    padding-left: 10px;
  }

  .desc-text {
    font-size: 14px;
    color: #333333;
  }

  .select {
    width: 200rpx;
    height: 86rpx;
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    padding-top: 20rpx;
    border-radius: 8px;
    font-size: 21px;
    color: #C55745;
    border: 1px solid #C65745;
  }

  .nomal {
    width: 200rpx;
    height: 86rpx;
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    padding-top: 20rpx;
    border-radius: 8px;
    font-size: 21px;
    color: #333333;
    border: 1px solid #F2F2F2;
  }

  .body-bottom-desc {
    height: 76rpx;
    color: #999999;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
