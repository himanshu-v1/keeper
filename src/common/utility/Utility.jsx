export const clearForms = () => {
    document.querySelectorAll('input:not([noclear])').forEach((input) => {
        input.value = '';
        input.focus();
        input.blur();
    });
}

export const months = [
    'months',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];