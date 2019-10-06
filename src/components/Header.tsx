import React from 'react'
const userImage = require('../media/images/userMarcus.jpg')

export default class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div className='header'>
        <div className='logo'>
          <i className='fa fa-apple-alt' />
        </div>
        <div className='logo-title'>
          <span>TS Agenda</span>
        </div>
        <div className='user-image'>
          <img alt='user' src={userImage} />
        </div>
        <div className='welcome-message'>
          <span className='primary-font'>Welcome,</span>
          <span className='primary-font-b'> Marcus Corrêa!</span>
        </div>
      </div>
    )
  }
}
