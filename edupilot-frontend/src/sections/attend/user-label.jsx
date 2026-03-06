import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../../components/label';

export function UserStatusLabel({ status }) {
  const [statusColor, setStatusColor] = useState('success');

  useEffect(() => {
    switch (status) {
      case '예약필요':
      case undefined:
        setStatusColor('error');
        break;
      default:
        setStatusColor('success');
    }
  }, [status]);

  return <Label color={statusColor}>{status || '미등록'}</Label>;
}

export function UserClassLabel({ courseData }) {
  const [userClass, setUserClass] = useState('일반');
  const [courseColor, setCourseColor] = useState('success');

  useEffect(() => {
    if (courseData.length === 1) {
      setUserClass('신입생');
      setCourseColor('success');
    } else if (courseData.length >= 15) {
      setUserClass('VVIP');
      setCourseColor('error');
    } else if (courseData.length >= 10) {
      setUserClass('VIP');
      setCourseColor('error');
    } else {
      setUserClass('일반');
      setCourseColor('success');
    }
  }, [courseData]);

  return <Label color={courseColor}>{userClass}</Label>;
}

UserStatusLabel.propTypes = {
  status: PropTypes.string,
};

UserClassLabel.propTypes = {
  courseData: PropTypes.array,
};
