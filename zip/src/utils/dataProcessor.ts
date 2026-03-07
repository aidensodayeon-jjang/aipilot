import Papa from 'papaparse';
import rawCsv from '../data/raw_data.csv?raw';

export interface StudentData {
  remarks: string; // 비고
  paymentStatus: string; // 수강료결제
  paymentAmount: number; // 결제금액
  kitPayment: number; // 키트결제
  studentName: string; // 학생이름
  school: string; // 학교
  grade: string; // 학년
  course: string; // 수강과목
  time: string; // 수강시간
  instructor: string; // 담당
  isNew: boolean; // Derived from remarks
}

export const processData = (): StudentData[] => {
  const results = Papa.parse(rawCsv, {
    header: true,
    skipEmptyLines: true,
  });

  const data = results.data as any[];

  // Filter out summary rows (rows where '수강료결제' is empty or contains summary keywords like '결제완료')
  // Actually, looking at the CSV, the summary rows are at the bottom and start with empty columns.
  // We should filter based on '학생이름' existence or valid '수강료결제' values.
  
  const validData = data.filter((row) => {
    // Check if it's a valid student row
    // A valid row should have a student name or a valid payment status (excluding the summary stats at bottom)
    if (!row['수강료결제'] && !row['학생이름']) return false;
    
    // The summary rows at the bottom look like ",,,,,,,결제완료,29,,,,,,,,,,,,,,"
    // So '수강료결제' might be '결제완료' but '비고' is empty and '학생이름' is empty.
    if (!row['학생이름'] && !row['학교']) return false;

    return true;
  });

  return validData.map((row) => {
    const paymentAmountStr = row['결제금액'] || '0';
    const paymentAmount = parseInt(paymentAmountStr.replace(/,/g, ''), 10) || 0;
    
    const kitPaymentStr = row['키트결제'] || '0';
    const kitPayment = parseInt(kitPaymentStr.replace(/,/g, ''), 10) || 0;

    const remarks = row['비고'] || '';
    const isNew = remarks.includes('신규');

    return {
      remarks: remarks,
      paymentStatus: row['수강료결제']?.trim() || 'Unknown',
      paymentAmount: paymentAmount,
      kitPayment: kitPayment,
      studentName: row['학생이름'] || 'Unknown',
      school: row['학교'] || 'Unknown',
      grade: row['학년'] || 'Unknown',
      course: row['수강과목'] || 'Unknown',
      time: row['수강시간'] || 'Unknown',
      instructor: row['담당'] || 'Unknown',
      isNew: isNew,
    };
  });
};
