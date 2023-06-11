import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandLogo } from "../../assets/svgs/svg";
import CustomButton from "../../components/CustomButton/customButton";
import TextInput from "../../components/TextInputs/TextInput";

const ManufacturerLoginTemp = () => {
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/manufacturer/home');
    };
  return (
    <Box w="100%" mt="100px">
      <Box mx="auto">{brandLogo}</Box>
      <Text fontSize="25px" color="brand.blue" textAlign="center" mt="20px">
        Admin Registeration
      </Text>
      <Box w="35%" mx="auto">
        <Box my="30px">
          <CustomButton
                    w="100%"
                    bg="brand.white"
                    color="brand.blue"
                    hoverBg="brand.blue"
                    hoverColor="brand.white"
                    testid="on-close"
                    border="1px solid #0368FF"
                >
                    Connect Wallet First !
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
