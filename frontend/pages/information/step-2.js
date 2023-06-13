import { Box } from "@chakra-ui/react"
import DashboardContainer from "../../container/dashboardContainer";
import StepTwoTemp from "../../templates/InformationTemp/StepTwoTemp";

const VerificationHome = () => {
    return (
        <Box>
            <DashboardContainer>
                <Box p="20px">
                    <StepTwoTemp />
                </Box>
            </DashboardContainer>
        </Box>
    )
};

export default VerificationHome;