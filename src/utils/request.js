import Fly from 'flyio/dist/npm/wx'
const fly = new Fly();
const host = "https://api.youliaostore.com";
// const host = "https://t.entery.top";

// 添加请求拦截器
fly.interceptors.request.use(request => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  console.log(request);

  const accessToken = wx.getStorageSync('token') ? wx.getStorageSync('token') : '';

  request.headers = {
    "X-Tag": "flyio",
    "content-type": "application/json",
    "X-USER-TOKEN": accessToken
  };

  let authParams = {
    // 公共参数
    categoryType: "SaleGoodsType@sim",
    streamNo: "wxapp153570682909641893",
    reqSource: "MALL_H5",
    appid: "string",
    timestamp: new Date().getTime(),
    sign: "string"
  };

  request.body &&
    Object.keys(request.body).forEach(val => {
      if (request.body[val] === "") {
        delete request.body[val];
      }
    });
  request.body = {
    ...request.body,
    ...authParams
  };
  return request;
});

// 添加响应拦截器
fly.interceptors.response.use(
  response => {
    wx.hideLoading();
    return response.data; // 请求成功之后将返回值返回
  },
  err => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err);
    wx.hideLoading();
    if (err) {
      return "请求失败";
    }
  }
);

function handleError(err) {
  console.log(err)
}

export function get(url, params = {}, showError = false) {
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response => {
        console.log(response)
        if (response && response.data && response.code === 200) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post(url, params = {}, showError = false) {
  // const fly = this.fly
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        console.log(response)
        if (response && response.data && response.code === 200) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

fly.config.baseURL = host;

export default fly;
