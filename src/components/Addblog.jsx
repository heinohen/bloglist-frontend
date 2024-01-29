import { useState } from "react"

const Addblog = ( { addNewBlog }) => {
    
    //fields
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    //handlers, not used in part5 default app why? ==> see in App.jsx for the form!?!?
    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        console.log(event.target.value)
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        console.log(event.target.value)
        setUrl(event.target.value)
    }

    //send blog object from this components form to main app where it is handled by 'addBlog'
    const addBlog = (event) => {
        event.preventDefault()
        //same as in noteapp, check attributes
        addNewBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <div>
        <br />
        <h2>create new blog</h2>
        <form 
        onSubmit={addNewBlog}
        className="addblog">
            <div>
                <p>blogin nimi</p>
                <div>Title:
                    <input type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange} 
                    />
                </div>                
                <div>
                    Author:
                    <input type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                    />
                </div>

            </div>
            <button type="submit">submit</button>
        </form>
        </div>
    )
}

export default Addblog

