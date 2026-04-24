import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    await updateBlog(updatedBlog)
  }
  const handleDelete = async () => {
  if (window.confirm(`Delete ${blog.title}?`)) {
    await blogService.remove(blog.id)
    window.location.reload()  
  }
}

  return (
    <div style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && (
        <div>
          <div>{blog.url}</div>

          <div>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog