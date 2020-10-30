<template>
    <div class="mx-4 my-3">
        <h3>New Event</h3>

        <form @submit.prevent="saveEvent">
            <v-text-field
                type="text"
                v-model="form.event.name"
                placeholder="Event name"
                :error="errorsIncludename"
            />

            <small v-html="eventDateRange"></small>

            <v-date-picker
                v-model="dateRange"
                color="green lighten-1"
                range
                no-title
            ></v-date-picker>

            <v-checkbox
                v-for="(day, index) in days"
                :key="index"
                :label="day"
                v-model="form.event.selected_days"
                :value="index + 1"
                :disabled="
                    form.checkboxesAreReadOnly || disabledDaysInclude(index + 1)
                "
                :error="errorsIncludeSelectedDays"
            />

            <v-btn
                @click.prevent="saveEvent"
                :disabled="eventFormDataIsIncomplete"
                color="primary"
            >
                Save
            </v-btn>

            <v-btn
                @click.prevent="clearData"
                :disabled="!formWasTouched"
                class="mx-3"
            >
                Reset
            </v-btn>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import range from 'lodash/range';

export default {
    name: 'NewEvent',

    data: () => ({
        dateRange: [],
        disabledDays: [],

        form: {
            event: {
                name: '',
                starting_date: '',
                ending_date: '',
                selected_days: [],
            },

            errors: [],
            checkboxesAreReadOnly: false,
        },
    }),

    watch: {
        dateRange(val) {
            if (this.form.checkboxesAreReadOnly) {
                this.form.checkboxesAreReadOnly = false;
            }

            // exchange starting and ending dates
            if (val.length === 2) {
                if (val[0] < val[1]) {
                    this.form.event.starting_date = val[0];
                    this.form.event.ending_date = val[1];
                } else {
                    this.form.event.starting_date = val[1];
                    this.form.event.ending_date = val[0];
                }
            } else {
                this.disabledDays = [];
                this.form.event.starting_date = '';
                this.form.event.ending_date = '';
            }

            if (val.length === 2) {
                const numberOfDays =
                    Math.abs(moment(val[0]).diff(moment(val[1]), 'days')) + 1;

                if (numberOfDays <= 7) {
                    // auto-select day checkbox if event is one day
                    if (numberOfDays === 1) {
                        const intDay =
                            parseInt(moment(val[0]).format('d')) === 0
                                ? 7
                                : parseInt(moment(val[0]).format('d'));

                        this.form.checkboxesAreReadOnly = true;
                        this.form.event.selected_days = [intDay];
                    }

                    // disable non-applicable day checkboxes if selected range
                    else {
                        this.form.event.selected_days = [];

                        const intDays = range(1, 8); // why 8?

                        const startingDate = val[0] < val[1] ? val[0] : val[1];
                        const endingDate = val[1] > val[0] ? val[1] : val[0];
                        const enumeratedDateRange = this.enumerateDateRange(
                            moment(startingDate),
                            moment(endingDate),
                        );

                        enumeratedDateRange.forEach(date => {
                            const intDay =
                                parseInt(moment(date).format('d')) === 0
                                    ? 7
                                    : parseInt(moment(date).format('d'));
                            const index = intDays.indexOf(intDay);

                            if (index > -1) {
                                intDays.splice(index, 1);
                            }
                        });

                        this.disabledDays = intDays;
                    }
                }
            }
        },
    },

    computed: {
        ...mapGetters({
            alertHasErrors: 'alerts/errors',
        }),

        // data
        days() {
            const intDays = range(1, 8); // why 8?

            return intDays.map(intDay =>
                moment()
                    .day(intDay)
                    .format('dddd'),
            );
        },

        eventDateRange() {
            const { starting_date, ending_date } = this.form.event;

            if (starting_date && ending_date) {
                if (starting_date !== ending_date) {
                    return `${moment(starting_date).format('LL')}
                        to
                    ${moment(ending_date).format('LL')}`;
                } else {
                    return moment(starting_date).format('LL');
                }
            }

            return 'Select a date range from the calendar below.<br /><sub>Double-click for a date single-day event</sub>';
        },

        // form
        formWasTouched() {
            const {
                name,
                starting_date,
                ending_date,
                selected_days,
            } = this.form.event;

            return name || starting_date || ending_date || selected_days.length;
        },

        eventFormDataIsIncomplete() {
            const {
                name,
                starting_date,
                ending_date,
                selected_days,
            } = this.form.event;

            return (
                !name || !starting_date || !ending_date || !selected_days.length
            );
        },

        eventDateRangeIsValid() {
            const { starting_date, ending_date } = this.form.event;

            return (
                starting_date &&
                starting_date ===
                    moment(starting_date, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                ending_date &&
                ending_date ===
                    moment(ending_date, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                moment(starting_date) > moment(ending_date)
            );
        },

        // errors
        errorsIncludename() {
            return this.form.errors.toString().includes('name');
        },

        errorsIncludeStartingDate() {
            return this.form.errors.toString().includes('starting date');
        },

        errorsIncludeEndingDate() {
            return this.form.errors.toString().includes('ending date');
        },

        errorsIncludeSelectedDays() {
            return this.form.errors.toString().includes('selected days');
        },
    },

    methods: {
        ...mapActions({
            setLoadingStatusMessage: 'loadingStatus/setMessage',
            finishLoading: 'loadingStatus/finish',
            addEvent: 'events/add',
            assertEventWasAdded: 'alerts/setSuccess',
            showAlertErrors: 'alerts/setErrors',
            dismissAlertErrors: 'alerts/dismissErrors',
        }),

        enumerateDateRange(start, end) {
            let now = start.clone();
            let dates = [];

            while (now.isSameOrBefore(end)) {
                dates.push(now.format('YYYY-MM-DD'));
                now.add(1, 'day');
            }

            return dates;
        },

        disabledDaysInclude(intDay) {
            return this.disabledDays.includes(intDay);
        },

        clearData() {
            this.form.event.name = '';
            this.form.event.starting_date = '';
            this.form.event.ending_date = '';
            this.form.event.selected_days = [];

            this.form.errors = [];
            this.form.checkboxesAreReadOnly = false;

            this.disabledDays = [];
            this.dateRange = [];

            if (this.alertHasErrors) {
                this.dismissAlertErrors();
            }
        },

        saveEvent() {
            this.setLoadingStatusMessage('Saving event...');
            this.dismissAlertErrors();

            this.addEvent(this.form.event)
                .then(newEvent =>
                    this.assertEventWasAdded(
                        `Event "${newEvent.name}" successfully saved`,
                    ),
                )
                .then(() => this.clearData())
                .then(() => this.finishLoading())
                .catch(errors => {
                    const {
                        name,
                        starting_date,
                        ending_date,
                        selected_days,
                    } = errors;

                    const errorMessage = {
                        subject: 'Unable to add event:',
                        items: [],
                    };

                    if (name) {
                        name.forEach(message =>
                            errorMessage.items.push(message),
                        );
                    }

                    if (starting_date || ending_date) {
                        errorMessage.items.push(
                            'A date range for this event is required.',
                        );
                    }

                    if (selected_days) {
                        selected_days.forEach(message =>
                            errorMessage.items.push(message),
                        );
                    }

                    this.form.errors = errorMessage.items;

                    this.showAlertErrors(errorMessage);
                    this.finishLoading();
                });
        },
    },
};
</script>
