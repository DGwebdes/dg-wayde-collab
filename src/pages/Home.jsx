import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getNotes } from "../lib/utils";
import ListItem from "../components/ListItem";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <Layout>
            <div className="border-b text-center text-3xl md:text-7xl font-bold mb-2">
                <h1>Notes</h1>
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
