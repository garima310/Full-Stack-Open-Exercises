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

export default blogReducer