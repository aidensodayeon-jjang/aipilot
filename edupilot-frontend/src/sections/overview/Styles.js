// styles.js
import styled from 'styled-components';

export const CalendarContainer = styled.div`
  .fc .fc-toolbar-title {
    font-size: 24px;
  }

  .fc .fc-scrollgrid-section table {
    height: 34px;
  }

  .fc .fc-daygrid-day-number {
    font-size: 12px;
  }

  .fc .fc-event-title {
    font-size: 12px;
  }

  .fc .fc-button {
    font-size: 12px;
  }

  .fc .fc-event-time {
    font-size: 12px;
  }

  /* 타임 그리드(주별 & 일별)에서 내용 TEXT */

  .fc .fc-event-title {
    font-size: 13px;
    color: black;
  }

  /* styles.css */

  .fc .fc-daygrid-day.fc-today {
    background-color: #ffefef; /* 오늘 날짜의 배경색을 연한 빨간색으로 설정 */
  }

  .fc .fc-list-table {
    background-color: #ffffff; /* 셀의 배경색을 흰색으로 설정 */
  }

  /* styles.css */

  .fc .fc-list-table {
    /* 리스트 뷰의 기본 테이블 스타일 */
    font-size: 14px; /* 기본 폰트 크기 변경 */
  }

  .fc .fc-list-event-title {
    /* 이벤트 제목의 폰트 크기 조정 */
    font-size: 14px;
  }

  .fc .fc-list-day-text {
    /* 날짜 텍스트의 폰트 크기 조정 */
    font-size: 14px;
  }

  .fc .fc-list-empty,
  .fc .fc-daygrid-body .fc-daygrid-day-events {
    background-color: white; /* 흰색 배경 */
  }

  /* 모든 주별 뷰 요소의 폰트 사이즈 조절 */

  .fc-timegrid .fc-timegrid-slot-label,
  .fc-timegrid .fc-event-title,
  .fc-timegrid .fc-col-header-cell {
    font-size: 12px; /* 또는 원하는 크기 */
  }
`;
