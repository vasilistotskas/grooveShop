export type ApiGetData = Record<
	string,
	string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]
>
export type ApiPostData<T> = Record<string, unknown> | FormData | T
export type ApiPutData = Record<
	string,
	string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]
>
export type ApiPatchData<T = unknown> =
	| Record<
			string,
			| string
			| number
			| boolean
			| readonly string[]
			| readonly number[]
			| readonly boolean[]
	  >
	| FormData
	| T
