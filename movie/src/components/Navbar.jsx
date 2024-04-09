import React from "react";
import {
  Box,
  Container,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { HamburgerIcon, SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            gap={"4"}
            items={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Box onClick={toggleColorMode} className="pointer">
              {colorMode === "light" ? (
                <MoonIcon boxSize={6} />
              ) : (
                <SunIcon boxSize={6} />
              )}
            </Box>
            <Link to={ROUTER.Home}>Home</Link>
            <Link to={ROUTER.Movies}>Movies</Link>
            <Link to={ROUTER.Shows}>TV Shows</Link>
            <Link to={ROUTER.Search}>Search</Link>
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
                <MoonIcon boxSize={6} />
              ) : (
                <SunIcon boxSize={6} />
              )}
            </Box>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={colorMode === "light" ? "gray.300" : "black"}>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>

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
