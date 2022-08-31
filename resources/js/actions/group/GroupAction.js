import { Types } from './Types'
import api from '../../utils/api'

export const getAllGroups = () => async (dispatch) => {
  await api().get('/groups')
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_GROUPS,
        payload: res.data
      })
    })
}

export const addNewGroup = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/groups', values).then((res) => {
      dispatch({
        type: Types.NEW_GROUP,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const setGroupData = (id, values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/groups/${id}`, values).then((res) => {
      dispatch({
        type: Types.SET_GROUP_DATA,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getGroupDetail = (payload) => {
  return {
    type: Types.GET_GROUP_DETAIL,
    payload: payload
  }
}

export const deleteGroup = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/groups/${id}`).then((res) => {
      dispatch({
        type: Types.DELETE_GROUP,
        payload: id
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getGroupElections = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/group/${id}/elections`).then((res) => {
      dispatch({
        type: Types.GET_ELECTIONS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
