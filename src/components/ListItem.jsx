import React, { useState } from "react";
import { editNote, deleteNote } from "../lib/utils";
import SpotlightCard from "./ui/SpotlightCard";

const ListItem = ({ item, onNoteUpdated, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [note, setNote] = useState(item);

    const updateNote = async () => {
        try {
            const _ = await editNote(item.id, note);
            onNoteUpdated(item.id, note.body);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => {
        if (isEdit) {
            updateNote();
        }
        setIsEdit(!isEdit);
    };

    const handleDelete = async () => {
        try {
            await deleteNote(item.id);
            onDelete(item.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <li key={item.id} className="">
            <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
            >
                <div className="text-center font-bold py-2 text-amber-400">
                    {item.title}
                </div>
                <div className="h-64 relative bg-zinc-900/50 rounded px-2 py-1">
                    {isEdit ? (
                        <textarea
                            className="w-full h-full px-2"
                            autoFocus
                            defaultValue={item.body}
                            onChange={(e) =>
                                setNote({ ...item, body: e.target.value })
                            }
                        ></textarea>
                    ) : (
                        <div className="">{item.body}</div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-1">
                        <button
                            onClick={handleEdit}
                            className=" text-gray-100 px-2 rounded"
                        >
                            {isEdit ? "Save" : "Edit"}
                        </button>
                        {isEdit && (
                            <button
                                onClick={() => setIsEdit(false)}
                                className="text-gray-100 px-2 rounded"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className=" text-gray-100 px-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </SpotlightCard>
        </li>
    );
};

export default ListItem;
