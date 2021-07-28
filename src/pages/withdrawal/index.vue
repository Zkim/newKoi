<template>
  <div class="bg-box">
    <mptoast />
    <!-- top -->
    <div class="top-box">
      <div class="top-text-box">
        <span class="top-title-text">{{dataSource.amount}}</span>
        <br>
        <span class="top-desc-text">可提现（元）</span>
      </div>
      <button class="withdrawal-box" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="dataSource.isPhoneAuth == false">提现</button>
      <div class="withdrawal-box" v-if="dataSource.isPhoneAuth == true" @click="withdrawal">提现</div>
    </div>
    <!-- center  -->
    <div class="center-box">
      <div class="title-box">
        <p class="title-box-text">提现金额</p>
      </div>
      <div v-bind:class="{ heightDoubleBox: arrLenght > 3, heightBox:arrLenght <= 3}">
        <div v-for="(item, index) in dataSource.withdrawInfo" :key="index" style="float:left; position: relative;">
          <img v-if="typeString == item.type" class="choose-img" src="/static/images/left-icon.png">

          <div v-bind:class="{ select: typeString == item.type, nomal:typeString != item.type}" @click="withdrawTap(index)">{{item.value}}元</div>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
    <ad unit-id="adunit-e6fde9573cf1c585"></ad>
    <!-- bottom -->
    <div class="bottom-box">
      <div class="title-box">
        <p class="title-box-text">提现说明</p>
      </div>
      <text class="desc-text">{{dataSource.withdrawRules.desc}}</text>
    </div>
    <ul style="border-radius: 40rpx;background: white; margin-top:20rpx">
      <li class="body-list-box" v-for="(item, index) in dataSource.amountList" :key="index">
        <div class="body-item-box">
          <p class="list-item-title">{{item.title}}</p>
          <p class="list-item-time">{{item.time}}</p>
        </div>
        <div class="body-item-box body-item-right-box">
          <p class="list-item-desc" :style="{color:item.type == '0' ?'#C55745':'#3FCF57'}">{{item.content}}</p>
        </div>
      </li>
      <div style="text-align: center; height: 76rpx; width: 100%;">
        <p class="body-bottom-desc">仅展示最近30天明细</p>
      </div>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        isSelect: false,
        dataSource: {},
        typeString: null,
        arrLenght: 0
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
          url: '/my/amount-index',
          body: {
            isNew: 1
          }
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            this.dataSource = res.data
            this.typeString = this.dataSource.withdrawInfo[0].type
            this.arrLenght = this.dataSource.withdrawInfo.length
          } else {
            this.$mptoast(res.msg)
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

  .center-red-title {
    color: #C6523C;
    font-size: 14px;
  }

  .time-title {
    color: #666666;
    font-size: 14px;
  }

  .first-title {
    padding-left: 300rpx;
  }

  .heightDoubleBox {
    height: 140px;
  }

  .heightBox {
    height: 70px;
  }

  .top-box {
    height: 72px;
    background: white;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .choose-img {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 0rpx;
  }

  .top-text-box {
    float: left;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .top-title-text {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 30px;
    color: #333333;
  }

  .top-desc-text {
    padding-left: 10px;
    font-size: 12px;
    color: #999999;
  }

  .top-withdrawal-box {
    /* float: left; */
    width: 70px;
    height: 36px;
    color: white;
    font-size: 16px;
    background: #C65745;
    text-align: center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 388rpx;
    margin-top: 36rpx;
  }

  .withdrawal-box {
    width: 70px;
    height: 36px;
    color: white;
    font-size: 16px;
    background: #C65745;
    text-align: center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50rpx;
    position: absolute;
    top: 46rpx;
  }

  .center-box {
    height: auto;
    background: white;
    border-radius: 10px;
    padding-top: 4px;
    padding-bottom: 6px;
    padding-left: 10px;
    margin-bottom: 8px;
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
