import axios from 'axios';

export const state = {
    all: [],
    selected: null,
};

export const getters = {
    all: ({ all }) => all,
    selected: ({ selected }) => selected,
};

export const mutations = {
    SET_ALL_EVENTS(state, allEvents) {
        state.all = allEvents;
    },

    ADD_EVENT(state, event) {
        state.all = [event, ...state.all];
    },

    SET_SELECTED_EVENT(state, selectedEvent) {
        state.selected = selectedEvent;
    },
};

export const actions = {
    async getAll({ commit }) {
        try {
            const res = await axios({
                url: '/events',
                method: 'get',
            });

            commit('SET_ALL_EVENTS', res.data.events);

            return res.data.events;
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    },

    async add({ commit }, event) {
        try {
            const res = await axios({
                url: '/events',
                method: 'post',
                data: event,
            });

            const newEvent = res.data.event;

            commit('ADD_EVENT', newEvent);

            return newEvent;
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    },

    async view({ state, commit }, eventId) {
        const event = await state.all.find(({ id }) => id === eventId);

        commit('SET_SELECTED_EVENT', event);

        return event;
    },
};
