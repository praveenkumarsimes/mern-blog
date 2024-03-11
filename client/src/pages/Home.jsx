import React from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
// import NewsSection from '../components-new/NewsItems';
import CarouselSection from '../components-new/Carousel';
import customFetch from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);

    // Step 1: Group posts by category
    const groupedPosts = posts?.reduce((acc, post) => {
      // If the category is not yet a key in the accumulator, add it
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      // Push the current post to its category array
      acc[post.category].push(post);
      return acc;
    }, {});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await customFetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <CarouselSection/>
      <div className='flex flex-col gap-6 p-8 px-3 max-w-6xl mx-auto '>
        <h3 className='text-3xl font-bold lg:text-4xl text-white dark:text-blue-700'>Welcome to </h3>
        <h1 className='text-3xl font-bold lg:text-6xl light:text-black-900 dark:text-yellow-400'> THAI MEERA TRUST</h1>
        <p className='light:text-black-900 dark:text-black text-2x1'>
        Title: <br /> 
        Thai Meera Trust: Illuminating Lives Through Compassion and Care  <br></br>
        Empowering Women and Widows: A Beacon of Hope in Acts of Compassion    <br></br>
        Empowering Women and Widows: A Beacon of Hope in Acts of Compassion  </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', backgroundColor: '#f0f0f0' }}>
  <marquee behavior="scroll" scrollamount="9" direction="left" style={{ fontSize: '16px', color: '#007bff', fontWeight: 'bold' }}>
    Ungalai Anbudan Varaverpahu Thaii Meera Trust
  </marquee>
</div>
      </div>
      
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            
            {Object.entries(groupedPosts).map(([category, posts]) => (
        <React.Fragment key={category}>
          <h2 className='text-2xl font-semibold text-center text-black'>{category}</h2>
          <div className='flex flex-wrap gap-4'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </React.Fragment>
      ))}
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>

      {/* <h2 className='text-2xl font-semibold text-center'>Trending Posts</h2>
      <NewsSection/> */}
    </div>
  );
}
