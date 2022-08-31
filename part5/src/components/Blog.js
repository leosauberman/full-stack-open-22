const Blog = ({ blog, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const isOwnedByUser = () =>
        blog.user.id === JSON.parse(window.localStorage.getItem('user')).id;


    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} {blog.likes}
            <button onClick={() => handleLike(blog.id)}>Like</button>
            { isOwnedByUser()
                ? <button onClick={() => handleRemove(blog.id)}>Remove</button>
                : null
            }
        </div>
    )
}

export default Blog