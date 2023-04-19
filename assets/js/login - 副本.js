// const { default: axios } = require("axios");

// import axios from "axios";
window.addEventListener('load', function() {

    let link_reg = this.document.querySelector('#link_reg');
    var link_login = document.querySelector('#link_login');
    let login = this.document.querySelector('.login-box');
    let reg = this.document.querySelector('.reg-box')

    link_reg.addEventListener('click', function() {
        reg.style.display = 'block';
        login.style.display = 'none'
    });
    link_login.addEventListener('click', function() {
        login.style.display = 'block';
        reg.style.display = 'none'
    })


    // 自定义layui规则
    // 从 layui 获取 from 对象
    let form = layui.form;
    var layer = layui.layer
        // 自定义验证规则
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }



        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            let pwd = document.querySelectorAll('.reg-box .layui-input')[1]
            if (pwd.value != value) return '密码不一致'
        }

    });

    // 监听注册表单的提交事件
    let form_reg = this.document.querySelector('#form_reg');
    let reg_name = this.document.querySelector('#form_reg .layui-input');
    let reg_pwd = this.document.querySelectorAll('#form_reg .layui-input')[1];
    // var reg_pwd = this.document.querySelectorAll('[name=username]').value;

    // reg_name.addEventListener('blur', function() {
    //     console.log(this.value);
    // })

    // reg_pwd.addEventListener('blur', function() {
    //     console.log(this.value);
    // })


    form_reg.addEventListener('submit', function(e) {
        e.preventDefault() //阻止默认行为

        // axios.post('http://www.liulongbin.top:3007/api/reguser', {
        //     username: 'reg_nam1e',
        //     password: 'reg_pw1d'
        // }).then(response => {
        //         console.log(response.data.message);
        //     },
        //     error => { console.log('失败了', error.message) })

        axios({
            url: 'http://www.liulongbin.top:3007/api/reguser',
            method: 'post',
            data: {
                username: reg_name.value,
                password: reg_pwd.value
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg(res.data.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人点击
            link_login.click()
        })
    })


    // 监听登录表单的提交事件
    let form_login = this.document.getElementById('form_login');
    let login_name = this.document.querySelector('#form_reg .layui-input');
    let login_pwd = this.document.querySelectorAll('#form_reg .layui-input')[1];

    form_login.addEventListener('submit', function(e) {
        e.preventDefault()
        axios({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: {
                username: login_name.value,
                password: login_pwd.value
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功！')
                // console.log(res.data.token);
                // 将登录成功后的token值保存
            localStorage.setItem('token', res.data.token)
                // 到转到登录主页
            location.href = '/index.html'
        })

    })


})