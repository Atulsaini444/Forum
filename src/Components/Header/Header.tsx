import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsFillPencilFill, BsPencilSquare } from "react-icons/bs";
import { useAppStore } from "../../zustand/store";
import jwt_decode from "jwt-decode";

const Header = () => {
  const [decoded, setDecoded] = useState<any>();
  const token = useAppStore((state: any) => state.token);
  const setToken = useAppStore((state: any) => state.setToken);
  const userData = useAppStore((state: any) => state.userData);
  const setUser = useAppStore((state: any) => state.setUser);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setDecoded(decoded);
    }
  }, [token]);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    setUser({});
    localStorage.clear();
    setToken(null);
    toast({
      title: "Logged out successfully",
      status: "success",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });
    navigate("/login");
  };

  const handleProfileButton = () => {
    navigate(`/${decoded.username}`);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleCreateArticle = () => {
    navigate("/create-article");
  };

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <div className="headerWrapper">
      <div className="logoWrapper" onClick={handleLogo}>
        <Text as="b" fontSize="2xl" fontFamily="monospace" color="purple.400">
          FORUM
        </Text>
      </div>
      <div className="headerButtonsWrapper">
        {token ? (
          <>
            <Button
              color="GrayText"
              variant="unstyled"
              onClick={handleCreateArticle}
              marginRight="5"
              display="flex"
            >
              <BsFillPencilFill />
              <Text className="headerButtonText" marginLeft="4px">
                Create Article
              </Text>
            </Button>
            <Button
              color="GrayText"
              variant="unstyled"
              onClick={handleEditProfile}
              marginRight="5"
              display="flex"
            >
              <BsPencilSquare />
              <Text className="headerButtonText" marginLeft="4px">
                Edit Profile
              </Text>
            </Button>
            <Box>
              <Popover direction="ltr">
                <PopoverTrigger>
                  <Avatar
                    className="avatarClass"
                    size="sm"
                    src={userData.image}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent maxWidth="100px" cursor="pointer">
                    <PopoverBody onClick={handleProfileButton}>
                      Profile
                    </PopoverBody>
                    <PopoverBody onClick={handleLogOut}>Logout</PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Box>
          </>
        ) : (
          <Button
            variant="solid"
            colorScheme="messenger"
            onClick={handleSignInClick}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
