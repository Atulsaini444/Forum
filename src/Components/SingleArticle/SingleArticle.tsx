import { Avatar, Box, Button, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { createStandaloneToast } from '@chakra-ui/react'
import { getToast } from '../../utils/getToast';
import {
  deleteComment,
  getComments,
  getSingleArticle,
  postComment,
} from "../../services/auth-service";
import { CommentSchema } from "../../utils/CommentSchema";
import "./singleArticle.scss";
import CommentsData from "../CommentsData/CommentsData";
import { getDate } from "../../utils/getDate";
import { ArticlesData, CommentsDataType } from "../../utils/Interfaces";

const SingleArticle = () => {
  const param = useParams();
  const { toast } = createStandaloneToast()
  const [loading, setLoading] = useState(false);
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);
  const [singleArticle, setSingleArticle] = useState<ArticlesData>();
  const [isDeleteCommentLoading, setIsDeleteCommentLoading] = useState({id: 0 , isShow: false});
  const [commentsData, setCommentsData] = useState<Array<CommentsDataType>>([]);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: CommentSchema,
    onSubmit: (values) => {
      setIsAddCommentLoading(true);
      postComment(param.slug, { comment: values })
        .then(() => {
          setIsAddCommentLoading(false);
          toast(getToast("Comment added successfully","success"));
          getComments(param.slug).then((response: Array<CommentsDataType>) => {
            setCommentsData(response);
          });
        })
        .catch((error) => {
          setIsAddCommentLoading(false);
          toast(getToast(error,"error"))
        });
    },
  });

  const handleCommentDelete = (id:number) => {
    setIsDeleteCommentLoading({id: id, isShow:true})
    deleteComment(param.slug,id).then(()=>{
      toast(getToast("Comment deleted successfully","success"));
      setIsDeleteCommentLoading({id: id, isShow:false})
      getComments(param.slug).then((response: Array<CommentsDataType>) => {
        setCommentsData(response);
      });
    }).catch((error) => {
      setIsDeleteCommentLoading({id: id, isShow:false})
      toast(getToast(error,"error"))
    })
  }

  useEffect(() => {
    setLoading(true);
    getSingleArticle(param.slug)
      .then((response: ArticlesData) => {
        setSingleArticle(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getComments(param.slug).then((response: Array<CommentsDataType>) => {
      setCommentsData(response);
    });
  }, []);

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
      ) : singleArticle && (
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
                    {getDate(singleArticle?.updatedAt)}
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
              {formik?.errors?.body && <Text color="red">{formik.errors.body}</Text>}
              <Button
                isLoading={isAddCommentLoading}
                loadingText="Loading"
                spinnerPlacement="end"
                backgroundColor="purple.600"
                color="white"
                type="submit"
                margin="20px 0"
              >
                Add Comment
              </Button>
            </form>
          </Box>
          <Box>
            <CommentsData commentsData={commentsData} loading={isDeleteCommentLoading} handleCommentDelete={handleCommentDelete} />
          </Box>
        </>
      )}
    </>
  );
};

export default SingleArticle;
