import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { createNote, getNotes } from "../lib/utils";
import ListItem from "../components/ListItem";
import CreateNote from "../components/CreateNote";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewNote, setIsNewNote] = useState(false);
    const [newNote, setNewNote] = useState("");

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
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, body: updatedBody } : note,
            ),
        );
    };
    const handleDeletedNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleNewNote = () => {
        setIsNewNote(!isNewNote);
    };

    return (
        <Layout>
            {isNewNote && (
                <div className=" bg-amber-200 absolute w-full inset-0 z-5 flex justify-center items-center">
                    <CreateNote value={newNote} onNewNote={setNewNote} />
                </div>
            )}
            <div className="border-b text-center text-3xl md:text-7xl font-bold mb-2">
                <div className="flex items-center justify-between py-2">
                    <h1>Notes</h1>
                    <button
                        className="text-sm md:text-2xl px-2 rounded hover:cursor-pointer border z-10"
                        onClick={handleNewNote}
                    >
                        Add Note
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
