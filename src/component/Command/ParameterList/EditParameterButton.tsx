import { EditIcon } from "@chakra-ui/icons";
import { Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ParameterData } from "../type";
import EditParameterModal from "./EditParameterModal";

const EditParameterButton: React.FC<{
	parameter: ParameterData;
	index: number;
}> = ({ parameter, index }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleEditClick() {
		onOpen();
	}

	return (
		<>
			<Tooltip label="파라미터 수정">
				<Button marginLeft="1" onClick={handleEditClick}>
					<EditIcon />
				</Button>
			</Tooltip>
			<EditParameterModal
				isOpen={isOpen}
				onClose={onClose}
				editingParameterInfo={{ parameter, index }}
			/>
		</>
	);
};

export default EditParameterButton;
