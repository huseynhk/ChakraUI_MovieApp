import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor } from "../utils/helpers";
import { imagePath, imagePathOriginal, fetchDetails } from "../services/api";

const DetailsPage = () => {
  const { type, id } = useParams();
  const toast = useToast();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails(type, id)
      .then((res) => {
        console.log("res", res);
        setDetails(res);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  }, [type, id]);

  if (loading) {
    return (
      <Flex justify={"center"} align={"center"} height={"100vh"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.80)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "70vh" }}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
              alt={details?.title || details?.name}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {details?.title || details?.name}
                <Text as="span" fontWeight={"normal"} color={"gray.300"} ml={3}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={4} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"sky.300"} />
                  <Text as="span" fontWeight={"sm"} color={"gray.300"} ml={3}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={"4"}>
                  <CircularProgress
                    value={ratingToPercentage(details?.vote_average)}
                    bg={"gray.800"}
                    borderRadius={"full"}
                    p={"0.5"}
                    size={"70px"}
                    color={resolveRatingColor(details?.vote_average)}
                    thickness={"6px"}
                  >
                    <CircularProgressLabel fontSize={"lg"}>
                      {ratingToPercentage(details?.vote_average)}{" "}
                      <Box as="span" fontSize={"10px"}>
                        %
                      </Box>
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
