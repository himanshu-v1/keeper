const data = [
    {
        _id: 1,
        item: 'Amazon',
        amt: 299,
        date: '2025-05-31'
    },
    {
        _id: 1,
        item: 'Utilities',
        amt: 1499,
        date: '2025-05-31'
    }
];

const setTestData = (dispatch, action) => {
    dispatch(action(data));
};

export default setTestData;