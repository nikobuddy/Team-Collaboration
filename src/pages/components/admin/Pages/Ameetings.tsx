import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';

const AdminScheduleMeeting = () => {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    time: '',
    meetLink: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeetingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const fetchMeetings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'meetings'));
      const meetingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetings(meetingsData);
    } catch (err) {
      setError('Error fetching meetings.');
    }
  };

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDetails.title || !meetingDetails.date || !meetingDetails.time || !meetingDetails.meetLink) {
      setError('Please fill all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'meetings'), meetingDetails);
      setSuccess('Meeting scheduled successfully!');
      setMeetingDetails({ title: '', date: '', time: '', meetLink: '' });
      fetchMeetings();
    } catch (err) {
      setError('Error scheduling meeting.');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-[#1d1e26] p-8">
      <div className="max-w-2xl mx-auto bg-[#292b38] p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold text-center">Schedule a Meeting</h2>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

        <form onSubmit={handleScheduleMeeting} className="space-y-4 mt-6">
          <input
            type="text"
            name="title"
            placeholder="Meeting Title"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
            value={meetingDetails.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
            value={meetingDetails.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
            value={meetingDetails.time}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="meetLink"
            placeholder="Google Meet Link"
            className="w-full p-3 bg-transparent border border-[#ff5e84] rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff5e84]"
            value={meetingDetails.meetLink}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#ff5e84] text-white font-bold rounded-lg hover:bg-[#ff6a92] transition"
          >
            Schedule Meeting
          </button>
        </form>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-white text-xl font-semibold mb-4">Scheduled Meetings</h3>
        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <div
              key={index}
              className="bg-[#353b48] p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h4 className="text-white font-bold">{meeting.title}</h4>
                <p className="text-gray-300">
                  {meeting.date} at {meeting.time}
                </p>
              </div>
              <a
                href={meeting.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff5e84] font-semibold underline"
              >
                Join Meeting
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminScheduleMeeting;