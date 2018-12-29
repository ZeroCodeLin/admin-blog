<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in">
                <p slot="title">登录</p>
                <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
                    <FormItem prop="email">
                        <Input type="text" v-model="formLogin.email" placeholder="用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formLogin.password" placeholder="密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formLogin')" long>登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Card } from 'iview';
Vue.component('Card', Card);
import request from '../utils/request';

export default {
    data () {
        return {
            formLogin: {
                email: '',
                password: ''
            },
            ruleLogin: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码最少为6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    request('/login',{
                        method: 'post',
                        data: {
                            ...this.formLogin
                        }
                    }).then( data => {
                        if (data.code === 200) {
                            sessionStorage.setItem('Authorization', data.token)
                            this.$router.push({
                                path: '/'
                            })
                        } else {
                            this.$Message.error('账号密码错误')
                        }
                    })
                } else {
                    // this.$Message(err.message)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.login{
    width: 100%;
    height: 100%;
    background-image: url('../img/unnamed.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        
    }
}
</style>
