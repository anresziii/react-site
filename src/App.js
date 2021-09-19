import React, { useState, useMemo } from 'react';
import PostList from './components/PostList';
import "./styles/App.css"
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/ui/modal/MyModal';
import MyButton from './components/ui/button/MyButton';
import { usePosts } from './components/hooks/usePosts';
import axios from 'axios';

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: "", query: "" })
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async const fetchPosts = () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(response.data);
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>GET</button>
            <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <hr style={{ margin: "15px 0" }} />
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"} />

        </div>
    );
}

export default App;