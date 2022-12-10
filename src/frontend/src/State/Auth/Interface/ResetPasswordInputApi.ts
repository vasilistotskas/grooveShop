export default interface ResetPasswordInputApi {
	new_password: string
	re_new_password: string
	uid: string | string[]
	token: string | string[]
}
