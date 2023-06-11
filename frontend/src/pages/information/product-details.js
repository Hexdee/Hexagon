import { Box } from "@chakra-ui/react"
import DashboardContainer from "../../container/dashboardContainer";
import ProductDetailsTemp from "../../templates/InformationTemp/productDetails";

const ProductDetailsHome = () => {
    return (
        <Box>
            <DashboardContainer>
                <Box p="20px">
                    <ProductDetailsTemp />
                </Box>
            </DashboardContainer>
        </Box>
    )
};

export default ProductDetailsHome;