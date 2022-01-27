import axios from "axios"

export default {
    GET_API({commit}) {
        return axios('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users', {
        method: "GET"
      })
        .then((response) => {
          commit('SET_PEOPLE', response.data);
          return response;
        })
        .catch((error) => {
          console.log(error)
          return error;
        })
      }
}