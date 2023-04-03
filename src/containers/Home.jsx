import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProjectItem from '../components/ProjectItem'

import './home.css'

import { pageData } from '../data'

const Home = () => {

  const menuItems = useRef(null)
  const [renderItems, setRenderItems] = useState(pageData)

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight
    const fitMax = Math.ceil(window.innerHeight / itemHeight)

    const clonedItems = [...renderItems].filter((_, index) => index < fitMax).map(target => target)

    setRenderItems([...renderItems, ...clonedItems])
    return clonedItems.length * itemHeight
  }

  const getScrollPos = () => {
    return (
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) - (menuItems.current.clientTop || 0)
    )
  }

  const setScrollPos = pos => menuItems.current.scrollTop = pos

  const initScroll = () => {
    const scrollPos = getScrollPos()
    if(scrollPos <= 0) setScrollPos(1)
  }

  useEffect(() => {
    const clonesHeight = cloneItems()
    initScroll()

    menuItems.current.style.scrollBehavior = 'unset'
    const scrollUpdate = () => {
      const scrollPos = getScrollPos()

      if (clonesHeight + scrollPos >= menuItems.current.scrollHeight) {
        setScrollPos(1)
      }else if (scrollPos <= 0) {
        setScrollPos(menuItems.current.scrollHeight - clonesHeight)
      }
    }
    menuItems.current.addEventListener("scroll", scrollUpdate)

    return () => {
      menuItems.current.removeEventListener("scroll", scrollUpdate)
    }
  }, [])

  return (
    <div>
      <Header />
      <div className="main-container container" id="main">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              itemIndex={index}
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Home