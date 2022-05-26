import { routes } from "@/constants";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ExampleCommandGroup: React.FC = () => {
	return (
		<Box width="800px" margin="0 auto" paddingTop="3">
			<Heading size="md" color="gray.600">
				자동화 리스트에서 붙여넣어 실행해보세요.
			</Heading>
		</Box>
	);
};

export default ExampleCommandGroup;
