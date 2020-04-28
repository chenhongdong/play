<template>
    <div>添加用户
        <el-form :model="ruleForm" :rules="rules" ref="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    beforeRouterEnter (to, from, next) {    // 页面权限验证
        console.log(this);
        // next();
    },
    beforeRouterLeave (to, from, next) {
        if (this.ruleForm.username && !this.flag) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    next();
                })
                .catch(_ => {})
        } else {
            next();
        }
    },
    data() {
        return {
            ruleForm: {
                username: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入内容'
                    }
                ]
            },
            flag: false
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$router.push('/user/list');
                    this.flag = true;
                }
            })
        }
    }
}
</script>