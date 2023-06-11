import { Box, Flex, Text } from "@chakra-ui/react";
import { sideBarLink } from "../../utils/data";

const SideLinks = () => {

  const pathname = window.location.pathname;

  return (
    <Box mt="70px" ml="-40px">
      {sideBarLink.map((items, index) => {
        const { icon, title, link, activeIcon } = items;
        const isCurrentPage = pathname === link;

      return (

        <a href={link}>
          <Flex
            mt="20px"
            p="17px 30px"
            cursor="pointer"
            alignItems="center"
            bg={isCurrentPage && "#CDE1FF47"}
            borderLeft={isCurrentPage ? "5px solid #2D81FF" : "5px solid #FFF"}
            color={isCurrentPage && "#2D81FF"}
            _hover={{
              bg: "#CDE1FF47",
              color: "#2D81FF",
              borderLeft: "5px solid #2D81FF",
            }}
            style={{ transition: "all 0.9s ease" }}
            key={index}
          >
            <Box>{isCurrentPage ? activeIcon : icon}</Box>
            <Text ml="10px">{title}</Text>
          </Flex>
        </a>
      )})}
    </Box>
  );
};

export default SideLinks;
