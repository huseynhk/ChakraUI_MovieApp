import { useState, useEffect } from "react";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useFirestore } from "../services/firestore";
import WatchListCard from "../components/WatchListCard";

const WatchList = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();
  const { getWatchlist } = useFirestore();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
          console.log(data, "data");
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          watchlist
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            watchlist is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"5"}
        >
          {watchlist?.map((item) => (
            <WatchListCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchList;
