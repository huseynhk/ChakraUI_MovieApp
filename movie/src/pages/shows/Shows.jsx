import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTvSeries } from "../../services/api";
import Cards from "../../components/Cards";
import PaginationComponent from "../../components/PaginationComponent";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Shows = () => {
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
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchTvSeries(activePage, sortBy)
      .then((res) => {
        console.log(res, "res");
        setShows(res?.results);
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
          Discover TV Shows
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
          md: "repeat(4, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={"3"}
      >
        {shows &&
          shows?.map((item, index) =>
            isLoading ? (
              <Skeleton height={300} key={index} />
            ) : (
              <Cards key={item?.id} item={item} type={"tv"} />
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

export default Shows;
