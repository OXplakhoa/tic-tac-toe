import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [newName, setNewName] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const toggleEdit = () => {
    setEditMode((currEditMode) => !currEditMode);
    if (editMode){
        onChangeName(symbol,newName);
    }
  };
  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  return (
    <li className={isActive && 'active'}>
      <span className="player">
        {editMode ? (
            <input type="text" required value={newName} onChange={handleChange} />
        ) : (
            <span className="player-name">{newName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEdit}>{!editMode ? "Edit" : "Save"}</button>
    </li>
  );
}
