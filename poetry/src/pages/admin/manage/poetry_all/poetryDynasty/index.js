import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageDynasty extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data : [],
        searchData: null,
        columns: [
            {
                title: '朝代名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
         },
        {
            title: '开始年份',
            dataIndex: 'starttime',
            key: 'start',
        },
        {
          title: '结束年份',
          dataIndex: 'endtime',
          key: 'end',
        },
        {
            title: '简介',
            dataIndex: 'intro',
            key: 'intro',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <Button style={{ marginRight: 10 }}>编辑</Button>
    <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
    </span>
),
},
]
}
}

componentDidMount () {
    axios.get('/admin/listdynasty').then((res) => {
        console.log(res.data.data)
        this.setState({
            data: res.data.data
        })
        // console.log('管理员管理用户页面Data', this.state.data)
    }).catch(err => {
        console.log(err)
    })
}

search = (e) => {
    // console.log(e.target.value)
    // 获得输入框的值
    this.setState({
        searchData: e.target.value
    }, () => {
        // console.log('searchData', this.state.searchData)
    })
}

handleSubmit = (e) => {
    var state=this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/admin/listdynasty";//接口地址
    let kw = this.state.searchData;
    fetch(url,{
        method: 'post',
        body: kw,
        credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        // console.log(json.data)
        state.setState({
            data:json.data
        })
        // console.log('Data', state.state.data)
    })
}

deleteCollection = (id) => {
    // 点击删除触发的方法
    // console.log('删除的id',id)
    var state=this
    let url = "http://localhost:8080/admin/deletedynasty";//接口地址
    fetch(url,{
        method: 'post',
        body: id,
        credentials: 'include'//解决fetch跨域session丢失
    })
}

  render() {
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            诗词朝代管理
          </Header>
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             <div className="content" style={{ padding: 24, minHeight: 360 }}>
            <div className="search">
              <Input
                placeholder="请输入关键字搜索"
                className="input"
                onChange={(e) => { this.search(e) }}
              />
              <Button onClick={this.handleSubmit}>搜索</Button>
              <Button>删除</Button>
            </div>
            <Table
              rowKey={(record, index) => `complete${record.id}${index}`}
              rowSelection
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={{
                pageSize: 5,
                defaultCurrent: 1
              }}
            />
          </div>
        </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default ManageDynasty