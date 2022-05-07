import { useCommandGroupsDispatch } from "./useCommandGroups";
import { useCommandsState } from "./useCommands";
import { nanoid } from "nanoid";

export default function useSaveCommandGroup() {
	const { commands } = useCommandsState();

	const commandGroupsDispatch = useCommandGroupsDispatch();

	return function ({ title, startUrl }: { title: string; startUrl: string }) {
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
	};
}
