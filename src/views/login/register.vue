<template>

    <div class="login-container">
        <el-form ref="formRegister" :model="formRegister" :rules="rules" class="login-form" auto-complete="on" label-position="left">

            <div class="title-container">
                <h3 class="title">注册</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="formRegister.username" placeholder="用户名" name="username" type="text" />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input v-model="formRegister.password" type="password" placeholder="密码" name="password" />
            </el-form-item>
            <el-form-item prop="checkPassword">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input v-model="formRegister.checkPassword" type="password" placeholder="确认密码" name="password" />
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="addUser">立即注册</el-button>
            <div class="tips">
                <router-link to='/login'>已有账号, 直接去登录</router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        let checkUserName = (rule, value, cb) => {
            if (!value) {
                return cb(new Error('账户不能为空!'))
            } else {
                cb(); // 将判断传递给后面
            }
        }
        let checkPassword = (rule, value, cb) => {
            if (!value) {
                return cb(new Error('密码不能为空!'))
            } else {
                cb();
            }
        }
        let checkPasswordAgain = (rule, value, cb) => {
            if (!value) {
                return cb(new Error('再次输入密码不能为空!'))
            } else if (value !== this.formRegister.password) {
                return cb(new Error('两次输入密码不一致!'));
            } else {
                cb();
            }
        }
        return {
            formRegister: {
                username: '',
                password: '',
                checkPassword: ''
            },
            rules: {
                username: [
                    { validator: checkUserName, trigger: 'blur' }
                ],
                password: [
                    { validator: checkPassword, trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: checkPasswordAgain, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 用户注册
        addUser() {
            let user = this.formRegister
            let formData = {
                username: user.username,
                password: user.password
            };
            // 表单验证
            this.$refs['formRegister'].validate((valid) => {
                if (valid) {
                    this.$ajax.post('/user/register', formData, res => {
                        this.$message.success({
                            message: '注册成功',
                            duration: 1000,
                            onClose: () => {
                                this.$router.push('/login')
                            }
                        })
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>

