import { AddIcon } from "@chakra-ui/icons";
import { Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";
import EditParameterModal from "./EditParameterModal";

const CreateParameterButton: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Tooltip label="파라미터 추가">
				<Button
					colorScheme={"blue"}
					variant="ghost"
					onClick={onOpen}
					marginLeft="1"
					size={"sm"}
				>
					<AddIcon fontSize={"md"} />
				</Button>
			</Tooltip>
			<EditParameterModal
				isOpen={isOpen}
				onClose={onClose}
				editingParameterInfo={null}
			/>
		</>
	);
};

export default CreateParameterButton;
