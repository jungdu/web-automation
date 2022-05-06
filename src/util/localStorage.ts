export function getStoredData<T>(key: string): null | T {
	const storedData = localStorage.getItem(key);

	try {
		return storedData ? (JSON.parse(storedData) as T) : null;
	} catch (e) {
		return null;
	}
}

export function storeData<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}
