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

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.fetcher = async (url, options) => {
    const id = getCookie('sessionId');
    if (id) {
        options.headers = {...options.headers, 'sessionid': id};
    }
    return await fetch(url, { ...options });
}