import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';

import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';

import TableContainer from '@mui/material/TableContainer';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function AppLectureStatus({ title, subheader, list, ...other }) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} action={<Button size="small" color="inherit">전체보기</Button>} />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>강좌명</TableCell>
                                <TableCell>신청 인원</TableCell>
                                <TableCell>링크</TableCell>
                                <TableCell align="right">상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row) => (
                                <LectureRow key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
}

AppLectureStatus.propTypes = {
    list: PropTypes.array,
    subheader: PropTypes.string,
    title: PropTypes.string,
};

// ----------------------------------------------------------------------

function LectureRow({ row }) {
    const { name, applicants, link, status } = row;

    return (
        <TableRow>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                {name}
            </TableCell>

            <TableCell>{applicants}</TableCell>

            <TableCell>
                <Box component="span" sx={{ p: 0.5, bgcolor: 'background.neutral', borderRadius: 0.5, fontSize: '0.85rem' }}>
                    {link}
                </Box>
            </TableCell>

            <TableCell align="right">
                <Label
                    color={
                        (status === '접수중' && 'success') ||
                        (status === '마감임박' && 'warning') ||
                        'error'
                    }
                >
                    {status}
                </Label>
            </TableCell>
        </TableRow>
    );
}

LectureRow.propTypes = {
    row: PropTypes.object,
};
