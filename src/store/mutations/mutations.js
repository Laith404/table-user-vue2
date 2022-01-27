export default{
    SET_PEOPLE: (state, response) => {
        return state.people = response;
      },
      DELETE_PEOPLE: (state, response) => {
        let item = state.people.find( i => i.id === response.id);
        if(item) {
          state.people = state.people.filter(i => i.id !== response.id);
        }
      },
      SET_SEARCH_PRODUCT: (state, value) => {
        state.searchValue = value;
      },
      SET_PARAMETERS_SORT: (state, value) => {
        state.paramSort = value;
      }
}