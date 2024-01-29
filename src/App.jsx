import { useState, useEffect } from 'react'
//components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Addblog from './components/Addblog'
import Footer from './components/Footer'
//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const localStorage = 'loggedBlogappUser'

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorage)
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
        username, password,
      })

      window.localStorage.setItem(
        localStorage , JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form className="login"
      onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleAddBlog = (newBlog) => {
    blogService
    .create(newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage('Blog added succesfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5678)
    })

  }
  
  // add blog is in separate component all together
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
      <p className='logInfo'>{user.name} logged in</p>
      <button
        type = "submit"
        onClick={handleLogout}>
        log out
      </button>
      <Addblog addNewBlog={handleAddBlog}/>
      <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
      </ul>
      <Footer />
      </div>
    } 
    </div>
  )
}

export default App