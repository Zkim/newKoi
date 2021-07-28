<template>
  <div class="container flex-y bg-box">
    <mptoast />
    <ad unit-id="adunit-cb5283e1285b02fe" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
    <ul style="border-radius: 40rpx;background: white; margin-top:20rpx">
      <li class="body-list-box" v-for="(item, index) in dataSource" :key="index">
        <div class="body-item-box">
          <p class="list-item-title">{{item.title}}</p>
          <p class="list-item-time">{{item.time}}</p>
        </div>
        <div class="body-item-box body-item-right-box">
          <p class="list-item-desc" :style="{color:item.type == '0' ?'#C55745':'#3FCF57'}">{{item.content}}</p>
        </div>
      </li>
      <div style="text-align: center; height: 76rpx; width: 100%;">
        <p class="body-bottom-desc">仅展示最近一天明细</p>
      </div>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        dataSource: [],
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
          url: '/my/diamond-list',
          body: {}
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            _this.dataSource = res.data
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      getPhoneNumber(e) {
        if (this.dataSource.isPhoneAuth == true) {
          return
        }
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/user/bind-user-phone',
          body: {
            iv: e.mp.detail.iv,
            encryptData: e.mp.detail.encryptedData
          }
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            _this.payWithdraw()
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      withdrawTap(index) {
        this.typeString = this.dataSource.withdrawInfo[index].type
      },
      withdrawal() {
        if (this.dataSource.isPhoneAuth == false) {
          return
        }
        this.payWithdraw()
      },
      payWithdraw() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/pay/withdraw',
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

  .body-list-box {
    height: 116rpx;
    padding: 20rpx 24rpx 20rpx 32rpx;
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

  .body-item-box {
    width: 48%;
    float: left;
    height: 96rpx;
    padding-top: 20rpx;
  }

  .body-item-right-box {
    text-align: right;
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
