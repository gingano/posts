import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import usePostsRequest from '../hooks/usePostsRequest'
import PostThumbnail from './PostThumbnail'

const Posts = () => {
  const postsState = useSelector(({ posts }) => posts)
  const dispatch = useDispatch()

  usePostsRequest(dispatch, postsState)

  return (
    <div className="posts">
      <Link to="/new-post" className="posts__add-post-button">
        add new post
      </Link>
      <ul className="posts__list">
        {postsState.items.map((post) => (
          <li className="posts__list-item" key={`post-${post.id}`}>
            <PostThumbnail post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
