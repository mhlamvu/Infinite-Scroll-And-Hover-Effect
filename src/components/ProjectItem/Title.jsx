import React from 'react'

const Title = ({ title, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div 
      className='title-item'
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
        <h1 
          className="menu-title"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >{title}</h1>
    </div>
  )
}

export default Title