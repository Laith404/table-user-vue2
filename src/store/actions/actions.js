export default{
    GET_SEARCH_PRODUCT({commit}, value) {
        commit('SET_SEARCH_PRODUCT', value)
      },
      GET_PARAMETERS_SORT({commit}, value) {
        commit("SET_PARAMETERS_SORT", value)
      }
}