import { useCommandGroupsDispatch } from "./useCommandGroups";
import { useCommandsState } from "./useCommands";
import { nanoid } from "nanoid";

export default function useSaveCommandGroup() {
	const { commands } = useCommandsState();

	const commandGroupsDispatch = useCommandGroupsDispatch();

	return function ({ title, startUrl }: { title: string; startUrl?: string }) {
		commandGroupsDispatch({
			type: "CreateCommandGroup",
			commandGroupData: {
				id: nanoid(),
				commands,
				title,
				startUrl,
				createdAt: new Date().getDate(),
			},
		});
	};
}
