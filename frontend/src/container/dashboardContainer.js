import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../components/NavBar/SideBar";
import SearchInput from "../components/TextInputs/SearchInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton/customButton";
import { hamburger } from "../assets/svgs/svg";
import { connectWallet, disconnectWallet } from "../utils/hexagon.js";

const DashboardContainer = ({ children }) => {
  const [isConnected, setIsConnected] = useState(localStorage.getItem("isConnected"));
  const [showSidebar, setShowSidebar] = useState(true);

  const screenSize = window.screen.width;

  async function connect() {
    await connectWallet();
    setIsConnected(true);
  }

  function disconnect() {
    disconnectWallet();
    setIsConnected(false);
  }

  return (
    <Flex bg={{ base: "white", lg: "#F3F6FB" }}>
      <Box className="side-bar" w={{ base: '0', lg: "25%" }} bg="white" p={{ base: '', lg: "40px" }}>
        <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </Box>
      {showSidebar &&
        <Box className="content" w={{ base: '100%', lg: "75%" }} mb="30px">
          <Flex justifyContent="space-between" alignItems="center" w="100%" p={{ base: "10px", lg: "20px 40px" }} bg="white" border="1px solid rgba(196, 196, 196, 0.4)" display={{ base: 'block', lg: 'flex' }}>
            <Flex w="100%">
              {screenSize < 768 &&
                <>
                  {showSidebar &&
                    <Box mr="30px" onClick={() => setShowSidebar(!showSidebar)}>{hamburger}</Box>
                  }
                </>
              }
              <SearchInput placeholder="Search" w={{ base: '100%', lg: "400px" }} />
            </Flex>
            <Flex alignItems="center" mt={{ base: "20px", lg: '0' }}>
              {
                isConnected ?
                  <CustomButton color="red" mr="50px" cursor="pointer" onClick={disconnect} hoverBg="red" hoverColor="brand.white">Disconnect {localStorage.getItem("isConnected")}</CustomButton> :
                  <CustomButton color="brand.white" bg="brand.blue" mr="50px" cursor="pointer" onClick={connect}>Connect Wallet</CustomButton>
              }
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
      }
    </Flex>
  );
};

export default DashboardContainer;
