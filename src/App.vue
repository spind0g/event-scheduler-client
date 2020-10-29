<template>
    <div>
        <template v-if="loadingStatusMessage">
            {{ loadingStatusMessage }}
            <br />
        </template>

        <template v-if="successAlert">
            <span @click="dismissSuccessAlert">{{ successAlert }}</span>
            <br />
        </template>

        <template v-if="errorAlert">
            <div @click="dismissErrorAlert">
                <h3>{{ errorAlert.subject }}</h3>
                <ol>
                    <li v-for="(error, index) in errorAlert.items" :key="index">
                        {{ error }}
                    </li>
                </ol>
            </div>
            <br />
        </template>

        <navigation />

        <new-event />

        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/Navigation.vue';
import NewEvent from '@/components/NewEvent.vue';

export default {
    name: 'App',

    components: {
        Navigation,
        NewEvent,
    },

    computed: {
        ...mapGetters({
            loadingStatusMessage: 'loadingStatus/message',
            successAlert: 'alerts/success',
            errorAlert: 'alerts/errors',
        }),
    },

    methods: {
        ...mapActions({
            dismissSuccessAlert: 'alerts/dismissSuccess',
            dismissErrorAlert: 'alerts/dismissError',
        }),
    },
};
</script>
