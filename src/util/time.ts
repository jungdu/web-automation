export function getCurrentTime(): number {
	return new Date().getTime();
}

export function formatTime(time: number) {
	const date = new Date(time);

	return `${
		date.getMonth() + 1
	}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
}
