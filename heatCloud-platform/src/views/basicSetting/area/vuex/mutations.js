export const mutations = {
  SET_LIST: (state, data) => {
    state.data = data.list
  },
  SET_AREA_PART_ONE: (state, data) => {
    state.areaPartOne = data
  },
  SET_AREA_PART_TWO: (state, data) => {
    state.areaPartTwo = data
  },
  SET_PROVINCES: (state, data) => {
    state.provinces = data
  },
  SET_CITIES: (state, data) => {
    state.cities = data
  },
  SET_COUNTIES: (state, data) => {
    state.counties = data
  },
  SET_STREETS: (state, data) => {
    state.streets = data
  },
  SET_VILLAGES: (state, data) => {
    state.villages = data
  },
};
