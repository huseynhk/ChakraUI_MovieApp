import React from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import Cards from "../../components/Cards";
import PaginationComponent from "../../components/PaginationComponent";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Movies = () => {
  const {
    activePage,
    setActivePage,
    totalPages,
    setTotalPages,
    sortBy,
    setSortBy,
    isLoading,
    setIsLoading,
  } = useGlobalContext();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);
  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          discovermovies
        </Heading>

        <Select
          w={"120px"}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={"3"}
      >
        {movies &&
          movies?.map((item, index) =>
            isLoading ? (
              <Skeleton height={300} key={index} />
            ) : (
              <Cards key={item?.id} item={item} type={"movie"} />
            )
          )}
      </Grid>

      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
