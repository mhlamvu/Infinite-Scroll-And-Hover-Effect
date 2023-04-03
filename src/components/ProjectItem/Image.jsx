import React from 'react'

const Image = ({ url, opacity, parallaxPos, scale, rotationPosition }) => {

  console.log(scale, rotationPosition)
  return (
    <img src={url} 
      style={{
        opacity: opacity,
        transform: 
          `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0px) rotate(${rotationPosition}deg) 
          scale(${scale})
          `
      }}
    />
  )
}

export default Image