import { useState } from "react";

function CloseCircle() {
  const [members, setMembers] = useState([
    { id: 1, name: "Mom" },
    { id: 2, name: "Best Friend" },
    { id: 3, name: "Cousin Maya" },
  ]);

  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (!newMember.trim()) return;

    setMembers([
      { id: Date.now(), name: newMember },
      ...members,
    ]);

    setNewMember("");
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Close Circle
      </h1>

      {/* Add member */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add someone"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={addMember}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Members list */}
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span>{member.name}</span>
            <button
              onClick={() => removeMember(member.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Simple feed */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Close Circle Feed</h2>

        <div className="bg-gray-100 p-4 rounded mb-3">
          Mom: Dinner at 7 tonight.
        </div>

        <div className="bg-gray-100 p-4 rounded mb-3">
          Best Friend: Movie night?
        </div>
      </div>
    </div>
  );
}

export default CloseCircle;