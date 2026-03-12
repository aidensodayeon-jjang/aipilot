import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AppTasks({ title, subheader, initialTasks, ...other }) {
  const [currentTab, setCurrentTab] = useState('short');
  const [tasks, setTasks] = useState(initialTasks || {
    short: [],
    mid: [],
    feedback: []
  });
  const [taskInput, setTaskInput] = useState('');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    setTaskInput('');
  };

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && taskInput.trim()) {
      const newTask = {
        id: String(Date.now()),
        name: taskInput,
        completed: false
      };
      setTasks({
        ...tasks,
        [currentTab]: [newTask, ...tasks[currentTab]]
      });
      setTaskInput('');
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTabTasks = tasks[currentTab].map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks({
      ...tasks,
      [currentTab]: updatedTabTasks
    });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTabTasks = tasks[currentTab].filter(task => task.id !== taskId);
    setTasks({
      ...tasks,
      [currentTab]: updatedTabTasks
    });
  };

  const activeTasksCount = tasks[currentTab].filter(t => !t.completed).length;

  return (
    <Card {...other} sx={{ minHeight: 450 }}>
      <Box sx={{ px: 2.5, pt: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
          }}
        >
          <Tab value="short" label="단기업무" />
          <Tab value="mid" label="중기업무" />
          <Tab value="feedback" label="학생피드백" />
        </Tabs>
        <Label color={activeTasksCount > 0 ? 'error' : 'success'}>
          {activeTasksCount} OPEN
        </Label>
      </Box>

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder={currentTab === 'feedback' ? "학생 피드백을 입력하고 엔터를 누르세요..." : "새로운 업무를 입력하고 엔터를 누르세요..."}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleAddTask}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:plus-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: 'background.neutral', borderRadius: 1 }}
        />
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar sx={{ maxHeight: 320 }}>
        {tasks[currentTab].length > 0 ? (
          tasks[currentTab].map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        ) : (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              등록된 항목이 없습니다.
            </Typography>
          </Box>
        )}
      </Scrollbar>
    </Card>
  );
}

AppTasks.propTypes = {
  initialTasks: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete();
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 0.75,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.name}
          sx={{ flexGrow: 1, m: 0, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu} size="small">
          <Iconify icon="eva:more-vertical-fill" width={18} />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onChange}>
          <Iconify icon={checked ? "eva:undo-fill" : "eva:checkmark-circle-2-fill"} sx={{ mr: 2 }} />
          {checked ? '취소' : '완료'}
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  task: PropTypes.object,
};
