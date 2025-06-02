const url = process.env.REACT_APP_HOST;

async function getAllData() {
    // console.log(url);
    const response = await window.fetcher(`${url}/alldata`, { signal: AbortSignal.timeout(1000 * 5) });
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
    const response = await window.fetcher(`${url}/data?${queryParams.join('&')}`);
    const data = await response.json();
    return data;
}

async function addNewData(data) {
    const response = await window.fetcher(`${url}/data`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

async function deleteData(id) {
    const response = await window.fetcher(`${url}/delete/${id}`, {
        method: 'DELETE'
    });
    return response;
}

async function updateData(id, data) {
    const response = await window.fetcher(`${url}/update/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

async function auth(u, k, isMet) {
    const response = await window.fetcher(`${url}/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({u: u, k: k, isMet: isMet})
    });
    const data = await response.json();
    return data;
}

export { getAllData, getData, addNewData, deleteData, updateData, auth };