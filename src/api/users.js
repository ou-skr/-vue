//这个文件用于封装axios请求，封装登陆的请求，还有其他另外的请求
import axios from 'axios'//引入axios
// 设置基准路径
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
//在封装的时候强烈不建议使用其他方式，一律使用通用方式
//必须往外导出这个login 这个函数 通过传递data(表单数据)来给data值
export const login =(data)=>{
    return axios({
        url:'login',
        method:'POST',
        data:data
    })
}