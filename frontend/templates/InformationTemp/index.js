import { Box, Text } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton/customButton";

const InformationTemp = () => {
  return (
    <Box w="100%" bg="white" p="30px" borderRadius="8px">
      <Box
        w="80%"
        h="345px"
        bg="#F3F6FB"
        border="1px dashed #C4C4C4"
        mx="auto"
        my="60px"
      ></Box>

      <Box w="100%" textAlign="center">
        <CustomButton
          color="brand.white"
          bg="brand.blue"
          w="130px"
          mt="20px"
          mx="auto"
          href="/information/step-2"
        >
          Skip Scan
        </CustomButton>
      </Box>

      <Box mt="50px">
        <Text fontWeight="600">How to scan on your computer;</Text>
        <Text mt="10px">
          1. After purchasing a particular product at the nearest pharmacy,
        </Text>
        <Text mt="10px">
          {" "}
          2. Kindly check round the carton medicine for the brand name written
          on it,
        </Text>
        <Text mt="10px">
          {" "}
          3. Place the carton with the brand name written on it to face the
          camera,
        </Text>
        <Text mt="10px">
          {" "}
          4. Patiently wait while the computer scans through the brand’s name.
        </Text>
      </Box>
    </Box>
  );
};

export default InformationTemp;
