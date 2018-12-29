<template>
    <div>
        <div class="blog-btn">
            <Button type="primary" to="/write">新建</Button>
        </div>
        <Table :loading="loading" :columns="columns" :data="data"></Table>
        <div class="page">
            <Page :total="total" @on-change="pageChange" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Page } from 'iview'
import axios from 'axios'
Vue.component('Page', Page);

import request from '../utils/request.js'
import Utils from '../utils/utils.js'
    export default {
        data () {
            return {
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width: 100,
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'gmt_created',
                        align: 'center',
                        render: (h, params) => {
                            console.log(params.row.gmt_created)
                            return h('div', Utils.dateFormat('yyyy-MM-dd hh:mm:ss', params.row.gmt_created))
                        }
                    },
                    {
                        title: 'action',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'view'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                data: [],
                total: 0
            }
        },
        methods: {
            pageChange (current) {
                this.fetch(current)
            },
            fetch (current, size) {
                request('/blog/lists', {
                    params: {
                        page: current,
                        size: size || 10
                    }
                }).then(data => {
                    this.data = data.data
                    this.total = data.total
                    this.loading = false
                })
            }
        },
        created() {
            this.fetch(1, 10);
        }
    }
</script>

<style scoped>
    .page{
        text-align: right;
        padding: 10px 0;
    }
    .blog-btn{
        margin-bottom: 10px;
    }
</style>
