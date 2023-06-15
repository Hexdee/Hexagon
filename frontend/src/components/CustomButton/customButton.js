import { Button } from "@chakra-ui/react";

const CustomButton = ({ bg, color, children, border, hoverBg, hoverColor, onClick, m, p, w, mx, disabled, href, mt, isLoading, mr, borderRadius, pos }) => {
  return (
    <a href={href}>
      <Button type="submit" background={bg} color={color} borderRadius={borderRadius || "4rem"} p="8px 24px" mr={mr} _hover={{ bg: hoverBg, color: hoverColor}} border={border} style={{ transition: "all 0.9s ease" }} fontSize="14px" mx={mx} margin={m} w={w} padding={p} disabled={disabled} mt={mt} onClick={onClick} isLoading={isLoading} pos={pos}>
        {children}
      </Button>
    </a>
  );
};

export default CustomButton;
