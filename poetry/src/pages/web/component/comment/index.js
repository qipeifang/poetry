// 评论组件
import React, { Component } from 'react'
import './index.less'
import { Button, Input, Comment, Tooltip, List } from 'antd';
import axios from 'axios'
import moment from 'moment';

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '', // 用户输入的评论 
      userEmail: '',   // 
    }
  }

  componentDidMount() {
    // 获取当前评论人的email
    axios.get('/isManager').then((res) => {
      // console.log('isManager',res.data)
      let email = res.data.data.email
      this.setState({
        userEmail: email
      }, () => {
        // console.log('评论页面的用户email', this.state.userEmail)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleComment = (e) => {
    console.log('发表的评论：', e.target.value)
    this.setState({
      commentText: e.target.value
    })
  }

  handleSubmit = (e) => {
    // 点击 发布 触发的方法，将评论内容传到后端
    let url = "http://localhost:8080/writecomment";//接口地址
    let id = this.props.id
    let name = this.props.poetryname
    let data = new FormData();
    let msg = {
      'comments': this.state.commentText,
      'email': this.state.userEmail,
      'poetryid': id,
      'poetryname': name
    }
    console.log('发表的评论：', msg)
    for (const key in msg) {
      data.append(key, msg[key])
    }
    if (this.state.userEmail === '') {
      alert('请登录')
    } else {
      fetch(url, {
        method: 'post',
        body: data,
        credentials: 'include'
      }).then(function (res) {
        alert('评论成功')
        window.location.reload(true)
      })
    }
  }

  // 显示的评论列表
  renderList = () => {
    return (((this.props.list).length) === 0) ?
      (<div className="no-comments">暂无评论，快去抢沙发吧！</div>) :
      (
        <ul>
          {
            this.props.list.map(item => (
              // <li key={item.id}>
              //   <h4>评论人邮箱: {item.email}</h4>
              //   <p>评论内容：{item.comments}</p>
              // </li>
              <li className="comment-item">
                <Comment
                  author={item.email}
                  content={item.comments}
                  />
                </li>
            ))
          }
        </ul>
      )
  };

  render() {
    return (
      <div className="comment_wrapper" style={{ width: '50vw' }}>
        <div className="comment">
          <textarea className="comment_content"
            onChange={this.handleComment}
            cols="60" rows="10"
            placeholder="请输入评论内容">
          </textarea>
          <Button className="submit" onClick={this.handleSubmit}>发布</Button>
        </div>
        <div className="comment_list">
          {this.renderList()}
        </div>
      </div>
    )
  }
}

export default CommentList