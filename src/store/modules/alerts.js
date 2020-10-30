export const state = {
    success: '',
    errors: null,
};

export const getters = {
    success: ({ success }) => success,
    errors: ({ errors }) => errors,
};

export const mutations = {
    SET_ALERT_SUCCESS(state, message) {
        state.success = message;
    },

    SET_ALERT_ERRORS(state, errors) {
        state.errors = errors;
    },

    CLEAR_ALERT_SUCCESS(state) {
        state.success = '';
    },

    CLEAR_ALERT_ERRORS(state) {
        state.errors = null;
    },
};

export const actions = {
    setSuccess({ dispatch, commit }, message) {
        dispatch('dismissErrors');
        commit('SET_ALERT_SUCCESS', message);
    },

    setErrors({ dispatch, commit }, errors) {
        dispatch('dismissSuccess');
        commit('SET_ALERT_ERRORS', errors);
    },

    dismissSuccess({ commit }) {
        commit('CLEAR_ALERT_SUCCESS');
    },

    dismissErrors({ commit }) {
        commit('CLEAR_ALERT_ERRORS');
    },

    dismissAll({ state, commit }) {
        if (state.success) {
            commit('CLEAR_ALERT_SUCCESS');
        }

        if (state.errors) {
            commit('CLEAR_ALERT_ERRORS');
        }
    },
};
