import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import keccak256 from "keccak256";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/User";
import CustomButton from "../CustomButton/customButton";
import TextInput from "../TextInputs/TextInput";
import ShortUniqueId from 'short-unique-id';
import { toaster } from "evergreen-ui";
import { createItems } from "../../utils/hexagon";


const AddItemModal = ({ isOpen, onClose, header, products }) => {
  const {
    isOpen: isOpenCode,
    onOpen: onOpenCode,
    onClose: onCloseCode,
  } = useDisclosure();

  const [itemNumber, setItemNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const user = useContext(UserContext);

  const handleProceed = async (e) => {
    e.preventDefault();
    const res = await createItems(productName, itemNumber);
    setCodes(res);
    onClose();
    onOpenCode();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl mt="20px">
                <FormLabel color="brand.dark" fontSize="14px" fontWeight="500">
                  Select Product
                </FormLabel>
                <Select
                  placeholder="Which product do you want to add ?"
                  focusBorderColor="#65D593"
                  _focus={{ border: "0.1px solid #65D593" }}
                  _placeholder={{
                    color: "#718096",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  icon={<TriangleDownIcon />}
                  size="lg"
                  fontSize="16px"
                  height="48px"
                  value={productName}
                  onChange={(e) => { setProductName(e.target.value) }}
                >
                  {products?.map((productList) => (
                    <option value={productList} key={productList}>
                      {productList}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <TextInput
                label="How many items do you want to add"
                placeholder="Enter number of items to add"
                type="number"
                onChange={(e) => setItemNumber(e.target.value)}
                value={itemNumber}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} borderRadius="4rem">
              Cancel
            </Button>
            <CustomButton
              onClick={handleProceed}
              bg="brand.blue"
              color="brand.white"
              disabled={!itemNumber || !productName || itemNumber === "0"}
            >
              Add Items
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenCode} onClose={onCloseCode}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Newly generated codes:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {codes.map((code) => (
              // <TextInput
              //   type="text"
              //   value={code}
              //   isReadOnly
              //   key={code}
              // />
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Code: </Text>
                <Text display='inline' m="16px" p="16px" mt="12px" whiteSpace="nowrap" color="brand.blue">{code}</Text>
              </Flex>
            ))}
            <Text fontSize="12px" mt="10px" color="red">
              Note: These codes cannot be retrieved; print or write down these codes before closing the page.{" "}
            </Text>
          </ModalBody>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="20px" textAlign="center" my="20px" mx="10px">
            <Button mr={3} borderRadius="4rem" onClick={onCloseCode}>
              Close
            </Button>
            <CustomButton bg="brand.blue" color="brand.white" onClick={() => window.print()}>
              Print Page
            </CustomButton>
          </SimpleGrid>

        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemModal;
