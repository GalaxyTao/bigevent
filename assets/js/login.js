window.addEventListener('load', function() {
    let link_reg = this.document.querySelector('#link_reg');
    let link_login = document.querySelector('#link_login');
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


})