import { Types } from './Types'
import api from '../../utils/api'

export const getAllTokens = () => async (dispatch) => {
  await api().get('/access-tokens')
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_TOKENS,
        payload: res.data
      })
    })
}

export const addNewToken = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/access-tokens', values).then((res) => {
      dispatch({
        type: Types.NEW_TOKEN,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const setTokenData = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/elections/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.SET_TOKEN_DATA,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getTokenDetail = (payload) => {
  return {
    type: Types.GET_TOKEN_DETAIL,
    payload: payload
  }
}
export const deleteToken = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/access-tokens/${id}`).then((res) => {
      dispatch({
        type: Types.SET_TOKEN_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const restoreToken = (id) => (dispatch) => {
  const data = {
    id: id
  }
  return new Promise((resolve, reject) => {
    api().post('/access-token/restore', data).then((res) => {
      dispatch({
        type: Types.SET_TOKEN_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const resetToken = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/access-token/reset/${id}`).then((res) => {
      dispatch({
        type: Types.SET_TOKEN_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
