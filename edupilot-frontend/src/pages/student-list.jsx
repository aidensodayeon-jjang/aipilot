import { Helmet } from 'react-helmet-async';
import StudentListView from 'src/sections/students/view/student-list-view';


// ----------------------------------------------------------------------

export default function StudentListPage() {
  return (
    <>
      <Helmet>
        <title> 학생 현황 </title>
      </Helmet>

      <StudentListView />
    </>
  );
}
