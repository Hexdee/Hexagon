import { Box, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton/customButton";
import TextInput from "../../components/TextInputs/TextInput";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import UserContext from "../../context/User";
import { toaster } from "evergreen-ui";

const StepTwoTemp = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleClick = async () => {
    try {
      await user.wallet.viewMethod({ contractId: user.contractId, method: "get_product", args: { name: code } })
      navigate(`/information/product-details/${code}`);
    } catch (err) {
      toaster.danger("Error occured, product name not valid!");
      console.log(err);
    }
  }
  return (
    <Box w="100%" bg="white" p="30px" borderRadius="8px">
      <Box>
        <Text fontWeight="600">Get information about your drugs</Text>
        <Text mt="10px">
          To get started, kindly enter the name of the drug and follow the
          steps below.
        </Text>
        <TextInput placeholder="Enter product code" value={code} onChange={(e) => setCode(e.target.value)} />
        <CustomButton
          color="brand.white"
          bg="brand.blue"
          w="130px"
          mt="20px"
          mx="auto"
          onClick={handleClick}
          disabled={!code}
        >
          Get Info
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
