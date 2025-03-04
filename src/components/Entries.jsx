import React, { useEffect, useState } from "react";

function Entries() {
  const [entries, setEntries] = useState([]);
  const [myEntry, setMyEntry] = useState("");
  const [editId, setEditId] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) ?? [];
    if (storedEntries.length > 0) {
      setEntries(storedEntries);
    }
  }, []);

  const addEntry = () => {
    if (myEntry.trim()) {
      const newEntry = {
        id: entries.length > 0 ? entries[entries.length - 1].id + 1 : 1,
        entry: myEntry,
        img: "",
        date: new Date().toLocaleString(),
      };

      setEntries((prevEntries) => {
        const updatedEntries = [...prevEntries, newEntry];
        localStorage.setItem("entries", JSON.stringify(updatedEntries));
        return updatedEntries;
      });

      setMyEntry("");
    }
  };

  const handleEntryChange = (event) => {
    setMyEntry(event.target.value);
  };

  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEntries((prevEntries) => {
          const updatedEntries = prevEntries.map((entry) =>
            entry.id === id ? { ...entry, img: reader.result } : entry
          );
          localStorage.setItem("entries", JSON.stringify(updatedEntries));
          return updatedEntries;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addEntry();
    }
  };

  const handleDelete = (id) => {
    setEntries((prev) => {
      const updatedEntries = prev.filter((entry) => entry.id !== id);
      localStorage.setItem("entries", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  };

  const handleEdit = (id) => {
    if (editId === id) {
      setEntries((prev) => {
        const updatedEntries = prev.map((entry) =>
          entry.id === id ? { ...entry, entry: myEntry } : entry
        );
        localStorage.setItem("entries", JSON.stringify(updatedEntries));
        return updatedEntries;
      });
      setIsEditing(false);
      setEditId(null);
      setMyEntry(""); 
    } else {
      const entryToEdit = entries.find((entry) => entry.id === id);
      setMyEntry(entryToEdit.entry);
      setIsEditing(true); 
      setEditId(id);
    }
  };

  return (
    <div className="entryContainer w-full min-h-[100vh] flex flex-col items-start justify-start gap-4 p-10">
      <button
        className="btn btn-success bg-gradient-to-r from-blue-600 to-blue-800 rounded-[5px] px-10 py-2 text-[1.8rem] text-white font-medium capitalize tracking-[1px] cursor-pointer"
        onClick={addEntry}
      >
        Add Entry
      </button>

      <textarea
        className="textarea-entry w-[70%] p-4 mt-4 border border-gray-300 rounded-md text-2xl"
        value={myEntry}
        onChange={handleEntryChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your entry here..."
      />

      {entries.map((entry) => (
        <div
          key={entry.id}
          className="card flex justify-between items-center w-[70%] min-h-[15rem] bg-gray-100 px-15 py-7 rounded-[10px] border border-gray-200 drop-shadow-lg cursor-pointer"
        >
          <div className="card-body flex flex-col items-start justify-start gap-2">
            <input
              className="card-title text-3xl font-medium"
              readOnly
              value={`Entry #${entry.id}`}
            />
            {entry.img && (
              <img
                src={entry.img}
                alt="Entry"
                className="img-thumbnail w-[10rem]"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, entry.id)}
              className="file-input mt-2 text-xl"
            />
            <p className="card-date text-2xl">{entry.date}</p>
            {isEditing && editId === entry.id ? (
              <input
                type="text"
                value={myEntry}
                onChange={handleEntryChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md text-xl"
              />
            ) : (
              <p className="card-text text-3xl capitalize tracking-[1px]">
                {entry.entry || "Boş entry"}
              </p>
            )}
          </div>
          <div className="editBtn h-[20rem] flex flex-col items-end justify-end gap-3">
            <button
              onClick={() => handleEdit(entry.id)}
              className="btn btn-primary bg-gradient-to-r from-blue-700 to-blue-500 text-[1.7rem] text-white tracking-[1px] w-[10rem] h-[3rem] rounded cursor-pointer"
            >
              {isEditing && editId === entry.id ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => handleDelete(entry.id)}
              className="btn-delete btn-primary bg-gradient-to-r from-red-700 to-red-500 text-[1.7rem] text-white tracking-[1px] w-[10rem] h-[3rem] rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Entries;
