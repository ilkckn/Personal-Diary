import React from "react";
import { EntryContext } from "../context/EntryContext";
import { useContext } from "react";

function EntryItem({ entry }) {
  const { handleModal, handleDelete } = useContext(EntryContext);

  return (
    <div>
      <div className="entry-item w-[100rem] p-4 border border-gray-300 flex flex-col items-start gap-4">
        <h2>{entry.title}</h2>
        <p>{entry.content}</p>
        <p>{entry.date}</p>
        <img
          src={entry.image}
          alt={entry.title}
          className="w-[20rem] h-[20rem]"
        />
        <div className="entry-item-footer flex items-center gap-4">
          <button
            className="border border-gray-900 rounded px-5 py-[.5rem]"
            onClick={() => handleModal(entry.id)}
          >
            Eye
          </button>
          <button
            className="border border-gray-900 rounded px-5 py-[.5rem]"
            onClick={() => handleDelete(entry.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryItem;
