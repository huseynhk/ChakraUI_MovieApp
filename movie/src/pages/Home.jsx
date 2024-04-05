import React, { useEffect, useState } from "react";
import { Container, Heading, Grid, Image } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import { imagePath } from "../services/api";
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

  console.log(data, "data");

  return (
    <Container maxW={"container.xl"}>
      <Heading as={"h2"} fontSize={"md"} textTransform={"uppercase"}>
        Trending
      </Heading>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={"6"}
      >
        {data &&
          data.map((item) => (
            <Image key={item.id} src={`${imagePath}/${item.poster_path}`} />
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
