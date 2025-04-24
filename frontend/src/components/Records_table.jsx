import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { signUpAuth } from '../../context/AuthProvider';


const Records_table = ({ username }) => {
  const {CInfo} = useContext(signUpAuth);
  username = CInfo.username;
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/results/${username}`);
        if (res.data.success) {
          setRecords(res.data.results);
        }
      } catch (err) {
        console.error('Failed to fetch results:', err);
      }
    };

    fetchResults();

    // Optional: Polling every 10 seconds (live updates without refresh)
    const interval = setInterval(fetchResults, 10000);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <div className='h-screen px-2 py-8 md:px-4 bg-black bg-opacity-60'>
      <p className='text-2xl font-bold text-center my-4'>Detection Records</p>
  
      <div className="overflow-x-auto p-8 flex justify-center">
        <table className="md:w-3/4 bg-black bg-opacity-70 border-collapse side-border-detect border-2 rounded-md border-slate-400">
          <thead>
            <tr>
              <th className="p-2 border border-slate-300">#</th>
              <th className="p-2 border border-slate-300">Result</th>
            </tr>
          </thead>
          <tbody>
            {records.length <= 1 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-400">No records found</td>
              </tr>
            ) : (() => {
              const rows = [];
              for (let i = 1; i < records.length; i++) {
                const record = records[i];
                rows.push(
                  <tr key={i}>
                    <td className="w-8 text-center p-4 border border-slate-300">{i}</td>
                    <td className="p-4 text-left border border-slate-300 whitespace-pre-line">
                      <ul className='text-green-400 font-semibold'>
                        <li>FileName: {record.File_Name}</li>
                        <li>Result: {record.Classification}</li>
                        <li>DeepFake Percentage: {record.Fake}</li>
                        <li>Motion Anomaly: {record.Motion_Anomaly}</li>
                        <li>Processing Time: {record.Time}</li>
                      </ul>
                      </td>
                  </tr>
                );
              }
              return rows;
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );  
};

export default Records_table;
