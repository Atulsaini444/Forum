import React from 'react'
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { getDate } from '../../utils/getDate';
import { CommentsDataType, CommentsDataProps } from '../../utils/Interfaces';

const CommentsData = (props: CommentsDataProps ) => {
    const {commentsData,loading,handleCommentDelete} = props
    console.log("here is the comments data",commentsData)
  return (
    <>
    {commentsData &&
        commentsData.map((comment: CommentsDataType, index:number) => {
          return (
            <Box key={index} className="commentSection comments">
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
                        {getDate(comment?.updatedAt)}
                    </Text>
                  </Box>
                </Box>
                <Button
                  isLoading={loading.id === comment?.id && loading.isShow === true}
                  loadingText="Loading"
                  spinnerPlacement="end"
                  backgroundColor="purple.600"
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
        </>
  )
}

export default CommentsData