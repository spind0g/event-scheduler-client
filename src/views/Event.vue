<template>
    <v-sheet height="600">
        <template v-if="groupedEventDateRangeByMonth.length">
            <div
                v-for="(month, index) in groupedEventDateRangeByMonth"
                :key="index"
                class="calendar"
            >
                <h2 class="month">{{ getMonthName(month[0]) }}</h2>

                <div
                    v-for="(date, index) in month"
                    :key="index"
                    class="day"
                    :class="[selectedDaysIncludeDate(date) ? 'event' : '']"
                >
                    <div>
                        {{ getDateVal(date) }} {{ getDayName(date) }}

                        <template v-if="selectedDaysIncludeDate(date)">
                            <br />
                            <strong>{{ eventName }}</strong>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import moment from 'moment';
import { dateUtil } from '@/utils';

export default {
    name: 'Event',

    data: () => ({
        groupedEventDateRangeByMonth: [],
        eventName: '',
        selectedDays: [],
    }),

    watch: {
        selectedEvent(val) {
            if (val) {
                const enumeratedDateRange = this.enumerateDateRange(
                    val.starting_date,
                    val.ending_date,
                );

                this.setGroupedEventDateRangeByMonth(enumeratedDateRange);
                this.eventName = val.name;
                this.selectedDays = val.selected_days.map(({ value }) => value);
            } else {
                this.clearData();
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
        ...dateUtil,

        selectedDaysIncludeDate(date) {
            return this.selectedDays.includes(this.getDayVal(date));
        },

        setGroupedEventDateRangeByMonth(dateRange) {
            const monthName = date => moment(date).format('MMMM');

            const result = _.chain(dateRange)
                .groupBy(monthName)
                .value();

            this.groupedEventDateRangeByMonth = _.values(result);
        },

        clearData() {
            this.groupedEventDateRangeByMonth = [];
        },
    },
};
</script>

<style scoped>
.calendar {
    max-width: 560px;
    margin: 20px auto;
}

.day {
    height: 80px;
    display: flex;
    color: #289036;
    padding: 5px;
    box-shadow: -1px -1px #3dd051, inset -1px -1px 0 0 #3dd051;
}

.event {
    background-color: #cff5d4;
}
</style>
