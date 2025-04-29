import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { createNote, getNotes } from "../lib/utils";
import ListItem from "../components/ListItem";
import CreateNote from "../components/CreateNote";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewNote, setIsNewNote] = useState(false);
    const [newNote, setNewNote] = useState({ title: "", body: "" });

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getNotes();
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotes();
    }, []);

    const handleNoteUpdate = (id, updatedBody) => {
        if (!updatedBody) {
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
            alert("Empty fields");
            return;
        }
        createNote(newNote);
        setNewNote({ title: "", body: "" });
        setIsNewNote(false);
        window.location = "/";
    };

    return (
        <Layout>
            {isNewNote && (
                <div className="bg-zinc-900 absolute w-full h-full inset-0 z-5 flex justify-center items-center px-10">
                    <CreateNote
                        value={newNote}
                        onNewNote={setNewNote}
                        onCreate={handleCreateNote}
                    />
                </div>
            )}
            <div className="border-b text-center text-3xl md:text-7xl font-bold mb-2">
                <div className="flex items-center justify-between py-2">
                    <h1>Notes</h1>
                    <button
                        className="text-sm md:text-2xl px-2 rounded hover:cursor-pointer border z-10"
                        onClick={() => setIsNewNote(!isNewNote)}
                    >
                        {isNewNote ? "Cancel" : "Add Note"}
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
        </Layout>
    );
};

export default Home;
