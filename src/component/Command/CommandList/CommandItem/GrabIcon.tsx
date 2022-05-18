import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const GrabIcon: React.FC = () => {
	return (
		<Box
			color="gray.300"
			_hover={{ color: "gray.700" }}
			paddingRight="1"
			style={{ cursor: "grab" }}
		>
			<ArrowUpDownIcon fontSize="lg" />
		</Box>
	);
};

export default GrabIcon;
