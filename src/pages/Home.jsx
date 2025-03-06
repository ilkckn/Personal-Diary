import React from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import { EntryContext } from "../context/EntryContext";
import { useContext } from "react";
import EntryModal from "../components/EntryModal";

function Home() {
  const { isModalOpen } = useContext(EntryContext);
  return (
    <div className="home w-full min-h-[100vh] flex flex-col items-center gap-[10rem]">
      <EntryForm />
      <EntryList />
      {isModalOpen && <EntryModal />}
    </div>
  );
}

export default Home;
