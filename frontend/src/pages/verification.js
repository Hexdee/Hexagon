import { Box } from "@chakra-ui/react"
import DashboardContainer from "../container/dashboardContainer";
import VerificationTemp from "../templates/VerificationTemp";

const VerificationHome = () => {
    return (
        <Box>
            <DashboardContainer>
                <Box p="20px">
                    <VerificationTemp />
                </Box>
            </DashboardContainer>
        </Box>
    )
};

export default VerificationHome;