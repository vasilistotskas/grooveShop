export enum BaseAuthenticationTypes {
    ACTIVATION_BEGIN = 'ACTIVATION_BEGIN',
    ACTIVATION_CLEAR = 'ACTIVATION_CLEAR',
    ACTIVATION_FAILURE = 'ACTIVATION_FAILURE',
    ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS',
    LOGIN_BEGIN = 'LOGIN_BEGIN',
    LOGIN_CLEAR = 'LOGIN_CLEAR',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGOUT = 'LOGOUT',
    PASSWORD_EMAIL_BEGIN = 'PASSWORD_EMAIL_BEGIN',
    PASSWORD_EMAIL_CLEAR = 'PASSWORD_EMAIL_CLEAR',
    PASSWORD_EMAIL_FAILURE = 'PASSWORD_EMAIL_FAILURE',
    PASSWORD_EMAIL_SUCCESS = 'PASSWORD_EMAIL_SUCCESS',
    PASSWORD_RESET_BEGIN = 'PASSWORD_RESET_BEGIN',
    PASSWORD_RESET_CLEAR = 'PASSWORD_RESET_CLEAR',
    PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE',
    PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
    PASSWORD_CHANGE_FAILURE = 'PASSWORD_CHANGE_FAILURE',
    PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS',
    REGISTRATION_BEGIN = 'REGISTRATION_BEGIN',
    REGISTRATION_CLEAR = 'REGISTRATION_CLEAR',
    REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    SET_TOKEN = 'SET_TOKEN',
    SET_SESSION_AUTH = 'SET_SESSION_AUTH',
    REMOVE_TOKEN = 'REMOVE_TOKEN'
}