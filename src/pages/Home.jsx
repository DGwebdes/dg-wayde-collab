import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { createNote, getNotes } from "../lib/utils";
import ListItem from "../components/ListItem";
import CreateNote from "../components/CreateNote";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewNote, setIsNewNote] = useState(false);
    const [newNote, setNewNote] = useState({ title: "", body: "" });
    const notifyError = () => toast("Something went Wrong");
    const emptyFields = () => toast("Empty fields.");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getNotes();
                if (!response.data) {
                    notifyError();
                }
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                notifyError(error);
            }
        };
        fetchNotes();
    }, []);

    const handleNoteUpdate = (id, updatedBody) => {
        if (!updatedBody) {
            emptyFields();
            alert("Empty fields");
            return;
        }
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, body: updatedBody } : note,
            ),
        );
    };
    const handleDeletedNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleCreateNote = () => {
        if (newNote.title === "" || newNote.body === "") {
            emptyFields();
            return;
        }
        createNote(newNote);
        setNewNote({ title: "", body: "" });
        setIsNewNote(false);
        window.location = "/";
    };

    return (
        <Layout>
            {isNewNote ? (
                <div className="bg-zinc-900 absolute w-full h-full inset-0 z-5 flex flex-col justify-center items-center px-10">
                    <CreateNote
                        value={newNote}
                        onNewNote={setNewNote}
                        onCreate={handleCreateNote}
                    />
                    <button
                        className="text-sm md:text-2xl px-2 rounded hover:cursor-pointer border z-10 mt-5"
                        onClick={() => setIsNewNote(!isNewNote)}
                    >
                        {"Cancel"}
                    </button>
                </div>
            ) : (
                <>
                    <div className="border-b text-center text-3xl md:text-7xl font-bold mb-2">
                        <div className="flex items-center justify-between py-2">
                            <h1>Notes</h1>
                            <button
                                className="text-sm md:text-2xl px-2 rounded hover:cursor-pointer border z-10"
                                onClick={() => setIsNewNote(!isNewNote)}
                            >
                                {"Add Note"}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        {loading && <h1>Loading ...</h1>}
                        <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 grow">
                            {notes.map((item) => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    onNoteUpdated={handleNoteUpdate}
                                    onDelete={handleDeletedNote}
                                />
                            ))}
                        </ul>
                    </div>
                    <ToastContainer />
                </>
            )}
        </Layout>
    );
};

export default Home;
