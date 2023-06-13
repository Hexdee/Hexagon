import { Box } from "@chakra-ui/react"
import DashboardContainer from "../../container/dashboardContainer";
import InformationTemp from "../../templates/InformationTemp";

const InformationHome = () => {
    return (
        <Box>
            <DashboardContainer>
                <Box p="20px">
                    <InformationTemp />
                </Box>
            </DashboardContainer>
        </Box>
    )
};

export default InformationHome;