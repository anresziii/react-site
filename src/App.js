import React, { useRef, useState } from 'react';
import PostList from './components/PostList';
import "./styles/App.css"
import PostForm from './components/PostForm';
import MySelect from './components/ui/select/MySelect';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript", body: "Description" },
        { id: 2, title: "Python", body: "Description" },
    ])

    const [selectedSort, setSelectedSort] = useState("")

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([[...posts].sort((a, b) => a[sort].localeCompare(b[sort]))])
    }

    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[
                        { value: "title", name: "По названию" },
                        { value: "body", name: "По описанию" }
                    ]}
                />
            </div>
            {posts.length
                ?
                <PostList remove={removePost} posts={posts} title={"Список постов"} />
                :
                <h1 style={{ textAlign: "center" }}>
                    Посты не найдены!
                </h1>
            }

        </div>
    );
}

export default App;