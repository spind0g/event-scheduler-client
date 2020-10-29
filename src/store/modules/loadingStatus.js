export const state = {
    message: '',
};

export const getters = {
    message: ({ message }) => message,
};

export const mutations = {
    SET_LOADING_STATUS_MESSAGE(state, message) {
        state.message = message;
    },

    FINISH_LOADING(state) {
        state.message = '';
    },
};

export const actions = {
    setMessage({ commit }, message) {
        commit('SET_LOADING_STATUS_MESSAGE', message);
    },

    finish({ commit }) {
        commit('FINISH_LOADING');
    },
};
