import React from "react";
import { EntryContext } from "../context/EntryContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EntryModal() {
  const { entries } = useContext(EntryContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const entry = entries.find((e) => e.id === Number(id));

  if (!entry) return <p>Entry not found</p>;

  return (
    <div
      className="entry-modal w-full h-full fixed top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center"
      onClick={() => navigate("/")}
    >
      <img src="" alt="" />
      <div
        className="entry-modal-content absolute w-[50%] min-h-[30%] bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => navigate("/")}
        >
          Close
        </button>
        <h2>{entry.title}</h2>
        <p>{entry.content}</p>
        <p>{entry.date}</p>
        <img src={entry.image} alt={entry.title} className="w-[80%]" />
      </div>
    </div>
  );
}

export default EntryModal;
