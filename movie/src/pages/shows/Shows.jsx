import React from "react";
import { Container, Heading } from "@chakra-ui/react";

const Shows = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
        tv shows
      </Heading>
    </Container>
  );
};

export default Shows;