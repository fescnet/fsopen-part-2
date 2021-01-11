import React from 'react'

const Message = ({text, isError}) => {

  if(text === null){
    return null
  }

  const className = isError ? 'error' : 'success'

  return (
    <div className={className}>
      {text}
    </div>
  )
}

export default Message
