import React, { useEffect, useRef, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/ui/button/MyButton';
import Loader from '../components/ui/loader/Loader';
import MyModal from '../components/ui/modal/MyModal';
import Pagination from '../components/ui/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import "../styles/App.css";
import { useObserver } from "../hooks/useObserver";
import { getPageCount } from '../utils/pages';
import MySelect from '../components/ui/select/MySelect';

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: "", query: "" })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts()
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    return (
        <div className="App">
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
            <MySelect
                value={limit}
                onChange={v => setLimit(v)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать все' },
                ]}
            />
            {postError &&
                <h1>Произошла ошибка &{postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"} />
            <div ref={lastElement} style={{ height: 20, background: 'red' }} />
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;