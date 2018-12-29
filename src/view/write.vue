<template>
    <div>
        <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title" required>
                <Input v-model="formCustom.title" />
            </FormItem>
            <FormItem label="描述" prop="desc">
                <Input type="text" v-model="formCustom.desc" />
            </FormItem>
            <FormItem label="内容" prop="content">
                <i-editor v-model="formCustom.content"></i-editor>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import request from '../utils/request';

    export default {
        data () {
            return {
                formCustom: {
                    title: '',
                    desc: '',
                    content: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                         { required: true, message: '请输入标题', trigger: 'blur' }
                    ]
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
            save () {
                request('/blog/write', {
                    method: 'post',
                    data: {
                        ...this.formCustom
                    }
                }).then( data => {
                    if (data.code === 200) {
                        this.$router.push({
                            path: '/list'
                        })
                        this.$Message.success('保存成功');
                    }
                })
            }
        },
        created() {

        }
    }
</script>

<style scoped>
   
</style>
