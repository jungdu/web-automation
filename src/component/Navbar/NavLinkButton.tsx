import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const NavLinkButton: React.FC<{
	text: string;
	linkTo: string;
}> = ({ text, linkTo }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(linkTo);
	};
	const active = pathname === linkTo;
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

export default NavLinkButton;
