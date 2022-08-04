import { CommandData, ParameterData } from "../component/Command/type";
import { executeCommand } from "@/util";

interface CommandRunnerParam {
	browserId: string;
	startUrl: string;
	commands: CommandData[];
	parameters: ParameterData[];
	repeatCount: number;
	callbacks: {
		onCommandItemSuccess?: (repeatIdx: number, commandIdx: number) => void;
		onCommandsSuccess?: () => void;
		onError: (e: Error) => void;
	};
}

class CommandRunner {
	private stopped: boolean = false;

	constructor(private runnerParam: CommandRunnerParam) {}

	async run() {
		const {
			browserId,
			startUrl,
			commands,
			repeatCount,
			parameters,
			callbacks,
		} = this.runnerParam;

		try {
			for (const repeatIdx of new Array(repeatCount).fill(0).map((_, i) => i)) {
				if (startUrl) {
					await executeCommand(
						browserId,
						{ type: "replacePage", href: startUrl },
						null
					);
				}

				for (const [itemIdx, command] of commands.entries()) {
					if (this.stopped) {
						return;
					}
					await executeCommand(browserId, command, parameters);
					callbacks?.onCommandItemSuccess?.(repeatIdx, itemIdx);
				}
			}

			callbacks?.onCommandsSuccess?.();
		} catch (e) {
			callbacks.onError(e as Error);
		}
	}

	stop() {
		this.stopped = true;
	}
}

class CommandRunnerManager {
	private runners: { [browserId: string]: CommandRunner } = {};

	private getCommandRunner(browserId: string) {
		const commandRunner = this.runners[browserId];
		if (!commandRunner) {
			throw new Error("No command runner");
		}
		return commandRunner;
	}

	runCommands(runnerParam: CommandRunnerParam) {
		const commandRunner = new CommandRunner(runnerParam);
		this.runners[runnerParam.browserId] = commandRunner;
		commandRunner.run();
	}

	stopCommands(browserId: string) {
		this.getCommandRunner(browserId).stop();
	}
}

export const commandRunnerManager = new CommandRunnerManager();
