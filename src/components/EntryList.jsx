import React from "react";
import { EntryContext } from "../context/EntryContext";
import { useContext } from "react";
import EntryItem from "./EntryItem";

function EntryList() {
  const { entries, entry } = useContext(EntryContext);

  return (
    <div>
      <div className="entry-list flex flex-col gap-4">
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default EntryList;
