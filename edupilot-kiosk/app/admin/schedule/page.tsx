import ScheduleClientPage from './ScheduleClientPage';
import { TimetableData } from '@/lib/timetable';

export default async function SchedulePage() {
    let timetableData: TimetableData = {};
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sheets`, {
            cache: 'no-store' // Always fetch fresh data
        });
        const result = await response.json();

        if (result.success) {
            timetableData = result.data;
        } else {
            console.error("Failed to fetch initial schedule data from Google Sheets:", result.error);
        }
    } catch (error) {
        console.error("Error fetching initial schedule data:", error);
    }

    console.log("Timetable data being passed to client:", JSON.stringify(timetableData, null, 2));

    return <ScheduleClientPage initialData={timetableData} />;
}
