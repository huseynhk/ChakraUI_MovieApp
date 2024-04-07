import { Image, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";
import { ROUTER } from "../constant/router";

const Cards = ({ item, type }) => {
  return (
    <Link>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)x", md: "scale(1.08)" },
          transition: "transform .5s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          pb="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"25%"}
          bg="rgba(0,0,0,0.9)"
          opacity={"0"}
          transition={"opacity .7s ease-in-out"}
        >
          <Text textAlign={"center"} mt="1" fontSize='20px' color={"blue.200"} >{item?.title || item?.name}</Text>
          <Text textAlign={"center"} my="2" fontSize='xl' color={"green.200"}>
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mb="2" color={"cyan.200"}>
            <StarIcon fontSize={"medium"} />
            <Text>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default Cards;
