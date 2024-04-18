import { mainColors } from '@/config/colorScheme';
import { Box, Typography } from '@mui/joy';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

type AppModuleProps = {
  title: string;
  icon: React.ReactNode;
  to: string;
};

const AppModule: FunctionComponent<AppModuleProps> = ({ title, icon, to }) => {
  return (
    <Link
      to={to}
      className="h-[10rem] w-[15rem] shadow-module rounded-[10px] overflow-hidden hover:cursor-pointer flex flex-col"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        bgcolor={mainColors.primary}
        height="5rem"
        alignItems="center"
      >
        <Typography textColor="#fff" fontSize={20} fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        {icon}
      </Box>
    </Link>
  );
};

export default AppModule;
