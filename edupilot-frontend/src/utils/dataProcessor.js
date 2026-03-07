/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import Papa from 'papaparse';
import rawCsvFallback from '../data/raw_data.csv?raw';

export const processData = async () => {
  let csvData = rawCsvFallback;
  
  // 1. 로컬에 직접 업로드한 데이터가 있는지 먼저 확인 (보안 우선)
  const uploadedData = localStorage.getItem('UPLOADED_CSV_DATA');
  const sheetId = localStorage.getItem('GOOGLE_SHEET_ID');

  if (uploadedData) {
    csvData = uploadedData;
    console.log('Using locally uploaded CSV data');
  } 
  // 2. 구글 시트 ID가 설정되어 있으면 실시간 데이터를 가져옴
  else if (sheetId && sheetId.trim() !== '') {
    try {
      const gid = localStorage.getItem('GOOGLE_SHEET_GID') || '0';
      // 구글 시트 웹 게시용 CSV URL (특정 gid 포함)
      const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      
      const response = await fetch(GOOGLE_SHEET_CSV_URL);
      if (response.ok) {
        csvData = await response.text();
        console.log('Successfully fetched data from Google Sheets');
      } else {
        console.warn('Failed to fetch Google Sheets data, using local fallback');
      }
    } catch (error) {
      console.error('Error fetching Google Sheets:', error);
    }
  }

  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data } = results;

        const validData = data.filter((row) => {
          if (!row['수강료결제'] && !row['학생이름']) return false;
          if (!row['학생이름'] && !row['학교']) return false;
          return true;
        });

        const mappedData = validData.map((row) => {
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

        resolve(mappedData);
      },
    });
  });
};
