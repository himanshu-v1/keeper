import { getAllData, getData, addNewData, deleteData, updateData } from "../global/API/api";

const getInitialState = async () => {
    try {
        const data = await getAllData();
        return data || [];
    } catch (error) {
        throw error;
    }
};

const addData = async (data) => {
    try {
        const response = await addNewData(data);
        if(response.status !== 200) {
            return false;
        }
        const _data = await response.json();
        return _data._id;
    } catch (error) {
        throw error;
    }
};

const removeData = async (id) => {
    try {
        await deleteData(id);
        return 'success';
    } catch (error) {
        throw error;
    }
};

const editData = async (data) => {
    try {
        const response = await updateData(data._id, data);
        if(response.status !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    }
};

export { getInitialState, addData, removeData, editData };