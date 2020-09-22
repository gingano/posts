import { useEffect } from 'react'
import { setAllPostsToItems } from '../redux/actions/posts'
import { postsRequest } from '../utils/requests'

function usePostsRequest(dispatch, { userId, allPosts }) {
  useEffect(() => {
    const locationHash = window.location.hash
    if (
      locationHash.slice(1).split('=')[0] === 'userId' &&
      userId !== Number(locationHash.split('=')[1]) &&
      userId !== -1
    ) {
      dispatch(postsRequest(Number(locationHash.split('=')[1])))
    } else if (allPosts.length === 0) {
      dispatch(postsRequest(-1))
    } else if (!locationHash && allPosts.length > 0) {
      dispatch(setAllPostsToItems())
    }
  }, [allPosts])
}

export default usePostsRequest
