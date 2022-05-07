import { useCommandGroupsDispatch } from "./useCommandGroups";
import { useCommandsState } from "./useCommands";
import { nanoid } from "nanoid";
import { useToast } from "@chakra-ui/react";

export default function useSaveCommandGroup() {
	const { commands, startUrl } = useCommandsState();
	const commandGroupsDispatch = useCommandGroupsDispatch();
	const toast = useToast();

	return function (title: string) {
		commandGroupsDispatch({
			type: "CreateCommandGroup",
			commandGroupData: {
				commands,
				createdAt: new Date().getDate(),
				id: nanoid(),
				startUrl,
				title,
			},
		});
		toast({
			title: "저장되었습니다",
			status: "success",
			duration: 1000,
		});
	};
}
