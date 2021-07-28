import {get, post} from '../utils/request'


/// 商品详情
export function productDetail(productId) {
  return get('/mall/detail', {
    productId
  })
}

// 瓜分首页
export function rewardMain() {
  return get("/money/index", {});
}

// 参与瓜分
export function joinReward(invite_code, isSubscribe, formId) {
  return get("/money/join", {
    invite_code,
    isSubscribe,
    formId
  })
}

// 瓜分排行榜
export function rewardRankList() {
  return get("/money/rank-list", {})
}

// 瓜分排行榜
export function rewardResult(awardDate) {
  return get("/money/award-page", {awardDate})
}

// 获取奖励
export function getReward(type) {
  return get("/money/award", {type})
}


// 好物首页
export function mallIndex() {
  return get("/mall/index", {})
}
