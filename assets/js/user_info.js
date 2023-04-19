let form = layui.form
let layer = layui.layer

// 自定义的验证规则
form.verify({
    nickname: function(value, item) {
        if (value.length > 6) {
            return '长度必须在 1 ~ 6 个字符之间'
        }
        // console.log(res.data);
    }


})
initUserInfo()

// 初始化用户的信息
function initUserInfo() {
    let username1 = document.querySelector('.layui-form .layui-input')
    service({
        url: '/my/userinfo',
        method: 'get',
        headers: {
            Authorization: this.localStorage.getItem('token') || ''
        }
    }).then(res => {
        // console.log(res);
        if (res.data.status !== 0) {
            return layer.msg('获取用户信息失败')
        }
        // console.log(res.data.data);
        // username1.value = res.data.data.username

        // 调用 form.val() 快速为表单赋值

        form.val('formUserInfo', res.data.data)

    }).catch(error => {
        console.log(error);
    })

}

let tbReset = document.getElementById('btnReset')
tbReset.addEventListener('click', function(e) {
    // 阻止默认行为
    e.preventDefault();
    initUserInfo()
})


// 监听表单事件
let form1 = document.querySelector('.layui-form');
let nickname1 = document.querySelectorAll('.layui-form .layui-input')[1]
let email1 = document.querySelectorAll('.layui-form .layui-input')[2]
let uid = document.getElementById('uid');
form1.addEventListener('submit', function(e) {
    console.log(Number(uid.value), nickname1.value, email1.value);

    // 阻止默认提交
    e.preventDefault()
    service({
        url: '/my/userinfo',
        method: 'post',
        data: {
            id: Number(uid.value),
            nickname: nickname1.value,
            email: email1.value
        },
        headers: {
            Authorization: localStorage.getItem('token') || '',
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        if (res.data.status !== 0) {
            return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')

        // 调用父页面的用户信息，重新渲染用户信息
        window.parent.getUserInfo()
    })
})