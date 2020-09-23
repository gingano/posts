import { useEffect } from 'react'
import { postRequest } from '../utils/requests'

function usePostRequest(dispatch, { currentPost: { info, comments } }) {
  useEffect(() => {
    const locationHash = window.location.hash
    if (
      locationHash.slice(1).split('=')[0] === 'postId' &&
      (!info || !comments)
    ) {
      dispatch(postRequest(Number(locationHash.split('=')[1])))
    } else if (!locationHash) {
      window.location.replace('/404')
    }
  }, [dispatch, info, comments])
}

export default usePostRequest
