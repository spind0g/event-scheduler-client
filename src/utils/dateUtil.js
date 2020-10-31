import moment from 'moment';

export const dateUtil = {
    enumerateDateRange: (start, end) => {
        let now = moment(start).clone();
        let dates = [];

        while (now.isSameOrBefore(moment(end))) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'day');
        }

        return dates;
    },

    getMonthName: date => {
        return moment(date).format('MMMM');
    },

    getDateVal: date => {
        return moment(date).format('D');
    },

    getDayVal: date => {
        return moment(date).format('d');
    },
};
