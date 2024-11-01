// src/pages/Workers.js
import React, { useState, useEffect } from 'react';
import { fetchWorkers, addWorker, deleteWorker, updateWorker } from '../services/firestore';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ name: '', nationality: '', arrivalDate: '' });
  const [editWorker, setEditWorker] = useState(null);

  // Fetch workers data from Firestore
  useEffect(() => {
    const getWorkers = async () => {
      const data = await fetchWorkers();
      setWorkers(data);
    };
    getWorkers();
  }, []);

  // Add a new worker
  const handleAddWorker = async (e) => {
    e.preventDefault();
    await addWorker(newWorker);
    setNewWorker({ name: '', nationality: '', arrivalDate: '' });
    const data = await fetchWorkers();
    setWorkers(data);
  };

  // Update worker
  const handleUpdateWorker = async () => {
    if (editWorker) {
      await updateWorker(editWorker.id, editWorker);
      setEditWorker(null);
      const data = await fetchWorkers();
      setWorkers(data);
    }
  };

  // Delete worker
  const handleDeleteWorker = async (id) => {
    await deleteWorker(id);
    const data = await fetchWorkers();
    setWorkers(data);
  };

  return (
    <div className="workers">
      <h2>Workers</h2>
      <form onSubmit={handleAddWorker}>
        <input
          type="text"
          placeholder="Worker Name"
          value={newWorker.name}
          onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nationality"
          value={newWorker.nationality}
          onChange={(e) => setNewWorker({ ...newWorker, nationality: e.target.value })}
        />
        <input
          type="date"
          value={newWorker.arrivalDate}
          onChange={(e) => setNewWorker({ ...newWorker, arrivalDate: e.target.value })}
        />
        <button type="submit">Add Worker</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nationality</th>
            <th>Arrival Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.name}</td>
              <td>{worker.nationality}</td>
              <td>{worker.arrivalDate}</td>
              <td>
                <button onClick={() => setEditWorker(worker)}>Edit</button>
                <button onClick={() => handleDeleteWorker(worker.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editWorker && (
        <div>
          <h3>Edit Worker</h3>
          <input
            type="text"
            value={editWorker.name}
            onChange={(e) => setEditWorker({ ...editWorker, name: e.target.value })}
          />
          <input
            type="text"
            value={editWorker.nationality}
            onChange={(e) => setEditWorker({ ...editWorker, nationality: e.target.value })}
          />
          <input
            type="date"
            value={editWorker.arrivalDate}
            onChange={(e) => setEditWorker({ ...editWorker, arrivalDate: e.target.value })}
          />
          <button onClick={handleUpdateWorker}>Update Worker</button>
        </div>
      )}
    </div>
  );
};

export default Workers;
