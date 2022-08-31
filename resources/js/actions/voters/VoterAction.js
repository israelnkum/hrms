import { Types } from './Types'
import api from '../../utils/api'
export const getAllVoters = (id, pageNumber = 1) => async (dispatch) => {
  await api().get(`/election/${id}/voters?page=${pageNumber}`)
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_VOTERS,
        payload: res.data
      })
    })
}

export const downloadUploadFormat = () => () => {
  api().get('/voters/download-format',
    { responseType: 'blob' }
  )
    .then((res) => {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(new Blob([res.data]))
      link.setAttribute('download', 'uploadFormat.xlsx')
      document.body.appendChild(link)
      link.click()
    })
}

export const addNewVoter = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/voters/add', values).then((res) => {
      dispatch({
        type: Types.NEW_VOTER,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getVoterElections = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/voter/${id}/elections`).then((res) => {
      dispatch({
        type: Types.GET_VOTER_ELECTIONS,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const setVoterData = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/users/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.SET_VOTER_DATA,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
export const addVoterElection = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/voter/${values.id}/elections/add`, values).then((res) => {
      dispatch({
        type: Types.ADD_VOTER_ELECTION,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getVoterDetail = (payload) => {
  return {
    type: Types.GET_VOTER_DETAIL,
    payload: payload
  }
}

export const getVotingDetail = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/voter/${data.id}/election/${data.electionId}/detail`, data).then((res) => {
      dispatch({
        type: Types.GET_ELECTION_DETAIL,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getVotingResults = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/election/${data.electionId}/results`, data).then((res) => {
      dispatch({
        type: Types.GET_ELECTION_RESULTS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}


export const getRecentVoters = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/election/${id}/recent-voters`).then((res) => {
      dispatch({
        type: Types.GET_RECENT_VOTERS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const castVote = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/voter/${data.id}/election/${data.electionId}/cast-voting`, data).then((res) => {
      dispatch({
        type: Types.CAST_VOTE,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const uploadVoters = (data) => () => {
  return new Promise((resolve, reject) => {
    api().post('/voters/upload/', data).then((res) => {
      // dispatch({
      //   type: Types.SET_VOTER_DATA,
      //   payload: res.data
      // })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const deleteVoter = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const data = { voter: true }
    api().post(`/user/${id}/delete`, data).then((res) => {
      dispatch({
        type: Types.DELETE_VOTER,
        payload: res.data.id
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const removeVoterFromElection = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post(`/voter/${data.userId}/election/remove`, data).then((res) => {
      dispatch({
        type: Types.SET_VOTER_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getVotersStat = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/voters/statistics/election/${id}`).then((res) => {
      dispatch({
        type: Types.VOTER_STATS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getResults = (voterId, electionId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/voter/${voterId}/election/${electionId}/results`).then((res) => {
      dispatch({
        type: Types.VOTER_RESULTS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
