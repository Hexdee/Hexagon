import { Box, Button, Divider, Flex, Image, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton/customButton";
import Admin from "../../assets/icons/Admin-icon.png";
import { useEffect, useState } from "react";
import { Spinner, toaster } from "evergreen-ui";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../context/User";
import { isConnected, amIAManufacturer } from "../../utils/hexagon";
import { useNavigate } from 'react-router-dom';

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isManufacturer, setIsManufacturer] = useState(false);
  const navigate = useNavigate();

  const api = `https://api.thenewsapi.com/v1/news/top?api_token=${process.env.REACT_APP_NEWS_API_KEY}&language=en&categories=health`

  const register = () => {
    if (isConnected()) {
      navigate('/manufacturer');
    } else {
      toaster.danger("You're not connected!");
    }
  }



  useEffect(() => {
    setIsSignedIn(isConnected())
    amIAManufacturer().then((res) => setIsManufacturer(res));
    setIsLoading(true);
    axios
      .get(
        api,
      )
      .then((res) => {
        console.log(res)
        setNews(res?.data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(news)

  return (
    <Box w="100%" bg="white" borderRadius="8px" p="20px">
      <SimpleGrid columns={2} alignItems="center" justifyItems="space-between" width="100%">
        <Text>Latest News</Text>
        <CustomButton bg="#F5F5F5" borderRadius="8px" onClick={() => setViewAll(!viewAll)}>
          <Text color="#3A3A3ABF">View All</Text>
        </CustomButton>
      </SimpleGrid>

      <Box mt="20px">
        <Divider mb="20px" />

        {isLoading ? <Spinner my="20px" /> :
          <>
            {news.splice(0, viewAll ? 10 : 3).map((res) => (
              <>
                <Flex justifyContent="space-evenly" fontSize="14px" mt="20px" key={res?.uuid}>
                  <Image src={res.image_url} w="70px" alt="news-img" objectFit="cover" />
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
        }
        {window.location.pathname != '/manufacturer/home' &&
          <Flex alignItems="center" justifyContent="space-between" bg="brand.blue" mt="
        20px" p="20px">
            {isManufacturer ?
              <Box color="white">
                <Text > You're a manufacturer</Text>
                <CustomButton bg="white" mt="20px" href="/manufacturer/home">
                  <Text color="brand.blue"> Go to Dashboard</Text>
                </CustomButton>
              </Box> :
              <Box color="white">
                <Text > Become an Admin</Text>
                <Text>Do you want to register as a manufacturer at Hexagon?</Text>
                <Tooltip hasArrow label={!isConnected() && 'Connect Wallet first!'} bg='#EE7D21' color="white" w="200px">
                  <Box>
                    <CustomButton bg="white" mt="20px" onClick={register}>
                      <Text color="brand.blue">REGISTER</Text>
                    </CustomButton>
                  </Box>
                </Tooltip>
              </Box>
            }
            <Box>
              <Image src={Admin} w="150px" alt="admin" />
            </Box>
          </Flex>
        }
      </Box >
    </Box >
  );
};

export default LatestNews;
