import { ChangeEvent, useState, type FormEvent } from "react";

interface QueueFormProps {
  onAddGroup: (groupName: string, riders: number) => void;
}

function QueueForm({ onAddGroup }: QueueFormProps) {
  const [groupName, setGroupName] = useState("");
  const [riders, setRiders] = useState("1");

    function handleGroupNameChange(event: ChangeEvent<HTMLInputElement>) {  
        setGroupName(event.target.value);
     }
    
    function handleRidersChange(event: ChangeEvent<HTMLInputElement>) {
        setRiders(event.target.value);
    }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedGroupName = groupName.trim();
    const ridersNumber = Number(riders);

    if (!trimmedGroupName || ridersNumber < 1) {
      return;
    }

    onAddGroup(trimmedGroupName, ridersNumber);

    setGroupName("");
    setRiders("1");
  }

  return (
    <form className="queue-form" onSubmit={handleSubmit}>
      <div className="queue-form-group">
        <label htmlFor="group-name">Group name</label>
        <input
          id="group-name"
          className="queue-input"
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="The Johnson Family"
        />
      </div>

      <div className="queue-form-group">
        <label htmlFor="riders">Number of riders</label>
        <input
          id="riders"
          className="queue-input"
          type="number"
          min="1"
          value={riders}
          onChange={handleRidersChange}
        />
      </div>

      <button type="submit" className="queue-submit-button">
        Join the line
      </button>
    </form>
  );
}

export default QueueForm;
