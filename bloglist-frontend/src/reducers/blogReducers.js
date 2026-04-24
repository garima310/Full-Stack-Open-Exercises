const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return state.concat(action.payload)
    case 'UPDATE_BLOG':
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    default:
      return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    payload: blogs
  }
}

export const addBlogAction = (blog) => {
  return {
    type: 'ADD_BLOG',
    payload: blog
  }
}

export const updateBlogAction = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    payload: blog
  }
}

export default blogReducer