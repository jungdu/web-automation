import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { routes } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";

const NavButton: React.FC<{
	text: string;
	linkTo: string;
}> = ({ text, linkTo }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(linkTo);
	};
	const active = pathname === linkTo;
	console.log("pathname :", pathname);
	console.log("linkTo :", linkTo);
	console.log("active :", active);
	return (
		<Button
			onClick={handleClick}
			color={(active && "black") || "gray.500"}
			variant={"link"}
			padding="2"
			marginX="2"
			marginY="1"
			minWidth="6"
		>
			{text}
		</Button>
	);
};

const Navbar: React.FC = () => {
	return (
		<Box width="100%" borderBottom="1px solid #ddd" marginBottom="2">
			<Flex maxWidth="1000px" margin="0 auto" padding="1">
				<NavButton text="자동화 리스트" linkTo={routes.group} />
				<NavButton text="사용 방법" linkTo={routes.guide} />
				<NavButton text="사용 예제" linkTo={routes.examples} />
			</Flex>
		</Box>
	);
};

export default Navbar;
