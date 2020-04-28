<template>
    <!-- <el-container>
        <el-header>
            <router-link to="/">首页</router-link>
            <router-link to="/profile">个人中心</router-link>
            <router-link to="/user">用户</router-link>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>尾</el-footer>
    </el-container> -->


    <div id="app">
        hello
        <router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/user">用户</router-link>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    mounted() {
        // console.log(this._rootRouter);
    }
}
</script>

<style>
*{margin: 0; padding: 0;}
.el-main {
    min-height: calc(100vh - 160px);
}
.el-header, .el-footer {
    background: #2a2a2a;
}
</style>