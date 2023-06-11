import { Box } from "@chakra-ui/react"
import DashboardContainer from "../container/dashboardContainer";
import DashboardTemp from "../templates/DashboardTemp";

const DashboardHome = () => {
    return (
        <Box>
            <DashboardContainer>
                <Box p="20px">
                    <DashboardTemp />
                </Box>
            </DashboardContainer>
        </Box>
    )
};

export default DashboardHome;