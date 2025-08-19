import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase"; // Use the client-side db connection

export interface ScheduleItem {
  courseCode: string;
  section: string;
  professor: string;
  building: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
}

export async function getSchedule(userId: string): Promise<ScheduleItem[]> {
  const scheduleColRef = collection(db, 'users', userId, 'schedule');
  const q = query(scheduleColRef, orderBy("startTime")); // Order by start time
  const querySnapshot = await getDocs(q);

  const schedule: ScheduleItem[] = [];
  querySnapshot.forEach((doc) => {
    schedule.push(doc.data() as ScheduleItem);
  });

  return schedule;
}
