import React, { useReducer, useRef } from 'react'
import './style.css'
import Title from './Title'
import Image from './Image'
import animate from './animate'

const initialState = {
  opacity: 0,
  parallaxPos: {x: 0, y: -20},
  scale: .8,
  rotationsPosition: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE/OPACITY":
      return {
        ...state,
        opacity: action.payload
      }
    case "MOUSE/COORDINATES":
      return {
        ...state,
        parallaxPos: action.payload
      }

    case "CHANGE/ROTATION":
      return {
        ...state,
        rotationPosition: action.payload
      }

    case "CHANGE/SCALE":
      return {
        ...state,
        scale: action.payload
      }
  
    default:
      throw new Error();
  }
}

const ProjectItem = ({ project, itemIndex }) => {

  const listItem = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const easeMethod = "easeInOutCubic"

  const parallax = e => {
    const speed = -5
    const x = (window.innerWidth - e.pageX * speed) / 100
    const y = (window.innerHeight - e.pageY * speed) / 100

    dispatch({type: "MOUSE/COORDINATES", payload: {x, y}})
  }

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/OPACITY", payload: newOpacity })
        callback()
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod
    })
  }

  const handleScale = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/SCALE", payload: newScale })
        callback()
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod
    })
  }
  const handleRotation = (currentRotation, duration) => {
    // random between -15 and 15
    const newRotation = 
      Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1)

    animate({
      fromValue: currentRotation,
      toValue: newRotation,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/ROTATION", payload: newRotation })
        callback()
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod
    })
  }

  // Mouse actions

  const handleMouseEnter = () => {
    handleScale(0.8, 1, 500)
    handleOpacity(0, 1, 500)
    handleRotation(state.rotationPosition, 500)
    listItem.current.addEventListener('mouseenter', parallax)
  }
  
  const handleMouseLeave = () => {
    handleScale(1, initialState.scale, 500)
    handleOpacity(1, 0, 500)
    handleRotation(state.rotationPosition, 500)
    dispatch({ type: "MOUSE/COORDINATES", payload: initialState.parallaxPos})
    listItem.current.removeEventListener('mouseleave', parallax)
  }

  return (
    <li className='project-item-container' ref={listItem}>
        <Title title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <Image 
          url={project.url} 
          opacity={state.opacity} 
          parallaxPos={state.parallaxPos}
          scale={state.scale}
          rotationPosition={state.rotationPosition}
        />

        <div className="info-block">
            <p className="into-block-header">
                <span>0{itemIndex}</span>
            </p>

            {project.info.map(element => (
                <p key={element}><span>{element}</span></p>
            ))}
        </div>
    </li>
  )
}

export default ProjectItem