import SpotlightCard from "./SpotlightCard";

const CreateNote = ({ value, onNewNote }) => {
    return (
        <SpotlightCard>
            <div className="text-center font-bold py-2 text-amber-400">{}</div>
            <div className="h-64 bg-gray-900/50 rounded px-2 py-1">
                <textarea
                    name="note-body"
                    className="w-full h-full"
                    defaultValue={value}
                    onChange={(e) => onNewNote(e.target.value)}
                ></textarea>
                <div className="absolute bottom-0 left-0 w-full flex justify-between px-1">
                    <button className=" text-gray-100 px-2 rounded">{}</button>

                    <button className=" text-gray-100 px-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default CreateNote;
