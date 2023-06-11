import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import VerificationIcon from "../../assets/icons/verification-icon.png";
import CustomButton from "../../components/CustomButton/customButton";
import SuccessModal from "../../components/Modal/successModal";
import TextInput from "../../components/TextInputs/TextInput";
import LatestNews from "../LatestNews";
import { toaster } from "evergreen-ui";

const VerificationTemp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState('');

  const handleClick = () => {
    if (code === "62991117606") {
      onOpen();
    } else {
      toaster.danger("Error occured, code not valid!");
    }
  }


  return (
    <Flex w="100%">
      <Box w="70%">
        <SimpleGrid
          columns={2}
          bg="brand.blue"
          alignItems="center"
          p="40px 20px"
          borderRadius="8px"
        >
          <Box>
            <Text color="brand.white" fontSize="28px">
              Confirm authenticity of your drugs
            </Text>
            <Text color="brand.lightGrey">
              This is established in identifying authentic drugs with emphasis
              on identifying the production and manufacturing dates using an
              interactive method.
            </Text>
          </Box>
          <Box ml="40px">
            <Image src={VerificationIcon} alt="dahsboard-home-icon" />
          </Box>
        </SimpleGrid>

        <Box bg="brand.white" p="40px" mt="40px" borderRadius="8px">
          <Text fontSize="20px">Enter product ID to verify</Text>
          <Text>Please follow the steps below to authenticate your drugs</Text>
          <TextInput placeholder="Enter unique code" value={code} onChange={(e) => setCode(e.target.value)} />

          <CustomButton
            onClick={handleClick}
            color="brand.white"
            bg="brand.blue"
            w="130px"
            mt="20px"
            disabled={!code}
          >
            Verify
          </CustomButton>
        </Box>

        <Box mt="50px" bg="brand.white" p="40px" color="#3A3A3ABF">
          <Text color="brand.dark" fontSize="20px">
            How to get a product ID number;
          </Text>
          <Text mt="10px">
            1. After purchasing a particular product at the nearest pharmacy,
          </Text>
          <Text mt="10px">
            2. Kindly check round the product for a description “scratch pin
            here”,
          </Text>
          <Text mt="10px">
            3. Gently scratch the panel, to know the unique code assigned to
            each product,
          </Text>
          <Text mt="10px">
            4. Input the unique code as seen exactly on the product inside the
            box above to verify its authenticity.
          </Text>
        </Box>
      </Box>

      <Box w="30%" ml="20px">
        <LatestNews />
      </Box>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message="Authetication Verified"
        handleNoOnclick={() => onClose()}
      >
        <Text>
          This product is valid.
        </Text>
      <Box textAlign="left" mt="20px">
      <Text fontWeight="600">Product Info</Text>
        <Text>Product name: ASPIRIN</Text>
        <Text>Product ID: 62991117606</Text>
        <Text>Manufacturer: Bayer</Text>
        <Text>Shelf life: 2 years</Text>
        <Text>Date of first authorisation/renewal of the authorisation: 07/10/2016</Text>
      </Box>
      </SuccessModal>
    </Flex>
  );
};

export default VerificationTemp;
