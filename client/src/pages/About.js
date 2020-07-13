import React, { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    document.title = 'About'
  }, [])

  return <div>About Page</div>
}

export default About
