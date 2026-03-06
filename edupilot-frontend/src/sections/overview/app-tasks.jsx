import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Scrollbar from 'src/components/scrollbar';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AppTasks({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [currentTab, setCurrentTab] = useState('short');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'warning.main' },
            '& .MuiTab-root': { color: 'text.secondary' },
            '& .Mui-selected': { color: 'warning.main' },
          }}
        >
          <Tab value="short" label="단기업무" />
          <Tab value="mid" label="중기업무" />
          <Tab value="feedback" label="학생피드백" />
        </Tabs>
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          {currentTab === 'short' && <Label color="warning">3 OPEN</Label>}
        </Box>
      </Box>

      <Scrollbar>
        {list.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            checked={selected.includes(task.id)}
            onChange={() => handleClickComplete(task.id)}
          />
        ))}
      </Scrollbar>
    </Card>
  );
}

AppTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.info('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.info('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
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
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
