import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Avatar, Text } from '@chakra-ui/react';
import './Dashboard.scss'
import useFetch from '../../Hooks/useFetch';
const Dashboard = () => {
  const [offset, setOffset] = useState(0)
  const loader = useRef(null);
  const { loading, error, articlesData } = useFetch(offset)
  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((prev) => prev + 10)
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <>
      {articlesData && articlesData.map((article: any, index: number) => {
        return (
          <div key={index} className="mainContainer">
            <div className='usrnameFavouriteCountConatainer'>
              <div className='usernameAvatarConatainer'>
                <div>
                  <Avatar size='sm' name={article.author.username} src={article.author.image} />
                </div>
                <div>
                  {article.author.username}
                </div>
              </div>
              <div className='favouritesCount'>
                {article.favoritesCount}
              </div>
            </div>
            <div className='titleAndDescriptionConatainer'>
              <Text className="titleConatiner" fontSize="xl" color="gray.800" fontWeight="bold">
                {article.title}
              </Text>
              <Text className='questiondescription' color='gray.500' fontWeight="thin">
                {article.description}
              </Text>
            </div>
            <div className="articleFooter">
              <Text color='gray.500'>
                Read more...
              </Text>
              <div className='tagsContainer'>
                {article.tagList.map((tag: string, index: number) => {
                  return <Text className='singleTag' color='gray.500' key={index}>{tag}</Text>
                })}
              </div>
            </div>
          </div>
        )
      })}
      {loading && <div className='loaderWrapper'><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /></div>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </>
  )
}

export default Dashboard