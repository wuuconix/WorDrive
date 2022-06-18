<template>
    <div class="outerWrapper">
        <div class="panelWrapper">
            <img src="https://img-blog.csdnimg.cn/6c673269a2df4998acd481934f259cd9.png">
            <span>欢迎使用WordDrive。一款由Wuuconix编写的个人网盘</span>
            <el-input v-model="username" :placeholder="usernamePH" clearable/>
            <el-input v-model="password" type="password" :placeholder="passwordPH" show-password clearable/>
            <el-button type="primary">{{ isLogin ? "登录" : "注册" }}</el-button>
            <div class="tip">{{ tip }} <span class="register" @click="modeSwtich">{{ isLogin ? "注册" : "登录" }}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            isLogin: true,
            username: "",
            password: ""
        }
    },
    methods: {
        modeSwtich() {
            this.username = ""
            this.password = ""
            this.isLogin = !this.isLogin
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
        .el-input {
            padding: 10px 0;
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