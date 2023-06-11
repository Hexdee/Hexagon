import { Box, Divider, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton/customButton";
import Admin from "../../assets/icons/Admin-icon.png";
import { rightArr } from "../../assets/svgs/svg";
import { relatedDrugs } from "../../utils/data";

const RelatedDrugs = () => {
  return (
    <Box w="100%" bg="white" borderRadius="8px" p="20px">
      <SimpleGrid columns={2} alignItems="center" justifyItems="space-between" width="100%">
        <Text>Related drugs</Text>
        <CustomButton bg="#F5F5F5" borderRadius="8px">
          <Text color="#3A3A3ABF">View All</Text>
        </CustomButton>
      </SimpleGrid>

      <Box mt="20px">
        {relatedDrugs.map((drug, index) => (
          <>
          <Divider my="10px" />
          <a href={drug.link} target="_blank" rel="noreferrer">
            <Flex justifyContent="space-between" fontSize="14px" mt="20px" key={index} cursor="pointer">
                <Text>{drug.name}</Text>
                <Box>{rightArr}</Box>
            </Flex>
          </a>
          </>
        ))}


        <Flex alignItems="center" justifyContent="space-between" bg="brand.blue" mt="
        20px" p="20px">
            <Box color="white">
                <Text>Become an Admin</Text>
                <Text>Do you want to register as a manufacturer at BONAFIDE?</Text>
                <CustomButton bg="white" mt="20px" href="/manufacturer">
                    <Text color="brand.blue">SIGN UP</Text>
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

export default RelatedDrugs;
