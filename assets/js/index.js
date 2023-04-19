// const { default: axios } = require("axios")

// import { service } from './baseAPI1'
// window.addEventListener('load', function() {


service.interceptors.request.use(function(config) {
    // console.log(config);
    if (config) {
        const token = localStorage.getItem('token')
        token && (config.headers['Authorization'] = token)
    }
    return config;
}, function(error) {
    //请求失败的
    return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
    //响应成功的
    // console.log(response);
    if (response.data.status !== 0) {
        localStorage.removeItem('token')
        location.href = '/login.html'
    }
    return response;
}, function(error) {
    //响应失败的
    return Promise.reject(error)
})


//调用 getUserInfo 获取用户的基本信息
getUserInfo()

var layer = layui.layer

// 退出
let btnLogout = this.document.querySelector('#btnLogout');
btnLogout.addEventListener('click', function() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
        function(index) {
            //do something

            // 1.清除token
            localStorage.removeItem('token')

            // 2.跳转到login
            location.href = '/login.html'

            layer.close(index);
        });
})


// 获取用户的基本信息
function getUserInfo() {
    service({
        url: '/my/userinfo',
        method: 'get',
        // token 验证，没有token就不能获取资料
        headers: {
            Authorization: this.localStorage.getItem('token') || ''
        }
    }).then(response => {
        // console.log(res.data);
        if (response.data.status != 0) {
            // location.href = '/login.html'
            // location.href = '/login.html'
            return layui.layer.msg('获取信息失败！')
        }

        // 调用renderAvatar() 渲染用户头像
        renderAvatar(response.data)
    }).catch(error => {
        // location.href = '/login.html'
        console.log(error);
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // console.log(user);

    // 1.获取用户名称
    var name = user.data.nickname || user.data.username;
    // 2.设置用户名称
    let welcome = document.querySelector('#welcome');
    welcome.innerText = name;

    // 3.按需渲染用户的头像
    var layuiImg = document.querySelectorAll('.layui-nav-img');
    var textavatar = document.querySelectorAll('.text-avatar');
    if (user.data.user_pic !== null) {
        // 渲染图片头像
        for (let i = 0; i < 2; i++) {
            textavatar[i].style.display = 'none'
            layuiImg[i].src = user.data.user_pic;

        }

    } else {
        // 渲染文本头像
        let first = name[0].toUpperCase()
        for (let i = 0; i < 2; i++) {
            layuiImg[i].style.display = 'none';
            textavatar[i].innerText = first
        }

    }

}

// })