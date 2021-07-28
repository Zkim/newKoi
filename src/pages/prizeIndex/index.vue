<template>
  <div style="width:100%; background: #f7f7f7; padding-bottom: 20rpx;">
    <!-- 物流弹框 -->
    <div class="alert-box" v-if="showLogisticsAlert" catchtouchmove="ture">
      <div class="center-box alert-body-box">
        <p class="logistics-title">{{sendTitle}}</p>
        <p class="logistics-desc">{{sendInfo}}</p>
        <div class="alert-btn" v-if="isShow" @click="clickRemind">发货时提醒我</div>
        <div class="alert-btn" v-if="!isShow" @click="clickCopy">复制快递单号</div>
      </div>
      <div class="center-box">
        <img class="close-img" src="/static/images/close-alert.png" @click="showLogistics">
      </div>
    </div>
    <mptoast />
    <!-- 列表 -->
    <ul style="background: #f7f7f7;">
      <li class="prize-list" v-for="(item, index) in sourseList" :key="index">
        <div style="padding: 20rpx;">
          <div class="left-img-box">
            <img class="prize-img" :src="item.url" @click="showExchange">
            <div class="prize-img-btn" @click="clickImgBtn(index)">{{btnText}}</div>
          </div>
          <div class="right-desc-box">
            <p class="right-desc-title">{{item.name}}</p>
            <p class="right-desc-desc">订单编号：{{item.orderNum}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'

  export default {
    data() {
      return {
        sourseList: [],
        showLogisticsAlert: false,
        isReceive: true,
        sendInfo: "",
        sendTitle: "您的物流信息为",
        btnText: "查看物流",
        isShow: false
      }
    },

    components: {
      mptoast
    },

    methods: {
      clickRemind () {
        var _this = this
        wx.requestSubscribeMessage({
          tmplIds: ['-GdOlnRySSoulbdVGzsO7a765AvW2TrnC7oSPdtT8GM'],
          success(res) {
            _this.showLogistics()
          },
          fail(res) {
            _this.showLogistics()
          }
        })
      },
      clickCopy() {
        var _this = this
        wx.setClipboardData({
          data: _this.copyString,
          success: function (res) {}
        });
        this.showLogisticsAlert = !this.showLogisticsAlert
      },
      clickImgBtn(index) {
        if (this.isReceive) {
          this.sendInfo = this.sourseList[index].sendInfo ? this.sourseList[index].sendInfo : "兑换成功后48小时内发货"
          this.sendTitle = this.sourseList[index].sendInfo ? "您的物流信息为" : "抱歉，暂无物流信息"
          this.isShow = this.sourseList[index].sendInfo ? false : true
          this.copyString = this.sourseList[index].sendInfo
          this.showLogistics()
        } else {
          const url = '../receivePrizes/main?teamCode=' + this.sourseList[index].teamCode
          wx.navigateTo({
            url
          })
        }
      },
      showLogistics() {
        this.showLogisticsAlert = !this.showLogisticsAlert
      }
    },
    mounted() {
      this.isReceive = true
      var _this = this;
      this.$fly.request({
        method: 'post',
        url: '/mall/mall-list',
        body: {}
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          _this.sourseList = res.data.list
          _this.invite_info = res.data.imgShare
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
    margin-top: 250rpx;
    margin-left: 124rpx;
    border-radius: 20rpx;
    padding-bottom: 32rpx;
  }

  .alert-btn {
    width: 336rpx;
    height: 64rpx;
    font-size: 17px;
    color: #FFFFFD;
    background: #BC4631;
    border-radius: 40rpx;
    padding-top: 16rpx;
    margin-left: 80rpx;
    margin-bottom: 20rpx;
  }

  .logistics-title {
    font-size: 14px;
    color: #999999;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }

  .logistics-desc {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    padding-bottom: 40rpx;
  }

  .close-img {
    width: 50rpx;
    height: 50rpx;
    padding-top: 20rpx;
  }

  .prize-list {
    background: white;
    padding: 16rpx;
    height: 260rpx;
    margin-bottom: 20rpx;
  }

  .left-img-box {
    float: left;
    width: 220rpx;
    height: 220rpx;
    position: relative;
  }

  .prize-img {
    width: 220rpx;
    height: 220rpx;
    position: relative;
  }

  .prize-img-btn {
    position: absolute;
    width: 220rpx;
    height: 50rpx;
    bottom: 0;
    text-align: center;
    color: white;
    background: #C65745;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right-desc-box {
    background: white;
    float: left;
    width: 400rpx;
    height: 220rpx;
    margin-left: 30rpx;
    position: relative;
    margin-bottom: 22rpx;
  }

  .right-desc-title {
    font-size: 16px;
    color: #333333;
  }

  .right-desc-people {
    font-size: 12px;
    color: #999999;
    padding-top: 16rpx;
  }

  .right-desc-desc {
    position: absolute;
    font-size: 13px;
    color: #999999;
    bottom: 0;
  }

  .prize-line {
    width: 684rpx;
    height: 2rpx;
    background: #F2F2F2;
    clear: both;
    padding-left: 19rpx;
  }

  .prize-number {
    font-size: 13px;
    color: #999999;
    padding-top: 13rpx;
    padding-left: 18rpx;
  }

</style>
