import { useEffect } from 'react'
import { usersRequest } from '../utils/requests'

function useUsersRequest(dispatch) {
  useEffect(() => {
    dispatch(usersRequest())
  }, [])
}

export default useUsersRequest
