import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { routes } from "@/constants";
import letpeatIcon from "@/image/letpeat.100px.png";
import NavLinkButton from "./NavLinkButton";
import LinkBrowserButton from "./LinkBrowserButton";

const Navbar: React.FC = () => {
	return (
		<Box width="100%" borderBottom="1px solid #ddd" marginBottom="2">
			<Flex
				maxWidth="1000px"
				margin="0 auto"
				padding="1"
				alignItems={"center"}
				paddingX="3"
			>
				<Box
					backgroundImage={`url(${letpeatIcon})`}
					backgroundSize="100% 100%"
					width="30px"
					height="30px"
				></Box>
				<NavLinkButton text="자동화 리스트" linkTo={routes.group} />
				<NavLinkButton text="사용 방법" linkTo={routes.guide} />
				{/* <NavButton text="사용 예제" linkTo={routes.examples} /> */}
				<LinkBrowserButton />
			</Flex>
		</Box>
	);
};

export default Navbar;
