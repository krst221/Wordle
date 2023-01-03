import React from 'react'

const ErrorModal = ({ text }) => {
  return (
    <div className='modal--error'>
      <div>{text}</div>
    </div>
  )
}

export default ErrorModal