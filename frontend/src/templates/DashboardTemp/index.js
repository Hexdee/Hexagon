import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import DashboardIcon from "../../assets/icons/dashboard-icon.png";
import { currentServices } from "../../utils/data";
import LatestNews from "../LatestNews";

const DashboardTemp = () => {

    return (
        <Flex w="100%" display={{ base: 'block', lg: 'flex' }}>
            <Box w={{ base: '100%', lg: "70%" }}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} bg="brand.blue" alignItems="center" p="40px 20px" borderRadius="8px" textAlign={{ base: 'center', lg: 'left' }}>
                    <Box>
                        <Text color="brand.white" fontSize="28px">Welcome to HEXAGON</Text>
                        <Text color="brand.lightGrey">A drug verification and authentication system. A system where you get a reliable information about a product.</Text>
                    </Box>
                    <Box ml={{ base: '', lg: "40px" }}>
                        <Image src={DashboardIcon} alt="dahsboard-home-icon" />
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap="30px" bg="brand.white" p="40px" mt="40px" borderRadius="8px">
                    {currentServices.map((item, index) => (
                        <Flex alignItems="center" bg="#F3F6FB" p="20px" borderRadius="8px" key={index}>
                            <Box>{item.icon}</Box>
                            <Text color="brand.dark" ml="10px">{item.name}</Text>
                        </Flex>
                    ))}
                </SimpleGrid>

            </Box>

            <Box w={{ base: '100%', lg: "30%" }} ml="20px">
                <LatestNews />
            </Box>
        </Flex>
    )
};

export default DashboardTemp;