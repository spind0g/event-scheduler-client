<template>
    <div>
        <template v-if="allEvents.length">
            <event
                v-for="event in allEvents"
                :key="event.id"
                :event="event"
                :select="selectEvent"
                style="cursor: pointer;"
            />
        </template>

        <template v-if="!isLoading && !allEvents.length">
            You have no events
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Event from '@/components/Event.vue';

export default {
    name: 'Events',

    components: {
        Event,
    },

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
