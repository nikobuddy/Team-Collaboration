import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  meetLink: string;
}

const UserJoinMeeting = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string>('');

  const calculateTimeLeft = (date: string, time: string) => {
    const meetingTime = new Date(`${date}T${time}:00`);
    const currentTime = new Date();
    const difference = meetingTime.getTime() - currentTime.getTime();

    if (difference <= 0) return null;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const fetchMeetings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'meetings'));
      const meetingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Meeting[];
      setMeetings(meetingsData);
    } catch (err) {
      setError('Error fetching meetings.');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d1e26] to-[#2b2d3a] p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center mb-8">Upcoming Meetings</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {meetings.length === 0 ? (
          <p className="text-gray-300 text-center">No meetings available at the moment.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {meetings.map((meeting) => {
              const timeLeft = calculateTimeLeft(meeting.date, meeting.time);

              return (
                <div
                  key={meeting.id}
                  className="bg-[#292b38] p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-white text-xl font-semibold mb-2">{meeting.title}</h3>
                  <p className="text-gray-400">
                    <strong>Date:</strong> {meeting.date}
                  </p>
                  <p className="text-gray-400 mb-4">
                    <strong>Time:</strong> {meeting.time}
                  </p>

                  {timeLeft ? (
                    <div className="bg-[#353b48] p-3 rounded-lg text-center text-white mb-4">
                      <p className="text-sm text-gray-300">Meeting starts in:</p>
                      <div className="flex justify-center gap-4 mt-2">
                        <div>
                          <span className="block text-2xl font-bold">{timeLeft.hours}</span>
                          <span className="text-sm text-gray-400">Hours</span>
                        </div>
                        <div>
                          <span className="block text-2xl font-bold">{timeLeft.minutes}</span>
                          <span className="text-sm text-gray-400">Minutes</span>
                        </div>
                        <div>
                          <span className="block text-2xl font-bold">{timeLeft.seconds}</span>
                          <span className="text-sm text-gray-400">Seconds</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-yellow-400 text-center mb-4">Meeting is live or has passed!</p>
                  )}

                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-[#ff5e84] text-white font-bold rounded-lg hover:bg-[#ff6a92] transition"
                  >
                    Join Meeting
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserJoinMeeting;