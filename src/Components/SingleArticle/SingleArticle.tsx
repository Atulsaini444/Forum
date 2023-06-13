import { Avatar, Box, Button, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  getComments,
  getSingleArticle,
  postComment,
} from "../../services/auth-service";
import { CommentSchema } from "../../utils/CommentSchema";
import { useAppStore } from "../../zustand/store";
import "./singleArticle.scss";

const SingleArticle = () => {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);
  const [isDeleteCommentLoading, setIsDeleteCommentLoading] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: CommentSchema,
    onSubmit: (values) => {
      setIsAddCommentLoading(true);
      postComment(param.slug, { comment: values })
        .then((res) => {
          setIsAddCommentLoading(false);
          getComments(param.slug).then((res: any) => {
            setCommentsData(res?.data?.comments);
          });
        })
        .catch(() => {
          setIsAddCommentLoading(false);
        });
    },
  });

  const handleCommentDelete = (id:number) => {
    setIsDeleteCommentLoading(true)
    deleteComment(param.slug,id).then((res)=>{
      setIsDeleteCommentLoading(false)
      getComments(param.slug).then((res: any) => {
        setCommentsData(res?.data?.comments);
      });
    }).catch(() => {
      setIsDeleteCommentLoading(false)
    })
  }

  const singleArticle = useAppStore((state: any) => state.singleArticle);
  const setSingleArticle = useAppStore((state: any) => state.setSingleArticle);

  useEffect(() => {
    setLoading(true);
    getSingleArticle(param.slug)
      .then((res: any) => {
        setSingleArticle(res?.data?.article);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in fetching single article", err);
      });
  }, []);

  useEffect(() => {
    getComments(param.slug).then((res: any) => {
      setCommentsData(res?.data?.comments);
    });
  }, []);

  if (!singleArticle) {
    return null;
  }

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          <Box className="headingWrapper">
            <Text
              className="headingTitle"
              fontSize={{ base: "24px", md: "xl", lg: "4xl" }}
              as="b"
            >
              {singleArticle?.title}
            </Text>
            <Box className="headingUserInformation ">
              <Box className="usernameAvatarConatainerSingle">
                <Box>
                  <Avatar size="sm" src={singleArticle?.author?.image} />
                </Box>
                <Box className="userName">
                  <Text fontSize="sm" color="white">
                    {singleArticle?.author?.username}
                  </Text>
                  <Text fontSize="xs" color="white">
                    {new Date(singleArticle?.updatedAt).toLocaleString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Text>
                </Box>
              </Box>
              <Box className="favouriteCounterSingleArticle">
                ❤️Favourite Articles({singleArticle.favoritesCount})
              </Box>
            </Box>
          </Box>
          <Box className="bodyWrapper">
            <Text fontSize={{ base: "16px", md: "xl", lg: "xl" }}>
              {singleArticle.body}
            </Text>
          </Box>
          <Box className="commentSection">
            <form onSubmit={formik.handleSubmit} className="commentForm">
              <Textarea
                className="textArea"
                placeholder="Add your comment here"
                name="body"
                onChange={formik.handleChange}
                value={formik.values.body}
              />
              <Button
                isLoading={isAddCommentLoading}
                loadingText="Loading"
                spinnerPlacement="end"
                backgroundColor="purple.400"
                color="white"
                type="submit"
                margin="20px 0"
              >
                Add Comment
              </Button>
            </form>
          </Box>
          <Box>
            {commentsData.length > 0 &&
              commentsData.map((comment: any) => {
                return (
                  <Box className="commentSection comments">
                    <Box>{comment.body}</Box>
                    <Box className="commentUserWrapper">
                      <Box className="usernameAvatarConatainerSingle">
                        <Box>
                          <Avatar size="sm" src={comment?.author?.image} />
                        </Box>
                        <Box className="userName">
                          <Text fontSize="sm" color="white">
                            {comment?.author?.username}
                          </Text>
                          <Text fontSize="xs" color="white">
                            {new Date(comment?.updatedAt).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </Text>
                        </Box>
                      </Box>
                      <Button
                        isLoading={isDeleteCommentLoading}
                        loadingText="Loading"
                        spinnerPlacement="end"
                        backgroundColor="purple.400"
                        onClick={()=>handleCommentDelete(comment.id)}
                        color="white"
                        type="submit"
                        margin="20px 0"
                      >
                        Delete Comment
                      </Button>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </>
      )}
    </>
  );
};

export default SingleArticle;
