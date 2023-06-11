import { Box } from "@chakra-ui/react";
import { brandLogo } from "../../assets/svgs/svg";
import SideLinks from "./SideLinks";

const SideBar = () => {
    return (
        <Box>
            <Box>{brandLogo}</Box>
            <SideLinks />
        </Box>
    )
};

export default SideBar