import { mainColors } from '@/config/colorScheme';
import { Box, CircularProgress, Typography } from '@mui/joy';
import { FunctionComponent } from 'react';

type ReportModuleProps = {
  title: string;
  statistic: number;
  loading: boolean;
};

const ReportModule: FunctionComponent<ReportModuleProps> = ({ title, statistic, loading }) => {
  return (
    <div className="h-[10rem] w-[15rem] shadow-module rounded-[10px] overflow-hidden hover:cursor-pointer flex flex-col">
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
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography fontSize={30} fontWeight={500}>
            {statistic}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default ReportModule;
