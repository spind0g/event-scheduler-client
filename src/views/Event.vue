<template>
    <v-sheet height="600">
        <v-calendar
            v-if="events.length && !loadingStatusMessage"
            ref="calendar"
            :events="events"
            :event-color="getEventColor"
        />
    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Event',

    data: () => ({
        events: [],
        eventColors: [
            'blue',
            'indigo',
            'deep-purple',
            'cyan',
            'green',
            'orange',
            'grey darken-1',
        ],
    }),

    watch: {
        selectedEvent(val) {
            if (val) {
                this.events = [
                    {
                        name: val.name,
                        start: val.starting_date,
                        end: val.ending_date,
                        color: this.eventColors[
                            this.rnd(0, this.eventColors.length - 1)
                        ],
                        timed: false,
                    },
                ];
            }
        },
    },

    computed: {
        ...mapGetters({
            loadingStatusMessage: 'loadingStatus/message',
            selectedEvent: 'events/selected',
        }),
    },

    methods: {
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },

        getEventColor(event) {
            return event.color;
        },
    },
};
</script>
