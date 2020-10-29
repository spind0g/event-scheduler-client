export const state = {
    success: '',
    errors: [],
};

export const getters = {
    success: ({ success }) => success,
    errors: ({ errors }) => errors,
    hasAlertSuccess: ({ success }) => (success ? true : false),
    hasAlertErrors: ({ errors }) => (errors.length ? true : false),
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
        state.errors = [];
    },
};

export const actions = {
    setSuccess({ commit }, message) {
        commit('CLEAR_ALERT_ERRORS');
        commit('SET_ALERT_SUCCESS', message);
    },

    setErrors({ commit }, errors) {
        commit('CLEAR_ALERT_SUCCESS');
        commit('SET_ALERT_ERRORS', errors);
    },
};
