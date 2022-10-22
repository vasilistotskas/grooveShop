export default interface BreadcrumbItemInterface {
	/**
	 * @name Displayed name of breadcrumb
	 * @to object that includes type, param, full_path
	 * @full_path the full path of breadcrumb
	 */
	name: string | string[]
	to: {
		full_path: string | string[]
	}
	id?: string | number
}
