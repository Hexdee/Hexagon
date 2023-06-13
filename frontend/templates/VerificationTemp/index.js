import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import VerificationIcon from "../../assets/icons/verification-icon.png";
import CustomButton from "../../components/CustomButton/customButton";
import SuccessModal from "../../components/Modal/successModal";
import TextInput from "../../components/TextInputs/TextInput";
import LatestNews from "../LatestNews";
import { toaster } from "evergreen-ui";
import UserContext from "../../context/User";
import ErrorModal from "../../components/Modal/errorModal";

const VerificationTemp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isErrorIsOpen, onOpen: isErrorOnOpen, onClose: isErrorOnClose } = useDisclosure();
  const [code, setCode] = useState('');
  const user = useContext(UserContext);
  const [isValid, setIsValid] = useState(false);

  const bought = async () => {
    try {
      const res = await user.wallet.callMethod({ contractId: user.contractId, method: "bought", args: { code } });
    } catch (err) {
      console.log(err);
      // toaster.danger("Error occured!");
    }
  }

  const handleClick = async () => {
    try {
      const res = await user.wallet.viewMethod({ contractId: user.contractId, method: "is_authentic", args: { code } });
      setIsValid(res.is_valid);
      if (res.is_valid) {
        if (res.is_bougth == false) {
          onOpen();
        } else {
          //Duplicate
          isErrorOnOpen();
          //Open error modal
        }
      } else {
        //Invalid code
        isErrorOnOpen();
        //Open error modal
      }
    } catch (err) {
      toaster.danger("Error occured!");
      console.log(err);
    }
  }


  return (
    <Flex w="100%" display={{ base: 'block', lg: 'flex' }}>
      <Box w={{ base: '100%', lg: "70%" }}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          bg="brand.blue"
          alignItems="center"
          p="40px 20px"
          borderRadius="8px"
          textAlign={{ base: "center", lg: 'left' }}
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
          <Box ml={{ base: '0', lg: "40px" }}>
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

      <Box w={{ base: '100%', lg: "30%" }} ml={{ base: '0', lg: "20px" }}>
        <LatestNews />
      </Box>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message="Valid"
        onClick={bought}
        handleNoOnclick={() => onClose()}
      >
        <Text>
          This product is valid.
        </Text>
      </SuccessModal>
      <ErrorModal
        isOpen={isErrorIsOpen}
        onClose={isErrorOnClose}
        onClick={isErrorOnClose}
        message="Not valid"
        handleNoOnclick={() => isErrorOnClose()}
      >
        <Text>
          {isValid ? "This product is a duplicate" : "This product is not valid"}
        </Text>
      </ErrorModal>

    </Flex>
  );
};
export default VerificationTemp;
