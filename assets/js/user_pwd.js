let layer = layui.layer

let form = layui.form

let oldPwd = document.getElementsByName('oldPwd')[0]
let newPwd = document.getElementsByName('newPwd')[0]
let resPwd = document.getElementsByName('resPwd')[0]
let form1 = document.querySelector('.layui-form')

form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function(value) {
        if (oldPwd.value === value) {
            return '新旧密码不能一致！'
        }
    },
    newsamePwd: function(value) {
        if (newPwd.value !== value) {
            return '新密码与确认密码不一致！'
        }
    }

})

let btn = document.querySelector('.layui-btn')
btn.addEventListener('click', function(e) {
    e.preventDefault()
    service({
        url: '/my/updatepwd',
        method: 'post',
        data: {
            oldPwd: oldPwd.value,
            newPwd: resPwd.value
        },
        headers: {
            Authorization: localStorage.getItem('token') || '',
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        if (res.data.status !== 0) {
            return layer.msg(res.data.message)
        }
        layer.msg(res.data.message)
            // 重置表单
        form1.reset()
    })
})