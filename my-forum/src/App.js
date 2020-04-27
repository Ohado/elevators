import React from 'react';
import './App.css';

class Message extends React.Component {
  constructor(props){
    super(props)
    const {subject, userName, content} = this.props.message
    this.state = {
      subject: subject,
      userName: userName,
      content: content,
      open: false,
      replyOpen: false,
      subMessages: []
    }
    this.addSubMessage = this.addSubMessage.bind(this)
  }

  addSubMessage(message) {
    this.setState({replyOpen: false, open: false})
    this.setState({subMessages: [...this.state.subMessages, message]})
  }

  render() {
    const {subject, userName, content, open, replyOpen, subMessages} = this.state
    return(
      <div className='message'>
        <div className='message-header' key={subject}>
          <button className='message-subject' onClick={()=>this.setState({open: !open})}>
            • {subject}
          </button> &nbsp;&nbsp;
          <div className='message-userName'>{userName}</div>
        </div>
        {open ?
        <div>
          <div className='message-content'>
            {content}
          </div> <p/>
          <button className='button-reply' onClick={()=>this.setState({replyOpen: !replyOpen})}>reply</button>
          {replyOpen ?
            <div style={{marginLeft: '25px'}}> 
              <MessageBox onSubmit={this.addSubMessage}/> 
            </div>
            :
            null
          }
        </div>
        :
        null
        }
        {subMessages.map(
          (message, i) => <Message message={message} key={i}/>)}
      </div>
    )
  }
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      userName: '',
      content: '',
      onSubmit: this.props.onSubmit,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    this.state.onSubmit({subject: this.state.subject, userName: this.state.userName, content: this.state.content})
  }

  render(){
    const {subject, userName, content} = this.state
    return (
      <form onSubmit = {this.handleSubmit}>
        Subject: 
          <input className='message-inputs' value={subject} onChange={(event)=>this.setState({subject:event.target.value})}/>
        <br/>user name:  
          <input className='message-inputs' value={userName} onChange={(event)=>this.setState({userName:event.target.value})}/>
        <br/><textarea className='main-textarea' value={content} onChange={(event)=>this.setState({content:event.target.value})}/>
        <input className='button-new-message' type="submit"/>
      </form>
    )
  }
}

class ForumPage extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [{subject: "experimental message", userName: "ohad", content: "this is a fine message"},
                {subject: "reply", userName: "Somebody", content: "this is diffenret message"}],
      newMessageOpen: false,
    }
    this.addMessage = this.addMessage.bind(this)
  }

  addMessage(message) {
    this.setState({newMessageOpen: false, messages: [...this.state.messages, message]})
  }

  render() {
    const {messages, newMessageOpen} = this.state
    return(
      <div>
        <div className= 'forum-page-new'>
          <button className='button-new-message' onClick={()=> this.setState({newMessageOpen:!newMessageOpen})}>New Message</button>
          {newMessageOpen ? <MessageBox onSubmit={this.addMessage}/> : null }
        </div>
        <p/>
        {messages.map(
          (message, i) => <Message message={message} key={i}/>)}
      </div>
  )}
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{textAlign: 'center'}}>Welcome to my experimental forum!</h2>
      </header>
      <ForumPage/>
    </div>
  );
}

export default App;
