<template>
  <div class="bg-box">
    <mptoast />
    <div style="width:100%; text-align:center; height: 472rpx;">
      <img class="live-empty-img" src="../../../static/images/live-empty.png">
    </div>
    <div :style="'height:' + listHeight + 'rpx;'">
      <div class="item-box" v-for="(item, index) in liveSource" @click="openLiveRoom(index)" :key="index">
        <img class="item-img" :src="item.coverImg">
        <img class="item-play-img" src="../../../static/images/play.png">
        <div>
          <img class="item-status-img" src="../../../static/images/live-status-icon.png">
          <p class="item-status-desc">直播中</p>
        </div>
        <p class="item-desc">{{item.name}}</p>
      </div>
    </div>
    <button class="login-btn" :style="'height:' + listHeight + 'rpx;'" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
    </button>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        dataSource: [],
        liveSource: [],
        listHeight: 0,
        roomId: 0,
        isLogin: false
      }
    },
    components: {
      mptoast,
    },
    async onPullDownRefresh() {
      this.loadData()
      wx.stopPullDownRefresh();
    },
    methods: {
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
      loadData() {
        var _this = this;
        this.$fly.request({
          method: 'post',
          url: '/live/live-info',
          body: {}
        }).then(res => {
          console.log(res.data)
          if (res.code == 200) {
            _this.isLogin = res.data.isLogin
            _this.dataSource = res.data.roomList
            _this.getRoomStatus()
          } else {
            _this.$mptoast(res.msg)
          }
        })
      },
      getRoomStatus() {
        var _this = this;
        let livePlayer = requirePlugin('live-player-plugin')
        _this.dataSource.forEach(function (value, index, array) {
          const roomId = _this.dataSource[index].roomId
          livePlayer.getLiveStatus({
              room_id: _this.dataSource[index].roomId
            })
            .then(res => {
              console.log(res.liveStatus)
              // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
              if (res.liveStatus == 101) {
                _this.liveSource.push(_this.dataSource[index])
                var lenght = _this.dataSource.length / 2
                if (_this.dataSource.length % 2 != 0) {
                  lenght = _this.dataSource.length / 2 + 0.5
                }
                _this.listHeight = (lenght * 612) + 30 * lenght
              }
              console.log(_this.liveSource)
              console.log('get live status', res.liveStatus)
            })
            .catch(err => {
              console.log('get live status', err)
            })

        });
      },
      openLiveRoom(index) {
        if (this.isLogin == false) {
          return
        }
        let roomId = this.dataSource[index].roomId
        let customParams = {
          path: 'pages/live/index',
          pid: 1
        }
        wx.navigateTo({
          url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
        })
      }
    },
    onShow() {
      this.loadData()
    }
  }

</script>

<style>
  page{
    background: #f7f7f7;
  }

  .bg-box {
    height: 100%;
    background: #f7f7f7;
    padding: 4rpx;
  }

  .live-empty-img {
    width: 322rpx;
    height: 164rpx;
    margin-top: 154rpx;
  }

  .login-btn {
    position: absolute;
    width: 100%;
    top: 10rpx;
    left: 0;
    background-color: transparent;
    border: none;
  }

  .login-btn ::after {
    border: none;
  }

  .item-box {
    float: left;
    width: 344rpx;
    height: 612rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
    margin-top: 10rpx;
    margin-bottom: 20rpx;
    background: white;
    position: relative;
  }

  .item-play-img {
    width: 34rpx;
    height: 48rpx;
    position: absolute;
    top: 282rpx;
    left: 155rpx;
  }

  .item-img {
    width: 344rpx;
    height: 612rpx;
    background: rgba(0, 0, 0, 0.2);
  }

  .item-status-img {
    width: 114rpx;
    height: 46rpx;
    position: absolute;
    top: 28rpx;
    left: 20rpx;
  }

  .item-status-desc {
    position: absolute;
    top: 28rpx;
    left: 48rpx;
    font-size: 12px;
    color: #FFFFFD;
    padding-top: 6rpx;
  }

  .item-watch-desc {
    font-size: 12px;
    color: #FFFFFD;
    padding-top: 6rpx;
    position: absolute;
    top: 28rpx;
    left: 134rpx;
    background: rgba(0, 0, 0, 0.4);
    height: 40rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
  }

  .item-desc {
    font-size: 16px;
    color: #FFFFFD;
    position: absolute;
    bottom: 20rpx;
    left: 20rpx;
  }

</style>
