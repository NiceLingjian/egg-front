import { resetRouter } from '@/router'
import $ajax from '@/libs/ajax'
const state = {
  token: '',
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      $ajax.post('/user/login',{ username: username.trim(), password }).then(response => {
        commit('SET_TOKEN', response.data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      $ajax.post('/user/logout').then(() => {
        commit('SET_TOKEN', '')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      $ajax.get('/user/info',{}).then(response => {
        commit('SET_NAME', response.data.username)
        commit('SET_AVATAR', response.data.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

