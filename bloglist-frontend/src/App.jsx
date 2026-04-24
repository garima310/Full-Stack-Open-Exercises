import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)

  
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')

      setMessage(`Welcome ${user.name}`)
      setTimeout(() => setMessage(null), 3000)

    } catch (error) {
      setMessage('wrong username or password')
      setTimeout(() => setMessage(null), 3000)
    }
  }

 
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  
  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const returnedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => setMessage(null), 3000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setMessage('failed to add blog')
      setTimeout(() => setMessage(null), 3000)
    }
  }

 
  const updateBlog = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)

    setBlogs(prevBlogs =>
  prevBlogs.map(blog =>
    blog.id !== updatedBlog.id ? blog : returnedBlog
  )
)
  }

  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {message && <div>{message}</div>}

        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

 
  return (
    <div>
      <h2>blogs</h2>

      {message && <div>{message}</div>}

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <h3>create new</h3>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>

      <h3>blogs</h3>

      {blogs
  .sort((a, b) => b.likes - a.likes)
  .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}   
        />
      ))}
    </div>
  )
}

export default App