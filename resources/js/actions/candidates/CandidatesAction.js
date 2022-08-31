import { Types } from './Types'
import api from '../../utils/api'

export const getAllCandidates = () => async (dispatch) => {
  await api().get('/candidates')
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_CANDIDATES,
        payload: res.data
      })
    })
}


export const getElectionCandidates = (electionId) => async (dispatch) => {
    await api().get(`/election/${electionId}/candidates`)
        .then((res) => {
            dispatch({
                type: Types.GET_ELECTION_CANDIDATES,
                payload: res.data
            })
        })
}


export const addNewCandidate = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/candidates', values).then((res) => {
      dispatch({
        type: Types.NEW_CANDIDATE,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const setCandidateData = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/candidates/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.SET_CANDIDATE_DATA,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getCandidateDetail = (payload) => {
  return {
    type: Types.GET_CANDIDATE_DETAIL,
    payload: payload
  }
}
export const getCandidateToken = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/candidate/${id}/token`).then((res) => {
      dispatch({
        type: Types.GET_CANDIDATE_TOKEN,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const deleteCandidate = (id) => (dispatch) => {
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
export const uploadFile = (data) => () => {
  return new Promise((resolve, reject) => {
    api().post('/candidate/docs/upload', data).then((res) => {
      // dispatch({
      //   type: Types.SET_TOKEN_DATA,
      //   payload: res.data
      // })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const restoreCandidate = (id) => (dispatch) => {
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
