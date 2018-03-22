import React,{Component} from 'react'
import {connect} from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Table, Card } from 'antd'

@connect(({ essay, loading }) => ({
    essay,
    loading: loading.models.essay,
}))
class Article extends Component{
    
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.props.essay.pagination };
        pager.current = pagination.current;
       
        const params = {
            pageSize: pagination.pageSize,
            page: pagination.current,
            pagination:pager
        }
        this.props.dispatch({
            type: 'essay/fetchList',
            payload: params,
        });
      }
    componentDidMount(){
        const { essay: { pagination } } = this.props;
        const params = {
            page: pagination.page,
            pageSize: pagination.pageSize,
        }
        this.props.dispatch({
            type: 'essay/fetchList',
            payload:params
          });

        console.log(this.props)
    }

    render(){
        const { essay:{ essayList, pagination } } = this.props;
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
          }, {
            title: '创建时间',
            dataIndex: 'gmt_created',
            key: 'gmt_created',
          },
        ]
        return (
            <PageHeaderLayout>
                <Card>
                    <Table
                        rowKey={(record,index) => record.id} 
                        columns={columns}
                        loading={this.props.loading} 
                        dataSource={essayList} 
                        pagination={pagination}
                        onChange={this.handleTableChange} />
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Article;