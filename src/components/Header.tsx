import React from 'react';
import { IconButton, Switch } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

interface HeaderProps {
  isAdmin: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onToggle }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      {/* Empty space for alignment */}
      <div className="flex-grow" />

      {/* Right Side: Switch and Exit Button */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-medium">admin</span>
        <Switch
          checked={isAdmin}
          onChange={onToggle}
          color="success"
          inputProps={{ 'aria-label': 'Admin/User toggle' }}
        />
        <span className="text-white font-medium">user</span>
        <IconButton color="inherit">
          <ExitToApp fontSize="medium" className="text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
