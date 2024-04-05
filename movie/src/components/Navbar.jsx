import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/router";

const Navbar = () => {
  return (
    <Box py={4} mb={2}>
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to={ROUTER.Home}>
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              Chakra
            </Box>
          </Link>

         {/* Desktop */}
          <Flex gap={'4'} items={'center'}  >
            <Link to={ROUTER.Home}>Home</Link>
            <Link to={ROUTER.Movies}>Movies</Link>
            <Link to={ROUTER.Shows}>TV Shows</Link>
            <Link to={ROUTER.Search}>Search</Link>

          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
