import axios from 'axios';

// 创建axios实例
const httpService = axios.create({
  // url前缀-'https://some-domain.com/api/'
  baseURL: process.env.BASE_API, // 需自定义
  // 请求超时时间
  timeout: 3000 // 需自定义
});

// 设置 post、put 默认 Content-Type
// httpService.defaults.headers.post['Content-Type'] = 'application/json';
// httpService.defaults.headers.put['Content-Type'] = 'application/json';

/** 简单文本*/
// var contentTypeText = 'application/x-www-form-urlencoded';
/** 文件传输*/
// var contentTypeFile = 'multipart/form-data';
/** 文件下载*/
// var contentTypeFileDownload = 'application/octet-stream';
/** JSON传输*/
// var contentTypeJson = 'application/json';

// request拦截器
httpService.interceptors.request.use(
  config => {
    // 根据条件加入token-安全携带
    if (config.user) { // 需自定义
        // 让每个请求携带token
        config.headers['User-Token'] = '';
    }
        
    // config.responseType = contentTypeJson;
    config.withCredentials = true;
    
    if (config.method == 'post') {
        if (config.type == "file") {
            console.log(config.data.get("file"));
            // config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.data = config.data instanceof FormData ? config.data : JSON.stringify(config.data);
            config.headers['Content-Type'] = 'application/json';
        }      
    } else {
        config.url = encodeURI(config.url);
    }
    return config;
  }, 
  error => {
      // 请求错误处理
      Promise.reject(error);
  }
)

// response 拦截器
httpService.interceptors.response.use(
    
  response => {
      // 统一处理状态
      const res = response.data;

      if (response.status != 200) {
          // 返回异常
          return Promise.reject({
              status: res.status,
              message: res.message
          });
          // 错误集合处理 
      } else if(res.code != 200){  // 需自定义
           // 返回异常
           return Promise.reject({
            status: res.status,
            message: res.message
        });
      } else {
          return res;
      }
  },
  // 处理处理
  error => {
       if (error && error.response) {
          switch (error.response.status) {
              case 400:
                  error.message = '错误请求';
                  break;
              case 401:
                  error.message = '未授权，请重新登录';
                  break;
              case 403:
                  error.message = '拒绝访问';
                  break;
              case 404:
                  error.message = '请求错误,未找到该资源';
                  break;
              case 405:
                  error.message = '请求方法未允许';
                  break;
              case 408:
                  error.message = '请求超时';
                  break;
              case 500:
                  error.message = '服务器端出错';
                  break;
              case 501:
                  error.message = '网络未实现';
                  break;
              case 502:
                  error.message = '网络错误';
                  break;
              case 503:
                  error.message = '服务不可用';
                  break;
              case 504:
                  error.message = '网络超时';
                  break;
              case 505:
                  error.message = 'http版本不支持该请求';
                  break;
              default:
                  error.message = `未知错误${error.response.status}`;
          }
      } else {
          error.message = "连接到服务器失败";
      }
      return Promise.reject(error);
  }
)

/*网络请求部分*/

const  http = {
  /**
   *  get请求
   * @param url 请求地址
   * @param data 参数
   **/
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            httpService.get(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    /**
     *  post请求
     * @param url 请求地址
     * @param data 参数
     **/
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            httpService.post(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    /**
     * 封装patch请求
     * @param url 请求地址
     * @param data 参数
     * @returns {Promise}
     */
    patch(url,data = {}){
        return new Promise((resolve,reject) => {
            httpService.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
        })
    },
   /**
   * 封装put请求
   * @param url 请求地址
   * @param data 参数
   * @returns {Promise}
   */
    put(url,data = {}){
        return new Promise((resolve,reject) => {
            httpService.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
        })
    },
   /**
   * 封装delete请求
   * @param url 请求地址
   * @param data 参数
   * @returns {Promise}
   */
    del(url,data = {}){
      return new Promise((resolve,reject) => {
        httpService.delete(url,data)
             .then(response => {
               resolve(response.data);
             },err => {
               reject(err)
             })
      })
    },
    /** 
    *  文件上传
    *  @param url: 请求地址
    *  @param params:参数
    * */
    fileUpload(url,data) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                // headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data,
                url,
              };
              httpService(options)// 不设置内容类型, 没有该项后台会抛出异常RequestFacade cannot be cast to MultipartHttpServletRequest，该项表明ContentType:multipart/form-data
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }
  
}

export default http;