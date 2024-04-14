import React from "react";
import {
  Box,
  Container,
  Flex,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { HamburgerIcon, SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { useGlobalContext } from "../contexts/GlobalContext";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useGlobalContext();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("errr", error);
    }
  };

  return (
    <Box py={4} mb={2}>
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to={ROUTER.Home}>
            <Box
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={colorMode === "light" ? "red.500" : "cyan.300"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              Chakra
            </Box>
          </Link>

          {/* Desktop */}
          <Flex
            gap={"6"}
            items={"center"}
            display={{ base: "none", md: "flex" }}
            height={"100%"}
          >
            <Box onClick={toggleColorMode} className="pointer">
              {colorMode === "light" ? (
                <SunIcon boxSize={6} />
              ) : (
                <MoonIcon boxSize={6} />
              )}
            </Box>
            <Link to={ROUTER.Home}>Home</Link>
            <Link to={ROUTER.Movies}>Movies</Link>
            <Link to={ROUTER.Shows}>TV Shows</Link>
            <Link to={ROUTER.Search}>
              <SearchIcon fontSize={"xl"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link to={ROUTER.WatchhList}>
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}

            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.700"}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to={ROUTER.Search}>
              <SearchIcon fontSize={"xl"} />
            </Link>
            <Box onClick={toggleColorMode} className="pointer">
              {colorMode === "light" ? (
                <SunIcon boxSize={6} />
              ) : (
                <MoonIcon boxSize={6} />
              )}
            </Box>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={colorMode === "light" ? "gray.300" : "black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar bg="red.500" size={"sm"} name={user?.email} />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.700"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to={ROUTER.Home}>Home</Link>
                    <Link to={ROUTER.Movies}>Movies</Link>
                    <Link to={ROUTER.Shows}>TV Shows</Link>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
