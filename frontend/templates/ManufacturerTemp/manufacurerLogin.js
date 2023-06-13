import { Box, Text } from "@chakra-ui/react";
import { toaster } from "evergreen-ui";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandLogo } from "../../assets/svgs/svg";
import CustomButton from "../../components/CustomButton/customButton";
import TextInput from "../../components/TextInputs/TextInput";
import UserContext from "../../context/User";

const ManufacturerLoginTemp = () => {
  const [brandName, setBrandName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  if (user.isManufacturer) {
    navigate("/manufacturer/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await user.wallet.callMethod({ contractId: user.contractId, method: "register_manufacturer", args: { name: brandName } })
      navigate('/manufacturer/home');
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      // toaster.danger("An error occured");
    }
  };

  return (
    <Box w="100%" mt="100px">
      <Box mx="auto">{brandLogo}</Box>
      <Text fontSize="25px" color="brand.blue" textAlign="center" mt="20px">
        Admin Registeration
      </Text>
      <Box w={{ base: '80%', lg: "35%"}} mx="auto">
        <Box my="30px">
          <CustomButton
            onClick={() => user.wallet.signIn()}
            w="100%"
            bg="brand.white"
            color="brand.blue"
            hoverBg="brand.blue"
            hoverColor="brand.white"
            testid="on-close"
            border="1px solid #0368FF"
          >
            {!user.isSignedIn ? 'Connect Wallet First !' : 'Connected !'}
          </CustomButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextInput placeholder="Enter your brand name" type="text" label="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          <Box mt="30px">
            <CustomButton
              w="100%"
              bg="brand.blue"
              color="brand.white"
              hoverBg="brand.primary"
              hoverColor="brand.white"
              testid="on-close"
              isLoading={isLoading}
              disabled={!brandName}
            >
              Proceed
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ManufacturerLoginTemp;
