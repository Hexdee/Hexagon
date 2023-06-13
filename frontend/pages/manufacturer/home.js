import { Box } from "@chakra-ui/react";
import DashboardContainer from "../../container/dashboardContainer";
import ManufacturerDashboardTemp from "../../templates/ManufacturerTemp/manufacturerDashboard";

const Home = () => {
  return (
    <Box>
      <DashboardContainer>
        <Box p="20px">
          <ManufacturerDashboardTemp />
        </Box>
      </DashboardContainer>
    </Box>
  );
};

export default Home;
