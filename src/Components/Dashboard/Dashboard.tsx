import React, { useEffect, useRef, useState, useCallback } from "react";
import { ColorRing, Vortex } from "react-loader-spinner";
import { Avatar, Text, useToast } from "@chakra-ui/react";
import "./Dashboard.scss";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../ScrollToTop/ScrollToTopButton";
import axios from "axios";
import { useAppStore } from "../../zustand/store";
const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const [loaderLoading, setLoaderLoading] = useState({slug: "", isShow: false});
  const loader = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const setUpdateFavourite = useAppStore(
    (state: any) => state.setUpdateFavourite
  );
  const { loading, error, articlesData } = useFetch(offset);
  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((prev) => prev + 10);
    }
  }, []);
  const handleTitleClick = (slug: string) => {
    navigate(`/single-article/${slug}`);
  };

  const handleUserName = (username: string) => {
    navigate(`/${username}`);
  };

  const handleLikeClick = async (favourite: boolean, slug: string) => {

    setLoaderLoading({slug: slug, isShow:true});
    if (favourite) {
      const res = await axios
        .delete(`https://api.realworld.io/api/articles/${slug}/favorite`)
        .then(() => {
          toast({
            title: "UnLiked successfully",
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: err,
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        });
      setUpdateFavourite(slug, false);
      setLoaderLoading({slug: "", isShow:false});
    } else {
      const res = await axios
        .post(`https://api.realworld.io/api/articles/${slug}/favorite`)
        .then(() => {
          toast({
            title: "Liked successfully",
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: err,
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        });
      setUpdateFavourite(slug, true);
      setLoaderLoading({slug: "", isShow:false});
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <>
      <Text
        fontSize={{ base: "24px", md: "2xl", lg: "4xl" }}
        color="GrayText"
        className="articlesHeading"
      >
        Global Feed
      </Text>
      <div className="mainContainer">
        {articlesData &&
          articlesData.map((article: any, index: number) => {
            return (
              <div key={index} className="container">
                <div className="usrnameFavouriteCountConatainer">
                  <div className="usernameAvatarConatainer">
                    <div>
                      <Avatar size="sm" src={article.author.image} />
                    </div>
                    <div
                      className="userName"
                      onClick={() => handleUserName(article.author.username)}
                    >
                      {article.author.username}
                    </div>
                  </div>
                  <div
                    className={`favouritesCount ${
                      article.favorited && "favorited"
                    }`}
                    onClick={() =>
                      handleLikeClick(article.favorited, article.slug)
                    }
                  >
                    {loaderLoading.slug===article.slug && loaderLoading.isShow ? (
                      <Vortex
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={[
                          "red",
                          "green",
                          "blue",
                          "yellow",
                          "orange",
                          "purple",
                        ]}
                      />
                      ) : (
                      <Text color="white">❤️{article.favoritesCount}</Text>
                    )}
                  </div>
                </div>
                <div className="titleAndDescriptionConatainer">
                  <Text
                    onClick={() => handleTitleClick(article.slug)}
                    className="titleConatiner"
                    fontSize="xl"
                    color="white"
                    fontWeight="bold"
                  >
                    {article.title}
                  </Text>
                  <Text
                    className="questiondescription"
                    color="#c9c9c9"
                    fontWeight="thin"
                  >
                    {article.description}
                  </Text>
                </div>
                <div className="articleFooter">
                  <div className="tagsContainer">
                    {article.tagList.map((tag: string, index: number) => {
                      return (
                        <Text className="singleTag" color="#419fff" key={index}>
                          #{tag}
                        </Text>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        <ScrollToTopButton />
      </div>
      {loading && (
        <div className="loaderWrapper">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </>
  );
};

export default Dashboard;
