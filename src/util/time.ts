export function getCurrentTime(): number {
	return new Date().getTime();
}

function isValidTime(time: number) {
	return time > 1590065798750;
}

export function formatTime(time: number) {
	if (!isValidTime(time)) {
		return "null";
	}

	const date = new Date(time);
	return `${date.getFullYear().toString().slice(2)}년${
		date.getMonth() + 1
	}월${date.getDate()}일 ${date.getHours()}시${date.getMinutes()}분`;
}
