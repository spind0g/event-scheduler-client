<template>
    <v-app>
        <v-navigation-drawer v-bind:width="325" app>
            <new-event />
        </v-navigation-drawer>

        <v-app-bar app>
            <v-toolbar-title>Event Scheduler</v-toolbar-title>
        </v-app-bar>

        <v-main class="mx-4 my-4">
            <v-alert v-if="successAlertMessage" text type="success" dismissible>
                {{ successAlertMessage }}
            </v-alert>

            <v-alert v-if="errorAlertMessage" text type="error" dismissible>
                <h3>{{ errorAlertMessage.subject }}</h3>

                <ol>
                    <li
                        v-for="(error, index) in errorAlertMessage.items"
                        :key="index"
                    >
                        {{ error }}
                    </li>
                </ol>
            </v-alert>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NewEvent from '@/components/NewEvent.vue';

export default {
    name: 'App',

    components: {
        NewEvent,
    },

    computed: {
        ...mapGetters({
            loadingStatusMessage: 'loadingStatus/message',
            successAlertMessage: 'alerts/success',
            errorAlertMessage: 'alerts/errors',
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
