import { Box, Progress } from "@chakra-ui/react";
import React from "react";
import { useCommandProgressState } from "@/hooks/useCommandProgress";

const CommandProgress: React.FC = () => {
	const { progress, failed, running } = useCommandProgressState();
	return (
		<Box height="3">
			<Progress
				hasStripe
				value={progress}
				colorScheme={failed ? "red" : "green"}
				isAnimated={running}
			/>
		</Box>
	);
};

export default CommandProgress;
