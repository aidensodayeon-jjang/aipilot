function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('목동 코딩학원 운영 대시보드')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // 첫 번째 시트 사용
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) return [];

    const headers = data[0];
    const rows = data.slice(1);

    // 컬럼 인덱스 찾기 (헤더 이름 기준)
    const getIdx = (name) => headers.indexOf(name);

    const idx = {
      remarks: getIdx('비고'),
      paymentStatus: getIdx('수강료결제'),
      paymentAmount: getIdx('결제금액'),
      studentName: getIdx('학생이름'),
      school: getIdx('학교'),
      grade: getIdx('학년'),
      course: getIdx('수강과목'),
      time: getIdx('수강시간'),
      instructor: getIdx('담당')
    };

    return rows.map(row => {
      // 유효성 검사: 수강료결제나 학생이름이 없으면 제외 (요약행 등)
      if (!row[idx.paymentStatus] && !row[idx.studentName]) return null;
      if (row[idx.paymentStatus] === '결제완료' && !row[idx.studentName]) return null; // 하단 요약행 제외

      // 금액 처리 (문자열인 경우 콤마 제거)
      let payAmt = row[idx.paymentAmount];
      if (typeof payAmt === 'string') {
        payAmt = parseInt(payAmt.replace(/,/g, ''), 10) || 0;
      }

      return {
        remarks: row[idx.remarks] ? String(row[idx.remarks]) : '',
        paymentStatus: row[idx.paymentStatus] ? String(row[idx.paymentStatus]).trim() : 'Unknown',
        paymentAmount: Number(payAmt) || 0,
        studentName: row[idx.studentName] ? String(row[idx.studentName]) : 'Unknown',
        school: row[idx.school] ? String(row[idx.school]) : 'Unknown',
        grade: row[idx.grade] ? String(row[idx.grade]) : 'Unknown',
        course: row[idx.course] ? String(row[idx.course]) : 'Unknown',
        time: row[idx.time] ? String(row[idx.time]) : 'Unknown',
        instructor: row[idx.instructor] ? String(row[idx.instructor]) : 'Unknown',
        isNew: (row[idx.remarks] ? String(row[idx.remarks]) : '').includes('신규')
      };
    }).filter(item => item !== null);
  } catch (e) {
    Logger.log(e);
    return [];
  }
}
