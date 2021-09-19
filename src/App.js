import React, { useState, useMemo } from 'react';
import PostList from './components/PostList';
import "./styles/App.css"
import PostForm from './components/PostForm';
import MySelect from './components/ui/select/MySelect';
import MyInput from './components/ui/input/MyInput';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript", body: "Description" },
        { id: 2, title: "Python", body: "Description" },
    ])

    const [selectedSort, setSelectedSort] = useState("")
    const [searchQuery, setSeacrhQuery] = useState("")

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortedPosts = useMemo(() => {
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }, [selectedSort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <div>
                <MyInput
                    onChange={e => setSeacrhQuery(e.target.value)}
                    value={searchQuery}
                    placeholder="Поиск..."
                />
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
            {sortedAndSearchedPosts.length
                ?
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"} />
                :
                <h1 style={{ textAlign: "center" }}>
                    Посты не найдены!
                </h1>
            }

        </div>
    );
}

export default App;