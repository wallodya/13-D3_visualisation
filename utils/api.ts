import {
	DopingAPIResponse,
	EducationAPIResponse,
	MoviesAPIResponse,
	TemperatureAPIResponse,
	US_GDP_APIResponse,
} from "./utils.types"

/**
 *
 * @param URL URL to fetch data from: string, required
 * @returns Promise with fetch result
 */
export const getData = (
	URL: string
): Promise<
	DopingAPIResponse &
		US_GDP_APIResponse &
		TemperatureAPIResponse &
		EducationAPIResponse &
		MoviesAPIResponse
> => {
	return new Promise((resolve, reject) => {
		fetch(URL)
			.then(res => res.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
	})
}
