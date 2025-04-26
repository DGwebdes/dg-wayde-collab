import axios from "axios";

const url = "http://localhost:9000/notes";
const liveUrl = "https://api-test-gold-three.vercel.app/notes";

export const editNote = async (noteId, data) => {
    try {
        const response = await axios.put(`${liveUrl}/${noteId}`, data);
        if (response.ok) {
            console.log("updated");
        }
    } catch (error) {
        console.error(error);
    }
};

export const getNotes = async () => {
    try {
        const response = await axios.get(liveUrl);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteNote = async (noteId) => {
    try {
        await axios.delete(`${liveUrl}/${noteId}`);
        return;
    } catch (error) {
        console.error(error);
    }
};
