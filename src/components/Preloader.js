import React from 'react'
import { useSelector } from 'react-redux'

const Preloader = () => {
  const preloaderState = useSelector(({ preloader }) => preloader)

  return (
    <div
      className={`preloader preloader--${
        preloaderState.isVisible ? 'active' : 'hidden'
      }`}
    >
      <div className="preloader__loader" />
    </div>
  )
}

export default Preloader
