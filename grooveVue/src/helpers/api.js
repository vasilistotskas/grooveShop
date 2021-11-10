import axios from "axios";

export default function Api(commit, alternativeToken = null) {
    const baseUrl = '/api/v1'

    const getUserToken = () => {
        return alternativeToken || localStorage.getItem('token');
    }

    const beforeRequest = () => {
        commit('setIsLoading', true)
    }

    const afterResponse = () => {
        commit('setIsLoading', false)
    }

    const serializeParams = (params) => {
        if (typeof params === 'string' || params instanceof String)
            return params

        if (params instanceof Array && params.length > 0) {
            return `/${params.join('/')}`
        }

        return ''
    }

    return {
        post: (endpoint, data) => {
            beforeRequest()
            return axios.post(
                `${baseUrl}/${endpoint}/`,
                data,
                { headers: { 'Authorization': "Token " + getUserToken() } },
            ).finally(() => afterResponse())
        },
        get: (endpoint, ...paramList) => {
            beforeRequest()
            return axios.get(
                `${baseUrl}/${endpoint}${serializeParams(paramList)}`,
                { headers: { 'Authorization': "Token " + getUserToken() } },
            ).finally(() => afterResponse())
        },
        delete: (endpoint, ...idList) => {
            beforeRequest()
            return axios.delete(
                `${baseUrl}/${endpoint}${serializeParams(idList)}`,
                { headers: { 'Authorization': "Token " + getUserToken() } },
            ).finally(() => afterResponse())
        },
        put: (endpoint, data, ...idList) => {
            beforeRequest()
            return axios.put(
                `${baseUrl}/${endpoint}${serializeParams(idList)}`,
                data,
                { headers: { 'Authorization': "Token " + getUserToken() } },
            ).finally(() => afterResponse())
        },
        patch: (endpoint, data, ...idList) => {
            beforeRequest()
            return axios.patch(
                `${baseUrl}/${endpoint}${serializeParams(idList)}`,
                data,
                { headers: { 'Authorization': "Token " + getUserToken() } },
            ).finally(() => afterResponse())
        }
    }
}