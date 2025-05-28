async function getAllData() {
    const url = `${process.env.REACT_APP_HOST}/alldata`;
    console.log(url);
    const response = await fetch(url, { signal: AbortSignal.timeout(1000 * 5) });
    const data = await response.json();
    return data;
}

async function getDataById(id) {
    const response = await fetch(`/data/${id}`);
    const data = await response.json();
    return data;
}

async function getData(params) {
    if(!params.length) {
        throw new Error('Required Array<Map<string, string>>');
    }
    let queryParams = [];
    params.forEach((param) => {
        for(const key in param) {
            if(param.hasOwnProperty(key)) {
                queryParams.push(`${key}=${param[key]}`)
            }
        }
    });
    const response = await fetch(`/data?${queryParams.join('&')}`);
    const data = await response.json();
    return data;
}

async function addNewData(data) {
    const response = await fetch('/data', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

async function deleteData(id) {
    const response = await fetch(`/data/${id}`, {
        method: 'DELETE'
    });
    return response;
}

async function updateData(id, data) {
    const response = await fetch(`/data/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

export { getAllData, getDataById, getData, addNewData, deleteData, updateData };