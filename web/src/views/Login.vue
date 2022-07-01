<template>
    <div class="outerWrapper">
        <div class="panelWrapper">
            <img src="https://img-blog.csdnimg.cn/6c673269a2df4998acd481934f259cd9.png">
            <span class="desc">欢迎使用WordDrive。一款由Wuuconix编写的个人网盘</span>
            <el-form ref="form" :rules="formRules" :model="formModel">
                <el-form-item prop="user">
                    <el-input v-model="formModel.user" :placeholder="usernamePH" clearable/>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input v-model="formModel.pass" type="password" :placeholder="passwordPH" show-password clearable/>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="isLogin ? login() : register()">{{ isLogin ? "登录" : "注册" }}</el-button>
            <div class="tip">{{ tip }} <span class="register" @click="modeSwtich">{{ isLogin ? "注册" : "登录" }}</span></div>
        </div>
    </div>
</template>

<script>
import { apiBaseURI } from "../../../config/web.js"

export default {
    name: 'Login',
    inject: ["$message"],
    data() {
        return {
            isLogin: true,
            formModel: {
                user: "",
                pass: ""
            },
            formRules: {
                user: [{ required: true, message: "请输入账号"}, { min: 4, max: 20, message: "账号长度需要在4到20位之间"}],
                pass: [{ required: true, message: "请输入密码"}, { min: 4, max: 20, message: "密码长度需要在6到20位之间"}]
            }
        }
    },
    methods: {
        modeSwtich() {
            this.username = ""
            this.password = ""
            this.isLogin = !this.isLogin
        },
        login() {
            this.$refs.form.validate((isValid) => {
                if (!isValid) return
                fetch(`${apiBaseURI}/login`, {
                    method: "POST",
                    body: new URLSearchParams({user: this.formModel.user, pass: this.formModel.pass })
                }).then(res => res.json()).then(res => {
                    console.log(res)
                    if(res.success) {
                        this.$message.success(res.success)
                    } else {
                        this.$message.error(res.error)
                    }
                })
            })
        },
        register() {
            this.$refs.form.validate((isValid) => {
                if (!isValid) return
                fetch(`${apiBaseURI}/register`, {
                    method: "POST",
                    body: new URLSearchParams({user: this.formModel.user, pass: this.formModel.pass })
                }).then(res => res.json()).then(res => {
                    console.log(res)
                    if(res.success) {
                        this.$message.success(res.success)
                    } else {
                        this.$message.error(res.error)
                    }
                })
            })
        }
    },
    computed: {
        usernamePH() {
            return this.isLogin ? "请输入账号" : "请输入账号 (4-20位)"
        },
        passwordPH() {
            return this.isLogin ? "请输入密码" : "请输入密码 (6-20位)"
        },
        tip() {
            return this.isLogin ? "还没有wordrive账号?" : "已有wordrive账号?"
        }
    }
}
</script>

<style lang="scss" scoped>
    div.outerWrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right top, #ecf5ff, #c6e2ff);
    }

    @media screen and (min-width: 510px) {
        div.panelWrapper {
            width: 500px;
        }
    }

    @media screen and (max-width: 510px) {
        div.panelWrapper {
            width: 95%;
        }
    }

    div.panelWrapper {
        padding: 20px;
        margin-top: -100px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: var(--el-box-shadow);

        span.desc {
            margin-bottom: 15px;
        }
        .el-form {
            width: 100%
        }
    }
    div.tip {
        margin-top: 10px;
        font-size: 14px;
        user-select: none;
        span.register {
            color: #409EFF;
        }
        span.register:hover {
            text-decoration: underline;
        }
    }
</style>