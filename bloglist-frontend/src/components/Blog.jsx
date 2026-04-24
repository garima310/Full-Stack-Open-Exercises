import { useState } from 'react'

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
        </div>
      )}
    </div>
  )
}

export default Blog