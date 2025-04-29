import axios from "axios";

const liveUrl = "http://localhost:9000/notes";
// const liveUrl = "https://api-test-gold-three.vercel.app/notes";

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

export const createNote = async (data) => {
    // console.log("Created");
    if (!data) return;
    try {
        const _ = await axios.post(liveUrl, data);
        console.log("Done");
    } catch (error) {
        console.error(error);
    }
};
