export default interface ResetPasswordInputApi {
	new_password?: unknown
	re_new_password?: unknown
	uid?: string | string[]
	token?: string | string[]
}
