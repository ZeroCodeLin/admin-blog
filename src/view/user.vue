<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="80">
        <FormItem label="头像" >
            <div class="demo-upload-list" v-for="item in avatar" :key="item.url">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click="showView"></Icon>
                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
                <Modal v-model="visible" v-bind:footer-hide="true" >
                    <img :src="item.url" v-if="visible" style="width: 100%">
                </Modal>
            </div>
            <Upload 
                v-show="avatar.length === 0"
                ref="upload"
                :default-file-list="defaultList"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:150px;">
                <div style="width: 150px;height:150px;line-height: 150px;">
                    <Icon type="ios-camera" size="40"></Icon>
                </div>
            </Upload>
        </FormItem>
        <FormItem label="昵称" prop="nickName" required >
            <Input v-model="formCustom.nickName" />
        </FormItem>
        <FormItem label="邮箱" prop="email" required>
            <Input v-model="formCustom.email" />
        </FormItem>
        <FormItem label="github" prop="github">
            <Input type="text" v-model="formCustom.github" />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
        </FormItem>
    </Form>
</template>

<script>
import Vue from 'vue'
import request from '../utils/request';

export default {
    data () {
        return {
            formCustom: {
                nickName: '',
                email: '',
                github: ''
            },
            avatar: [],
            visible: false,
            defaultList: [],
            ruleValidate: {
                email: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.save();
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        showView () {
            this.visible = true;
        },
        handleSuccess (response, file, fileList) {
            file.url = 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        save () {
            request('/users/update', {
                method: 'post',
                data: {
                    ...this.formCustom
                }
            }).then(data => {
                if (data.code === 200) {
                    this.$Message.success('保存成功!');
                }
            })
        }
    },
    mounted () {
        this.avatar = this.$refs.upload.fileList;
    },
    created () {
        request('/user/info').then(data => {
            this.formCustom = {
                ...data.data
            }
            // this.avatar = [{
            //     url: 
            // }]
            console.log(data)
        })
    }
}
</script>

<style lang="scss">
    .demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
    display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
