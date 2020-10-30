export const dateUtil = {
    enumerateDateRange: (start, end) => {
        let now = start.clone();
        let dates = [];

        while (now.isSameOrBefore(end)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'day');
        }

        return dates;
    },
};
