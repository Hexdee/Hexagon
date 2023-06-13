import { Box, Flex } from "@chakra-ui/react";
import { brandLogo, close, hamburger } from "../../assets/svgs/svg";
import SideLinks from "./SideLinks";

const SideBar = ({ setShowSidebar, showSidebar }) => {
  const screenSize = window.screen.width;
  return (
    <Box
      width={{ base: "100%", lg: "fitContent" }}
      p={{ base: "40px", lg: "0" }}
      h={{ base: "100%" }}
    >
      <Flex
        display={{ base: "flex", lg: "block" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Box ml={{ base: "-10px", lg: "0" }}>{brandLogo}</Box>
        {screenSize < 768 && (
          <Box
            ml={{ base: "120px", lg: "0" }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? hamburger : close}
          </Box>
        )}
      </Flex>

      <SideLinks />
    </Box>
  );
};

export default SideBar;
