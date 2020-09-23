import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      } catch (error) {
        window.scrollTo(0, 0)
      }
    })
    return () => {
      unlisten()
    }
  }, [history])

  return null
}

export default withRouter(ScrollToTop)
