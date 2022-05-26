import { Box } from "@chakra-ui/react";
import React from "react";

const Guide: React.FC = () => {
	return (
		<Box maxWidth="1000px" margin="0 auto">
			<iframe
				frameBorder={"none"}
				width="100%"
				height="4500px"
				src="data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='https://gist.github.com/jungdu/cc2d22df7c37b043d82a7ee3a7fa3711.js'></script>
    </body>"
			/>
		</Box>
	);
};

export default Guide;
