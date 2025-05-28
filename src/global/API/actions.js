import { getAllData, getDataById, getData, addNewData, deleteData, updateData } from "./api";

const getInitialState = async () => {
    try {
        const data = await getAllData();
        return data || [];
    } catch (error) {
        throw error;
    }
};

export { getInitialState };