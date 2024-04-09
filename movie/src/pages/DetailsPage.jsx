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
import {
  ratingToPercentage,
  resolveRatingColor,
  minutesTohours,
} from "../utils/helpers";
import VideoComponent from "../components/VideoComponent";
import {
  imagePath,
  imagePathOriginal,
  fetchDetails,
  fetchCredits,
  fetchVideos,
} from "../services/api";
import { useColorMode } from "@chakra-ui/react";

const DetailsPage = () => {
  const { type, id } = useParams();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);
        // console.log(
        //   "detailsData, creditsData, videosData",
        //   detailsData,
        //   creditsData,
        //   videosData
        // );

        // Set details
        setDetails(detailsData);

        // Set cast
        setCast(creditsData?.cast?.slice(0, 15));

        // Set video/s
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        background={`linear-gradient(rgba(0,0,0,${
          colorMode === "dark" ? 0.8 : 0.4
        }), rgba(0,0,0,${
          colorMode === "dark" ? 0.8 : 0.4
        })), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "75vh" }}
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
              <Heading fontSize={"3xl"} color={colorMode === "light" ? "gray.300" : "cyan.300"}>
                <Text  as="span" >
                  {details?.title || details?.name}
                </Text>

                <Text
                  as="span"
                  fontWeight={"normal"}
                  
                  ml={3}
                >
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={4} mt={1} mb={5} color={colorMode === "light" ? "gray.300" : "cyan.300"}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2}  />
                  <Text as="span" fontWeight={"sm"}  ml={3}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                  {type === "movie" && (
                    <>
                      <Flex alignItems={"center"}>
                        <TimeIcon mx="2" color={"orange.400"} />
                        <Text fontSize={"sm"}>
                          {minutesTohours(details?.runtime)}
                        </Text>
                      </Flex>
                    </>
                  )}
                </Flex>
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
                  <CircularProgressLabel fontSize={"lg"} color={"white"}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text
                  textTransform={"capitalize"}
                  display={{ base: "none", md: "initial" }}
                  color={colorMode === "light" ? "white" : "green.300"}

                >
                  user score
                </Text>
                {isInWatchlist ? (
                  <Button
                    display={"none"}
                    colorScheme="green"
                    variant={"outline"}
                    textTransform={"capitalize"}
                    leftIcon={<CheckCircleIcon />}
                    onClick={() => console.log("click")}
                  >
                    in watchlist
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    variant={"outline"}
                    textTransform={"capitalize"}
                    leftIcon={<SmallAddIcon />}
                    onClick={() => console.log("click")}
                  >
                    add to watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my="5"
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"} color={colorMode === "light" ? "gray.300" : "cyan.300"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"} color={colorMode === "light" ? "gray.300" : "cyan.300"}>
                {details?.overview}
              </Text>
                    
              <Flex mt="6" gap="2" >
                {details?.genres?.map((genre) => (
                  <Badge
                    key={genre?.id}
                    color={colorMode === "light" ? "red.700" : "cyan.300"}
                    bg={colorMode === "light" ? "red.200" : "gray.800"}
                    borderRadius={"3"}
                    px="2"
                    py="1"
                  >
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW={"container.xl"} pb="10">
        <Heading as="h2" fontSize={"lg"} textTransform={"uppercase"} mt="8">
          cast
        </Heading>
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"3"}>
          {cast?.length === 0 && <Text>No cast found</Text>}
          {cast &&
            cast?.map((item) => (
              <Box key={item?.id} minW={"250px"}>
                <Image
                  src={`${imagePath}/${item?.profile_path}`}
                  w={"100%"}
                  height={"250px"}
                  objectFit={"cover"}
                  borderRadius={"lg"}
                />
              </Box>
            ))}
        </Flex>

        <Heading
          as="h2"
          fontSize={"md"}
          textTransform={"uppercase"}
          mt="10"
          mb="5"
        >
          Videos
        </Heading>
        <VideoComponent id={video?.key} />
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
          {videos &&
            videos?.map((item) => (
              <Box key={item?.id} minW={"300px"}>
                <VideoComponent id={item?.key} small />
                <Text fontSize={"md"} fontWeight={"bold"} m="2" noOfLines={2}>
                  {item?.name}{" "}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
