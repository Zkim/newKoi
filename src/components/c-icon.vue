<template>
  <div class="c-icon">
    <img class="c-icon-img" src="/static/images/icon-link.png" v-if="type === 'link'" />
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style>
.c-icon-img {
  height: 28rpx;
  width: 28rpx;
}
</style>
