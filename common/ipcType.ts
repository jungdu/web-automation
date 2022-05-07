export interface OpenBrowserMessage {
	type: "openBrowser";
	param: {
		startUrl: string;
	};
	return: void;
}

export interface ClickElementMessage {
	type: "clickElement";
	param: {
		selector: string;
	};
	return: void;
}

export interface TypeKeyboardMessage {
	type: "typeKeyboardMessage";
	param: {
		text: string;
	};
	return: void;
}

export type IpcMessage =
	| OpenBrowserMessage
	| ClickElementMessage
	| TypeKeyboardMessage;
