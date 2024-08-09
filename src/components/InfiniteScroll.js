import React, { useCallback, useEffect, useState } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        const data = await res.json();

        setItems((prev) => [...prev, ...data]);

        if (data.length < 0) {
            setHasMore(false);
        }

        setPage((prevPage) => prevPage + 1);

    }, [page, hasMore]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleScroll = useCallback(() => {

        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 200
        ) {
            fetchData();
        }

    }, [fetchData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (

        <div className='container'>

            <h1>Infinite Scroll</h1>

            <ul>

                {items.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}

            </ul>

            {hasMore && <h3>Loading more items...</h3>}
            {!hasMore && <h3>No more items to load.</h3>}

        </div>

    )

}

export default InfiniteScroll;