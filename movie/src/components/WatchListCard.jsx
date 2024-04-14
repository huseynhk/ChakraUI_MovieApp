import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useGlobalContext } from "../contexts/GlobalContext";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";


const WatchListCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useGlobalContext();
  const { colorMode } = useColorMode();

  const handleRemoveClick = (event) => {
    event.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((movie) => movie.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"175px"}>
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={"250px"}
            minW={"175px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box >
          <Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={colorMode === "light" ? "green.500" : "cyan.300"} mt="4">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="5" >
            <StarIcon fontSize={"medium"} color={"orange.400"} />
            <Text textAlign={"center"} fontSize="medium" color={colorMode === "light" ? "green.500" : "cyan.300"}>
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "xs", md: "md" }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchListCard;
