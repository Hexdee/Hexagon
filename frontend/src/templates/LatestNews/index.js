import { Box, Divider, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton/customButton";
import Admin from "../../assets/icons/Admin-icon.png";
import { useEffect, useState } from "react";
import { Spinner, toaster } from "evergreen-ui";
import axios from "axios";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = `https://newsapi.org/v2/top-headlines?q=health&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        api,
      )
      .then((res) => {
        setNews(res?.data?.articles);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box w="100%" bg="white" borderRadius="8px" p="20px">
      <SimpleGrid columns={2} alignItems="center" justifyItems="space-between" width="100%">
        <Text>Latest News</Text>
        <CustomButton bg="#F5F5F5" borderRadius="8px">
          <Text color="#3A3A3ABF">View All</Text>
        </CustomButton>
      </SimpleGrid>

      <Box mt="20px">
        <Divider />

      {/* {isLoading ? <Spinner /> :
      <>
        {news.splice(0, 10).map((res, index) => (
          <>
            <Flex justifyContent="space-evenly" fontSize="14px" mt="20px" key={index}>
                <Image src={res.urlToImage} w="70px" alt="news-img" objectFit="cover" />
                <Box ml="20px">
                  <Text>{res.title}</Text>
                  <a href={res.url} target="_blank" rel="noreferrer">
                  <Text fontSize="12px" color="brand.blue" mt="5px">Read more...</Text>
                </a>
                </Box>
            </Flex>
            <Divider />
          </>
        ))}
      </>
      } */}

        <Flex alignItems="center" justifyContent="space-between" bg="brand.blue" mt="
        20px" p="20px">
            <Box color="white">
                <Text>Become an Admin</Text>
                <Text>Do you want to register as a manufacturer at BONAFIDE?</Text>
                <CustomButton bg="white" mt="20px" href="/manufacturer">
                    <Text color="brand.blue">REGISTER</Text>
                </CustomButton>
            </Box>
            <Box>
                <Image src={Admin} w="150px" alt="admin" />
            </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LatestNews;
