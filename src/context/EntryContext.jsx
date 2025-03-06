import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EntryContext = createContext();

const EntryContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    date: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(entries.sort((a, b) => b.id - a.id));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.title || !entry.content) return alert("Please fill the form");
    setEntries([{ ...entry, id: Date.now() }, ...entries]);
    setEntry({ title: "", content: "", date: "", image: "" });
    localStorage.setItem(
      "entries",
      JSON.stringify([...entries, { ...entry, id: Date.now() }])
    );
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
    localStorage.setItem(
      "entries",
      JSON.stringify(entries.filter((e) => e.id !== id))
    );
  };

  const handleModal = (id) => {
    navigate(`/entry/${id}`);
  };

  return (
    <EntryContext.Provider
      value={{
        entries,
        entry,
        setEntry,
        handleSubmit,
        handleDelete,
        handleModal,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export default EntryContextProvider;
