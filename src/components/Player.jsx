import { useState } from "react";

export default function Player({ name, symbol }) {
  const [newName, setNewName] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => {
    setEditMode((currEditMode) => !currEditMode);
  };
  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  return (
    <li>
      <span className="player">
        {editMode ? (
            <input type="text" required value={newName} onChange={handleChange} />
        ) : (
            <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEdit}>{!editMode ? "Edit" : "Save"}</button>
    </li>
  );
}
