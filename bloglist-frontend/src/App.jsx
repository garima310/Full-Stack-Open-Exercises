import { useState, useEffect, useReducer } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogReducer, {
  setBlogs,
  addBlogAction,
  updateBlogAction
} from './reducers/blogReducers'



const App = () => {
  const [blogs, dispatch] = useReducer(blogReducer, [])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
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

      setNotification({
        text: `Welcome ${user.name}`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 3000)

    } catch (error) {
      setNotification({
        text: 'wrong username or password',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }

    try {
      const returnedBlog = await blogService.create(newBlog)

      dispatch(addBlogAction(returnedBlog))

      setNotification({
        text: `a new blog ${title} by ${author} added`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 3000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotification({
        text: 'failed to add blog',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)

    dispatch(updateBlogAction(returnedBlog))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />

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
      <Notification notification={notification} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Toggleable buttonLabel="new blog">
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
      </Toggleable>

      <h3>blogs</h3>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App