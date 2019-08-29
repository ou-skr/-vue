//这个文件用于封装axios请求，封装登陆的请求，还有其他另外的请求
import axios from 'axios'//引入axios
// 设置基准路径
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"

// 添加请求拦截器   每一次请求会进过拦截器 axios拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //获取可能有的token数据，进行请球头的设置 
    //格式Authorization:token
    // eslint-disable-next-line no-console
    // console.log(config)//看到里面有个token
    var token =localStorage.getItem('itcast_pro_token')
    if(token){//后台要用的token 就传，如果没，就不传
     config.headers['Authorization']=token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);//如果请求错误，最终axios.catch来响应

    // 或者
    // return new Promise({})表示终止当前请求
  });


//在封装的时候强烈不建议使用其他方式，一律使用通用方式
//必须往外导出这个login 这个函数 通过传递data(表单数据)来给data值
export const login =(data)=>{
    return axios({
        url:'login',
        method:'POST',
        data:data
    })
}

//封装获取用户请求的数据
export const getAllList=(data)=>{
    return axios({
        url:'users',
        method:'GET',
        params:data
    })
}
// 封装添加用户的请求
export const addUserList=(data)=>{
    return axios({
        method:'POST',
        url:'users',
        data:data
    })
}