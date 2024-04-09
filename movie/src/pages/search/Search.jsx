import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import Cards from "../../components/Cards";
import PaginationComponent from "../../components/PaginationComponent";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Search = () => {
  const {
    activePage,
    setActivePage,
    totalPages,
    setTotalPages,
    isLoading,
    setIsLoading,
  } = useGlobalContext();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res, "res");
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };
  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search movies, tv shows..."
          _placeholder={{ color: "red.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={"3"}
        mt="7"
      >
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, index) =>
            isLoading ? (
              <Skeleton height={300} key={index} />
            ) : (
              <Cards key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>

      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
