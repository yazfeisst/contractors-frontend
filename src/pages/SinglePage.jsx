import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEntryContext } from '../hooks/useEntryContext';
import { useParams, useNavigate } from 'react-router-dom';

const SinglePage = () => {
  const { entries, dispatch } = useEntryContext();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { companyName: paramCompanyName } = useParams();
  const navigate = useNavigate();

  const [companyName] = useState(() =>
    paramCompanyName ? decodeURIComponent(paramCompanyName) : ''
  );

  const [contractorName, setContractorName] = useState('');
  const [date, setDate] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [work, setWork] = useState('');
  const [manager, setManager] = useState('');
  const [initials, setInitials] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/entries`);
        dispatch({ type: 'SET_ENTRIES', payload: response.data });
      } catch (err) {
        console.error('Error fetching entries:', err);
      }
    };

    if (entries.length === 0) {
      fetchEntries();
    }
  }, [baseURL, dispatch, entries.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newEntry = {
      company_name: companyName,
      contractor_name: contractorName,
      date,
      time_in: timeIn,
      time_out: timeOut,
      work,
      manager,
      initials,
      comments,
    };

    try {
      const response = await axios.post(`${baseURL}/api/entries`, newEntry);
      dispatch({ type: 'CREATE_ENTRY', payload: response.data });

      setContractorName('');
      setDate('');
      setTimeIn('');
      setTimeOut('');
      setWork('');
      setManager('');
      setInitials('');
      setComments('');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to submit');
    }
  };

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

  const filteredEntries = entries.filter(
    (entry) => entry.company_name === companyName
  );

  return (
    <>
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      </div>

      <div className="form-container">
        <h2>{companyName} New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-part'>
            <label htmlFor="contractorName">Contractor Name:</label>
            <input
              type="text"
              id="contractorName"
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              required
            />
          </div>

          <div className='form-part'>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className='form-part'>
            <label htmlFor="timeIn">Time In:</label>
            <input
              type="time"
              id="timeIn"
              value={timeIn}
              onChange={(e) => setTimeIn(e.target.value)}
            />
          </div>

          <div className='form-part'>
            <label htmlFor="timeOut">Time Out:</label>
            <input
              type="time"
              id="timeOut"
              value={timeOut}
              onChange={(e) => setTimeOut(e.target.value)}
            />
          </div>

          <div className='form-part'>
            <label htmlFor="work">Work Description:</label>
            <input
              type="text"
              id="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          </div>

          <div className='form-part'>
            <label htmlFor="manager">Manager Name:</label>
            <input
              type="text"
              id="manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </div>

          <div className='form-part'>
            <label htmlFor="initials">Initials:</label>
            <input
              type="text"
              id="initials"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
            />
          </div>

          <div className='form-part'>
            <label htmlFor="comments">Comments:</label>
            <input
              type='text'
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button className='form-button' type="submit">Submit Entry</button>
        </form>
      </div>

      <div className="previous-entries-container">
        <h3>Previous Entries for {companyName}</h3>
        {filteredEntries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul className='entries-grid'>
            {filteredEntries.map((entry) => (
              <li key={entry._id}>
                <div className='entry'>
                  <strong>{new Date(entry.date).toLocaleDateString('en-GB')}</strong> 
                  <br />
                  {entry.contractor_name} ({entry.time_in || '--'} to {entry.time_out || '--'})
                  <br />
                  Work Description: {entry.work}
                  <br />
                  Manager: {entry.manager} | Initials: {entry.initials}
                  <br />
                  Comments: {entry.comments}
                  <br />
                  <button onClick={() => handleDelete(entry._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SinglePage;
