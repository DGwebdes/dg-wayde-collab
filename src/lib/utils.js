import axios from "axios";

const url = "http://localhost:9000/notes";

export const editNote = async (noteId, data) => {
    try {
        const response = await axios.put(`${url}/${noteId}`, data);
        if (response.ok) {
            console.log("updated");
        }
    } catch (error) {
        console.error(error);
    }
};

export const getNotes = async () => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteNote = async (noteId) => {
    try {
        await axios.delete(`${url}/${noteId}`);
        return;
    } catch (error) {
        console.error(error);
    }
};
