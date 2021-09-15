import React, { useRef, useState } from 'react';
import PostList from './components/PostList';
import "./styles/App.css"
import MyButton from './components/ui/button/MyButton';
import MyInput from './components/ui/input/MyInput';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript", body: "Description" },
        { id: 2, title: "Python", body: "Description" },
    ])
    const [post, setPost] = useState({title: "", body: ""})

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const addNewPost = (e) => {
        e.preventDefault()
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: "", body: ""})
    }

    return (
        <div className="App">
            <form>
                <MyInput
                    onChange={e => setPost({...post, title: e.target.value})}
                    value={post.title}
                    type="text"
                    placeholder="Название поста"

                />
                <MyInput
                    onChange={e => setPost({...post, body: e.target.value})}
                    value={post.body}
                    type="text"
                    placeholder="Описаниe поста"
                />
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
            <PostList posts={posts} title={"Список постов"} />
        </div>
    );
}

export default App;