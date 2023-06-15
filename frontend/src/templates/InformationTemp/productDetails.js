import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "evergreen-ui";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/User";
import { getProduct } from "../../utils/hexagon";
import LatestNews from "../LatestNews";
import RelatedDrugs from "../LatestNews/relatedDrugs";

const ProductDetailsTemp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [product, setProduct] = useState();

  const getProductDetails = async () => {
    try {
      const product = await getProduct(id);
      product.image = `https://${product.url}.ipfs.w3s.link/image.png`;
      product.file = `https://${product.url}.ipfs.w3s.link/file.pdf`;
      setProduct(product);
    } catch (err) {
      navigate("/information");
      console.log(err);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Flex w="100%" display={{ base: 'block', lg: 'flex' }}>
      <Box w={{ base: "100%", lg: "70%" }}>
        <Box bg="brand.white" p="40px" color="#3A3A3ABF">
          <Text color="brand.dark" fontWeight="600" fontSize="20px">
            Name: {product?.name}
          </Text>
          <Image src={product?.image} m="32px auto" max-width="90%" />
          <Text mt="10px">
            {product?.description}
          </Text>
          <Text mt="30px" color="brand.blue" >
            <a href={product?.file}>Read more</a>
          </Text>
        </Box>
      </Box>

      <Box w={{ base: '100%', lg: "30%" }} ml={{ base: '0', lg: "20px" }}>
        <LatestNews />
      </Box>
    </Flex>
  );
};

export default ProductDetailsTemp;
