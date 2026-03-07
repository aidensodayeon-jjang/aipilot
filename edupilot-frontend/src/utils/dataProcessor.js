/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import Papa from 'papaparse';
// Vite에서는 ?raw 접미사를 사용하여 텍스트로 파일을 가져옵니다.
import rawCsv from '../data/raw_data.csv?raw';

export const processData = () => {
  const results = Papa.parse(rawCsv, {
    header: true,
    skipEmptyLines: true,
  });

  const { data } = results;

  const validData = data.filter((row) => {
    if (!row['수강료결제'] && !row['학생이름']) return false;
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
      remarks,
      isNew,
      paymentAmount,
      kitPayment,
      paymentStatus: row['수강료결제']?.trim() || 'Unknown',
      studentName: row['학생이름'] || 'Unknown',
      school: row['학교'] || 'Unknown',
      grade: row['학년'] || 'Unknown',
      course: row['수강과목'] || 'Unknown',
      time: row['수강시간'] || 'Unknown',
      instructor: row['담당'] || 'Unknown',
    };
  });
};
