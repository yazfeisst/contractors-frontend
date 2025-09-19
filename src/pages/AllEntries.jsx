import { useEffect, useState } from 'react';
import axios from 'axios';
import { useEntryContext } from '../hooks/useEntryContext';
import { useNavigate } from 'react-router-dom';


const AllEntriesPage = () => {
  const { entries, dispatch } = useEntryContext();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();


  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/entries`);
        dispatch({ type: 'SET_ENTRIES', payload: response.data });
      } catch (err) {
        console.error('Error fetching entries:', err);
      }
    };

    fetchEntries();
  }, [baseURL, dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/api/entries/${id}`);
      const response = await axios.get(`${baseURL}/api/entries`);
      dispatch({ type: 'SET_ENTRIES', payload: response.data });
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEditSave = async (id) => {
    try {
      const response = await axios.patch(`${baseURL}/api/entries/${id}`, editData);
      dispatch({ type: 'UPDATE_ENTRY', payload: response.data });
      setEditId(null);
      setEditData({});
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (

    <>
    <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
    </div>
    <div className="all-entries-container">
      <h2>All Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul className="entries-grid">
          {entries.map((entry) => (
            <li key={entry._id}>
              {editId === entry._id ? (
                <form className="entry">
                  <label>Company:</label>
                  <input
                    type="text"
                    value={editData.company_name || ''}
                    onChange={(e) => setEditData({ ...editData, company_name: e.target.value })}
                  />

                  <label>Contractor Name:</label>
                  <input
                    type="text"
                    value={editData.contractor_name || ''}
                    onChange={(e) => setEditData({ ...editData, contractor_name: e.target.value })}
                  />

                  <label>Date:</label>
                  <input
                    type="date"
                    value={editData.date || ''}
                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  />

                  <label>Time In:</label>
                  <input
                    type="time"
                    value={editData.time_in || ''}
                    onChange={(e) => setEditData({ ...editData, time_in: e.target.value })}
                  />

                  <label>Time Out:</label>
                  <input
                    type="time"
                    value={editData.time_out || ''}
                    onChange={(e) => setEditData({ ...editData, time_out: e.target.value })}
                  />

                  <label>Work:</label>
                  <input
                    type="text"
                    value={editData.work || ''}
                    onChange={(e) => setEditData({ ...editData, work: e.target.value })}
                  />

                  <label>Manager:</label>
                  <input
                    type="text"
                    value={editData.manager || ''}
                    onChange={(e) => setEditData({ ...editData, manager: e.target.value })}
                  />

                  <label>Initials:</label>
                  <input
                    type="text"
                    value={editData.initials || ''}
                    onChange={(e) => setEditData({ ...editData, initials: e.target.value })}
                  />

                  <label>Comments:</label>
                  <input
                    type="text"
                    value={editData.comments || ''}
                    onChange={(e) => setEditData({ ...editData, comments: e.target.value })}
                  />

                  <button onClick={() => handleEditSave(entry._id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </form>
              ) : (
                <div className="entry">
                  <h4>{entry.company_name}</h4>
                  {new Date(entry.date).toLocaleDateString('en-GB')}
                  <br />
                  {entry.contractor_name} ({entry.time_in || '--'} to {entry.time_out || '--'})
                  <br />
                  Work Description: {entry.work}
                  <br />
                  Manager: {entry.manager} | Initials: {entry.initials}
                  <br />
                  Comments: {entry.comments}
                  <br />
                  <button onClick={() => {
                    setEditId(entry._id);
                    setEditData({ ...entry });
                  }}>Edit</button>
                  <button onClick={() => handleDelete(entry._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default AllEntriesPage;
