export function fFetchResponse(result) {
  const rows_courses = [];

  Object.keys(result).forEach((key) => {
    rows_courses.push(result[key]);
  });

  return rows_courses;
}