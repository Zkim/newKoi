<template>
  <!-- 焦点图 -->
  <div class="swiper-wrap">
    <swiper class="swiper-inner" @change="swiperChange" :indicator-dots="indicator" :current="cur" :circular="circular" :autoplay="autoplay" :interval= "interval" :duration=
      "duration" >
      <block v-for="(item,index) in imgUrls" :index="index" :key="key">
        <swiper-item>
          <img class="banner-img" :src="item" @click="swipclick(index)">
        </swiper-item>
      </block>
    </swiper>
    <view class="dots">
      <block>
        <span class="tips">{{cur + 1 +'/'+imgUrls.length}}</span>
      </block>
    </view>
  </div>
</template>

<script>
    export default {
      name: "MySwiper",
      props: {
        imgUrls: {
          type: Array,
          default: []
        }
      },
      data () {
        return {
          indicator: false, //是否显示指示点
          interval: 5000,  //自动切换时间间隔
          duration: 400,  //滑动动画时长
          autoplay: true, //是否自动切换
          circular: true, //是否采用衔接滑动
          cur: 0         //当前所在滑块的index
        }
      },
      methods: {
        //轮播图的切换事件
        swiperChange (e) {
          this.cur = e.target.current  //获取当前轮播图片的下标, 可以给当前指示点加样式
        },
        swipclick (index) {
          this.$emit('onBannerItemClick', index)
        }
      }
    }
</script>


<style lang="scss">
  .swiper-wrap{
    width: 100%;
    height: 375px;
    background: #fff;
    position: relative;
  }
  .swiper-inner{
    width: 100%;
    height: 375px;
  }
  .swiper-wrap image {
    width: 100%;
    height: 375px;
  }
  .dots{
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 12px;
    right: 10px;
    width: 40px;
    height: 22px;
    background-color: #979797;
    border-radius: 11px;
    align-items: center;
    .tips{
      position: absolute;
      text-align: center;
      line-height: 22px;
      height: 22px;
      color: #ffffff;
      font-size: 12px;
    }
  }
</style>
