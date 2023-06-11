import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../components/NavBar/SideBar";
import SearchInput from "../components/TextInputs/SearchInput";

const DashboardContainer = ({ children }) => {
  return (
    <Flex bg="#F3F6FB">
      <Box className="side-bar" w="25%" bg="white"  p="40px">
        <SideBar />
      </Box>
      <Box className="content" w="75%" mb="30px">
        <Flex justifyContent="space-between" alignItems="center" w="100%" p="20px 40px" bg="white" border="1px solid rgba(196, 196, 196, 0.4)">
          <SearchInput placeholder="Search" w="400px" />
          <Flex alignItems="center">
            <Text color="red" mr="50px">Not connected?</Text>
            <Text mr="10px">Mode</Text>
            <Box>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </Box>
          </Flex>
        </Flex>
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardContainer;
