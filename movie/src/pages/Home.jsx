import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Grid,
  Flex,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import Cards from "../components/Cards";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} my={"7"} gap={"5"}>
        <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>

        <Flex
          alignItems={"center"}
          gap={"5"}
          border={"2px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            borderRadius={"20px"}
            py="1"
            px="3"
            bg={`${timeWindow === "day" ? "teal.700" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            borderRadius={"20px"}
            py="1"
            px="3"
            bg={`${timeWindow === "week" ? "teal.700" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={"5"}
      >
        {data &&
          data?.map((item, index) =>
            loading ? (
              <Skeleton height={300} key={index} />
            ) : (
              <Cards key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
