import axios from 'axios'

export default function api() {
    const makeRequest = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_PATH,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        // withXSRFToken: true
    })

    makeRequest.interceptors.request.use(function (config) {
        // config.headers.Authorization = `Bearer ${authContext.authState.token}`
        // config.headers.Accept = 'application/json'
        // config.headers.ContentType = 'application/json'
        //   config.defaults.withCredentials = true
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    makeRequest.interceptors.response.use(response => {
            return response
        }, error => {
            const code = error && error.response ? error.response.status : 0
            if (code === 401 || code === 403 || code === 419) {
                window.location.replace('/login')
            }
            return Promise.reject(error)
        }
    )

    return makeRequest
}
