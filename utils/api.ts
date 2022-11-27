/**
 * 
 * @param URL URL to fetch data from: string, required
 * @returns Promise with fetch result
 */
export const getData = (URL: string) : Promise<object> => {
	return new Promise((resolve, reject) => {
		fetch(URL)
			.then(res => res.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
	})
}
