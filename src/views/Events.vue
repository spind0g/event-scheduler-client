<template>
    <div>
        <!-- <v-calendar v-model="focus" color="primary"></v-calendar> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Events',

    computed: {
        ...mapGetters({
            isLoading: 'loadingStatus/message',
            allEvents: 'events/all',
            event: 'events/selected',
        }),
    },

    methods: {
        ...mapActions({
            getAllEvents: 'events/getAll',
            viewEvent: 'events/view',
        }),

        selectEvent(eventId) {
            this.$store.dispatch(
                'loadingStatus/setMessage',
                'Gathering event data...',
            );

            this.viewEvent(eventId)
                .then(event => {
                    this.$store.dispatch('loadingStatus/finish');

                    return event;
                })
                .then(event =>
                    alert(`${event.starting_date} to ${event.ending_date}`),
                );
        },
    },

    created() {
        this.$store.dispatch('loadingStatus/setMessage', 'Fetching events...');

        this.getAllEvents()
            .then(() => this.$store.dispatch('loadingStatus/finish'))
            .catch(() => this.$store.dispatch('loadingStatus/finish'));
    },
};
</script>
