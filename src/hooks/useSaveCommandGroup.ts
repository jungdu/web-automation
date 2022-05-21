import { useCommandGroupsDispatch } from "./useCommandGroups";
import { useCommandsState } from "./useCommands";
import { nanoid } from "nanoid";
import { useToast } from "@chakra-ui/react";
import { getCurrentTime } from "@/util/time";

export default function useSaveCommandGroup() {
	const { commands, startUrl, parameters } = useCommandsState();
	const commandGroupsDispatch = useCommandGroupsDispatch();
	const toast = useToast();

	return function (title: string) {
		commandGroupsDispatch({
			type: "CreateCommandGroup",
			commandGroupData: {
				commands,
				createdAt: getCurrentTime(),
				id: nanoid(),
				parameters,
				startUrl,
				title,
			},
		});
		toast({
			title: "저장되었습니다",
			status: "success",
			duration: 1000,
			position: "bottom",
		});
	};
}
