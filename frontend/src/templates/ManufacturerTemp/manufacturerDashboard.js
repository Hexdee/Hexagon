import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardIcon from "../../assets/icons/dashboard-icon.png";
import CustomButton from "../../components/CustomButton/customButton";
import AddItemModal from "../../components/Modal/addItemModal";
import AddProdcutModal from "../../components/Modal/addProductModal";
import { manProducts } from "../../utils/data";
import LatestNews from "../LatestNews";

const ManufacturerDashboardTemp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: itemIsOpen, onOpen: itemOnOpen, onClose: itemOnClose } = useDisclosure();

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
              Welcome to BONAFIDE Manufacturer Dashboard
            </Text>
            <Text color="brand.lightGrey">
              A drug verification and authentication system. A system where you
              get a reliable information about a product.
            </Text>
          </Box>
          <Box ml="40px">
            <Image src={DashboardIcon} alt="dahsboard-home-icon" />
          </Box>
        </SimpleGrid>

        <Box bg="brand.white" p="40px" mt="40px" borderRadius="8px">
          <Flex mb="20px" alignItems="center" justifyContent="space-between">
            <Text cursor="pointer" _hover={{ color: "brand.blue" }}>
              View all products
            </Text>
            <CustomButton
              bg="brand.blue"
              color="brand.white"
              hoverBg="brand.primary"
              hoverColor="brand.white"
              onClick={onOpen}
            >
              Add products
            </CustomButton>
          </Flex>
          <SimpleGrid columns={3} gap="30px">
            {manProducts.map((item, index) => (
              <Flex
                alignItems="center"
                bg="#F3F6FB"
                p="20px"
                borderRadius="8px"
                key={index}
              >
                <Box>{item.icon}</Box>
                <Text color="brand.dark" ml="10px">
                  {item.name}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        <Box mt="50px" bg="brand.white" p="40px">
          <Flex mb="20px" alignItems="center" justifyContent="space-between">
            <Text color="brand.dark" fontSize="16px" mb="10px">
              View all items
            </Text>

            <CustomButton
              bg="brand.blue"
              color="brand.white"
              hoverBg="brand.primary"
              hoverColor="brand.white"
              onClick={itemOnOpen}
            >
              Add Items
            </CustomButton>
          </Flex>

          <SimpleGrid columns={3} gap="30px">
            {manProducts.map((item, index) => (
              <Flex
                alignItems="center"
                bg="#F3F6FB"
                p="20px"
                borderRadius="8px"
                key={index}
              >
                <Box>{item.icon}</Box>
                <Text color="brand.dark" ml="10px">
                  {item.name}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Box w="30%" ml="20px">
        <LatestNews />
      </Box>

      <AddProdcutModal
        isOpen={isOpen}
        onClose={onClose}
        header="Add Products "
        // handleProceed={handleProceed}
      />

<AddItemModal
        isOpen={itemIsOpen}
        onClose={itemOnClose}
        header="Fill in Item Number"
        // handleProceed={handleProceed}
      />
    </Flex>
  );
};

export default ManufacturerDashboardTemp;
