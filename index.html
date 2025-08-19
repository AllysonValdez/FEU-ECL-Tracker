import React, { useState, useEffect, useRef } from 'react';
// Import Firebase modules for database and now authentication
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";

// NOTE: In a real project, you would install html2canvas and ics via npm.
// Since we can't do that here, we will load them from a CDN when needed.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHdpIww8XF-NrGgRnn7HdwZGZiNaGC6ZA",
  authDomain: "feu-curriculum-tracker.firebaseapp.com",
  projectId: "feu-curriculum-tracker",
  storageBucket: "feu-curriculum-tracker.firebasestorage.app",
  messagingSenderId: "90252633414",
  appId: "1:90252633414:web:d4eb33e9307eb377373147",
  measurementId: "G-YWTPN900ST"
};

// Initialize Firebase App, Firestore Database, and Authentication
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Helper function to generate a unique color from a string
const stringToColor = (str) => {
  if (!str) return '#cccccc';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Grade to GPA mapping based on FEU's system
const gradeToGpa = {
  'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0,
  'P': null, 'NP': null 
};

// --- Main App Component ---
function App() {
  const [user, setUser] = useState(null); // State to hold the logged-in user
  const [allCourses, setAllCourses] = useState([]);
  const [gpa, setGpa] = useState('0.00');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true); // Loading state for auth check

  // Effect hook to listen for authentication state changes and handle redirect results
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Check for redirect result after the page loads
    getRedirectResult(auth)
      .catch((error) => {
        console.error("Authentication redirect result error:", error);
      });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Effect hook to fetch data from Firestore when a user logs in
  useEffect(() => {
    if (user) {
      // Path to the user's private collection: users/{userID}/courses
      const coursesCollectionRef = collection(db, 'users', user.uid, 'courses');
      const unsubscribe = onSnapshot(coursesCollectionRef, (snapshot) => {
        const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllCourses(coursesData);
      }, (error) => {
        console.error("Error fetching data from Firebase:", error);
      });
      return () => unsubscribe();
    } else {
      setAllCourses([]); // Clear data if user logs out
    }
  }, [user]); // Rerun this effect when the user object changes

  // Effect hook to recalculate GPA
  useEffect(() => {
    const completed = allCourses.filter(c => c.status === 'Completed');
    if (completed.length === 0) {
        setGpa('0.00');
        return;
    }
    let totalQualityPoints = 0;
    let totalUnits = 0;
    completed.forEach(course => {
      const qp = gradeToGpa[course.grade];
      if (qp !== null && qp !== undefined) {
        totalQualityPoints += qp * course.units;
        totalUnits += parseInt(course.units);
      }
    });
    setGpa(totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : '0.00');
  }, [allCourses]);

  const completedCourses = allCourses.filter(c => c.status === 'Completed');
  const currentSchedule = allCourses.filter(c => c.status === 'Enrolled');

  // If auth state is still loading, show a spinner or message
  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Authenticating...</div>;
  }

  // If no user is logged in, show the Login screen
  if (!user) {
    return <Login />;
  }
  
  // If user is logged in, show the main application
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <main className="flex-1 p-6 sm:p-8 md:p-10">
          <Header user={user} />
          <Content activeTab={activeTab} allCourses={allCourses} completedCourses={completedCourses} gpa={gpa} schedule={currentSchedule} />
        </main>
      </div>
    </div>
  );
}

// --- Authentication Component ---
const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // Use signInWithRedirect which is often more reliable than a popup
    signInWithRedirect(auth, provider)
      .catch((error) => console.error("Authentication error:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <LeafIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FEU Curriculum Tracker</h1>
        <p className="text-gray-600 mb-8">Please sign in to continue.</p>
        <button onClick={signInWithGoogle} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.141,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};


// --- Child Components ---

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'curriculum', label: 'Curriculum', icon: <ClipboardListIcon /> },
    { id: 'grade_history', label: 'Grade History', icon: <BookOpenIcon /> },
    { id: 'schedule', label: 'Schedule', icon: <CalendarIcon /> },
  ];
  return (
    <aside className="w-16 sm:w-20 md:w-64 bg-white text-gray-800 flex flex-col">
       <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b">
        <LeafIcon className="h-8 w-8 text-green-600" />
        <span className="hidden md:inline ml-3 text-lg font-bold">FEU Tracker</span>
      </div>
      <nav className="flex-1 px-2 sm:px-4 md:px-4 py-4">
        {navItems.map(item => (
          <a key={item.id} href="#" onClick={() => setActiveTab(item.id)}
            className={`flex items-center p-2 sm:p-3 my-2 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {item.icon}
            <span className="hidden md:inline ml-4">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t">
          <img src={user.photoURL} alt="User" className="h-10 w-10 rounded-full mx-auto md:mx-0 md:mr-3" />
          <div className="hidden md:inline">
            <p className="font-semibold text-sm">{user.displayName}</p>
            <button onClick={() => signOut(auth)} className="text-xs text-red-600 hover:underline">Sign Out</button>
          </div>
      </div>
    </aside>
  );
};

const Header = ({user}) => (
  <header className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.displayName.split(' ')[0]}!</h1>
    <p className="text-gray-500 mt-1">Here's your academic overview for this semester.</p>
  </header>
);

const Content = ({ activeTab, ...props }) => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'curriculum': return <CurriculumList {...props} />;
      case 'grade_history': return <GradeHistory {...props} />;
      case 'schedule': return <Schedule {...props} />;
      default: return <Dashboard {...props} />;
    }
};

const Dashboard = ({ completedCourses, gpa, schedule }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall GPA</h3>
          <p className="text-5xl font-bold text-green-600">{gpa}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Enrolled Courses</h3>
          <p className="text-5xl font-bold text-blue-600">{schedule.length}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Grades</h3>
        <div className="space-y-4">
          {completedCourses.length > 0 ? completedCourses.slice(-3).map(course => (
            <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-700">{course.name}</p>
                <p className="text-sm text-gray-500">{course.code}</p>
              </div>
              <div className="text-lg font-bold" style={{color: stringToColor(course.grade)}}>{course.grade}</div>
            </div>
          )) : <p className="text-gray-500">No completed courses yet.</p>}
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h3>
       <div className="space-y-4">
        {schedule.length > 0 ? schedule.slice(0, 4).map(item => (
          <div key={item.id} className="p-4 rounded-lg" style={{borderLeft: `4px solid ${stringToColor(item.code)}`}}>
            <p className="font-semibold text-gray-700">{item.code} - {item.section}</p>
            <p className="text-sm text-gray-600">{item.time} ({item.day})</p>
            <p className="text-xs text-gray-500">{item.room} - {item.instructor}</p>
          </div>
        )) : <p className="text-gray-500">No classes scheduled.</p>}
      </div>
    </div>
  </div>
);

const CurriculumList = ({ allCourses }) => {
    const groupedBySemester = allCourses.reduce((acc, course) => {
        const semester = course.semester || 'Uncategorized';
        if (!acc[semester]) acc[semester] = [];
        acc[semester].push(course);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            {Object.keys(groupedBySemester).length > 0 ? Object.entries(groupedBySemester).map(([semester, coursesInSem]) => (
                <div key={semester} className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{semester}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-4 font-semibold text-gray-600">Course Code</th>
                                    <th className="p-4 font-semibold text-gray-600">Course Name</th>
                                    <th className="p-4 font-semibold text-gray-600">Units</th>
                                    <th className="p-4 font-semibold text-gray-600">Grade</th>
                                    <th className="p-4 font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesInSem.map(course => (
                                    <tr key={course.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 text-gray-800 font-medium">{course.code}</td>
                                        <td className="p-4 text-gray-700">{course.name}</td>
                                        <td className="p-4 text-gray-700">{course.units}</td>
                                        <td className="p-4">
                                            <span className={`font-bold px-2 py-1 rounded-full text-sm ${course.status === 'Completed' ? '' : 'bg-yellow-100 text-yellow-800'}`} style={course.status === 'Completed' ? {backgroundColor: `${stringToColor(course.grade)}20`, color: stringToColor(course.grade)} : {}}>
                                                {course.grade}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-700">{course.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )) : <p className="text-gray-500">No curriculum data found. Try syncing your extension.</p>}
        </div>
    );
};

const GradeHistory = ({ completedCourses }) => (
  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Grade History</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-4 font-semibold text-gray-600">Course Code</th>
            <th className="p-4 font-semibold text-gray-600">Course Name</th>
            <th className="p-4 font-semibold text-gray-600">Units</th>
            <th className="p-4 font-semibold text-gray-600">Grade</th>
            <th className="p-4 font-semibold text-gray-600">Semester</th>
          </tr>
        </thead>
        <tbody>
          {completedCourses.length > 0 ? completedCourses.map(course => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-gray-700">{course.code}</td>
              <td className="p-4 text-gray-800 font-medium">{course.name}</td>
              <td className="p-4 text-gray-700">{course.units}</td>
              <td className="p-4">
                <span className="font-bold px-2 py-1 rounded-full text-sm" style={{backgroundColor: `${stringToColor(course.grade)}20`, color: stringToColor(course.grade)}}>{course.grade}</span>
              </td>
              <td className="p-4 text-gray-700">{course.semester}</td>
            </tr>
          )) : <tr><td colSpan="5" className="p-4 text-center text-gray-500">No completed courses with grades.</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

// Helper function to dynamically load a script from a URL
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
};

const Schedule = ({ schedule }) => {
    const scheduleTableRef = useRef(null);

    const exportAsPng = () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
            .then(() => {
                if (scheduleTableRef.current) {
                    window.html2canvas(scheduleTableRef.current).then(canvas => {
                        const link = document.createElement('a');
                        link.download = 'feu-schedule.png';
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    });
                }
            })
            .catch(error => console.error(error));
    };
    
    const exportAsIcs = () => {
        loadScript('https://unpkg.com/ics@2.41.0/dist/ics.min.js')
            .then(() => {
                if (!window.ics) {
                    console.error('ics library not loaded!');
                    return;
                }
                const events = [];
                const semesterStartDate = new Date(); // Use a real start date in a production app
                
                schedule.forEach(item => {
                    const [startTime, endTime] = item.time.split(' - ');
                    const [startHour, startMinute] = startTime.split(':').map(Number);
                    const [endHour, endMinute] = endTime.split(':').map(Number);

                    const days = item.day.split(''); // e.g. 'MWF' -> ['M', 'W', 'F']
                    const dayMap = { M: 'MO', T: 'TU', W: 'WE', H: 'TH', F: 'FR', S: 'SA' };

                    days.forEach(day => {
                        const event = {
                            title: `${item.code} - ${item.section}`,
                            description: `Instructor: ${item.instructor}`,
                            location: item.room,
                            start: [semesterStartDate.getFullYear(), semesterStartDate.getMonth() + 1, semesterStartDate.getDate(), startHour, startMinute],
                            end: [semesterStartDate.getFullYear(), semesterStartDate.getMonth() + 1, semesterStartDate.getDate(), endHour, endMinute],
                            recurrenceRule: `FREQ=WEEKLY;BYDAY=${dayMap[day]};INTERVAL=1`,
                            duration: { hours: endHour - startHour, minutes: endMinute - startMinute },
                        };
                        events.push(event);
                    });
                });

                window.ics.createEvents(events, (error, value) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'schedule.ics';
                    link.click();
                });
            })
            .catch(error => console.error(error));
    };

    return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Current Weekly Schedule</h2>
            <div className="space-x-2">
                 <button onClick={exportAsPng} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Export as PNG</button>
                 <button onClick={exportAsIcs} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">Add to Calendar</button>
            </div>
        </div>
        <div className="overflow-x-auto" ref={scheduleTableRef}>
             <table className="w-full text-left bg-white">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold text-gray-600">Course Code</th>
                        <th className="p-4 font-semibold text-gray-600">Section</th>
                        <th className="p-4 font-semibold text-gray-600">Time</th>
                        <th className="p-4 font-semibold text-gray-600">Day</th>
                        <th className="p-4 font-semibold text-gray-600">Room</th>
                        <th className="p-4 font-semibold text-gray-600">Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.length > 0 ? schedule.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 text-gray-800 font-medium">{item.code}</td>
                            <td className="p-4 text-gray-700">{item.section}</td>
                            <td className="p-4 text-gray-700">{item.time}</td>
                            <td className="p-4 text-gray-700">{item.day}</td>
                            <td className="p-4 text-gray-700">{item.room}</td>
                            <td className="p-4 text-gray-700">{item.instructor}</td>
                        </tr>
                    )) : <tr><td colSpan="6" className="p-4 text-center text-gray-500">No courses scheduled.</td></tr>}
                </tbody>
            </table>
        </div>
    </div>
    );
};

// --- SVG Icon Components ---
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const BookOpenIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const LeafIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ClipboardListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>);

// This makes the App component available to be used by main.jsx
export default App;
