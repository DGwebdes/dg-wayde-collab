import { ToastContainer } from "react-toastify";
import SpotlightCard from "./ui/SpotlightCard";

const CreateNote = ({ value, onNewNote, onCreate }) => {
    return (
        <div className="w-full md:w-[50%]">
            <SpotlightCard>
                <div className="text-center font-bold py-2 text-amber-400">
                    <input
                        type="text"
                        placeholder="Title"
                        className="px-1"
                        onChange={(e) =>
                            onNewNote({ ...value, title: e.target.value })
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full h-64">
                    <textarea
                        name="note-body"
                        className="w-full h-full px-1"
                        defaultValue={value.body}
                        onChange={(e) =>
                            onNewNote({ ...value, body: e.target.value })
                        }
                    ></textarea>
                    <button
                        className="border text-gray-100 px-2 rounded self-center"
                        onClick={onCreate}
                    >
                        Save
                    </button>
                    <ToastContainer />
                </div>
            </SpotlightCard>
        </div>
    );
};

export default CreateNote;
