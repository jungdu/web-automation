export interface OpenBrowserMessage {
	type: "openBrowser";
	param: {
		startUrl: string;
	};
	return: {
		id: string;
	};
}

export interface ClickElementMessage {
	type: "clickElement";
	param: {
		browserId: string;
		selector: string;
	};
	return: void;
}

export interface TypeKeyboardMessage {
	type: "typeKeyboardMessage";
	param: {
		browserId: string;
		text: string;
	};
	return: void;
}

export type IpcMessage =
	| OpenBrowserMessage
	| ClickElementMessage
	| TypeKeyboardMessage;
