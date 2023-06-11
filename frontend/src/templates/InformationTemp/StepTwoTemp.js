import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/customButton";
import TextInput from "../../components/TextInputs/TextInput";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

const StepTwoTemp = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (code === "B01AC06") {
      navigate('/information/product-details');
    } else {
      toaster.danger("Error occured, code not valid!");
    }
  }
  return (
    <Box w="100%" bg="white" p="30px" borderRadius="8px">
      <Box>
        <Text fontWeight="600">Get information about your drugs</Text>
        <Text mt="10px">
          To get started, kindly enter the brand name of the drug and follow the
          steps below.
        </Text>
        <TextInput placeholder="Enter unique code" value={code} onChange={(e) => setCode(e.target.value)} />
        <CustomButton
          color="brand.white"
          bg="brand.blue"
          w="130px"
          mt="20px"
          mx="auto"
          onClick={handleClick}
          disabled={!code}
        >
          Learn more
        </CustomButton>

        <Box mt="100px">
          <Text fontWeight="600">
            How to get a product ID number;
          </Text>
          <Text mt="10px">
            1. After purchasing a particular product at the nearest pharmacy,
          </Text>
          <Text mt="10px">
            2. Kindly check round the carton medicine for the brand name written
            on it
          </Text>
          <Text mt="10px">
            3. Input the brand name as seen exactly on the carton inside the box
            above to get information about it.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default StepTwoTemp;
