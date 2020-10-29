<template>
    <div>
        <h3>New Event</h3>

        <form @submit.prevent="saveEvent">
            <input
                type="text"
                v-model="form.event.name"
                placeholder="Event name"
                autofocus
            />

            <br />

            <input
                type="text"
                v-model="form.event.starting_date"
                placeholder="Staring date"
            />

            <br />

            <input
                type="text"
                v-model="form.event.ending_date"
                placeholder="Ending date"
            />

            <div v-if="startingDateIsLaterThanEndingDate">
                <br />
                <small>
                    <em>
                        This event's starting date is later than its ending.
                        They will be automatically exchanged when saved.
                    </em>
                </small>
                <br />
            </div>

            <br />

            <div v-for="(day, index) in days" :key="day + index">
                <input
                    type="checkbox"
                    v-model="form.event.selected_days"
                    :id="index"
                    :value="index + 1"
                />
                <label :for="index">{{ day }}</label>
            </div>

            <!-- <button type="submit" :disabled="eventFormDataIsIncomplete"> -->
            <button type="submit">
                Save
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
    name: 'NewEvent',

    data: () => ({
        form: {
            event: {
                name: '',
                starting_date: '',
                ending_date: '',
                selected_days: [],
            },
        },
    }),

    computed: {
        days() {
            const intDays = [...Array(7).keys()]; // 18 chars

            return intDays.map(intDay =>
                moment()
                    .day(intDay + 1)
                    .format('ddd'),
            );
        },

        eventFormDataIsIncomplete() {
            const {
                name,
                starting_date,
                ending_date,
                selected_days,
            } = this.form.event;

            return (
                !name ||
                !starting_date ||
                !ending_date ||
                !selected_days.length ||
                // TODO: remove after ui design implementation
                starting_date !==
                    moment(starting_date, 'YYYY-MM-DD').format('YYYY-MM-DD') ||
                ending_date !==
                    moment(ending_date, 'YYYY-MM-DD').format('YYYY-MM-DD')
            );
        },

        startingDateIsLaterThanEndingDate() {
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
    },

    methods: {
        ...mapActions({
            addEvent: 'events/add',
            assertEventWasAdded: 'alerts/setSuccess',
            showErrors: 'alerts/setErrors',
            showWarning: 'alerts/setWarning',
        }),

        saveEvent() {
            this.addEvent(this.form.event)
                .then(() =>
                    this.assertEventWasAdded('Event successfully saved'),
                )
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

                    if (starting_date) {
                        starting_date.forEach(message =>
                            errorMessage.items.push(message),
                        );
                    }

                    if (ending_date) {
                        ending_date.forEach(message =>
                            errorMessage.items.push(message),
                        );
                    }

                    if (selected_days) {
                        selected_days.forEach(message =>
                            errorMessage.items.push(message),
                        );
                    }

                    this.showErrors(errorMessage);
                });
        },
    },
};
</script>
