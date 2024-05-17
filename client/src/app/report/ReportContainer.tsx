import { mainColors } from '@/config/colorScheme';
import { Box, Grid, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import ReportModule from './ReportModule';

const ReportContainer: FunctionComponent = () => {
  const collateralReport = useQuery({
    queryKey: ['collateralReport'],
    queryFn: async () => {
      const { data } = await axios.get('/api/collateral', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const customerReport = useQuery({
    queryKey: ['customerReport'],
    queryFn: async () => {
      const { data } = await axios.get('/api/customer/customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const loanReport = useQuery({
    queryKey: ['loanReport'],
    queryFn: async () => {
      const { data } = await axios.get('/api/lend', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  return (
    <Box height="100vh" width="100%">
      <Box borderBottom="solid 1px #776E6E">
        <Typography
          fontSize={24}
          fontWeight="bold"
          textColor={mainColors.primary}
          marginLeft={15}
          marginY={2}
        >
          Тайлан
        </Typography>
      </Box>
      <Grid
        gridTemplateRows="1fr"
        gridTemplateColumns={'repeat(3, 1fr)'}
        display="grid"
        marginTop={5}
        marginX={5}
        justifyItems="center"
      >
        <ReportModule
          title="Харилцагч"
          statistic={customerReport.data?.length}
          loading={customerReport.isLoading}
        />
        <ReportModule
          title="Барьцаа хөрөнгө"
          statistic={collateralReport.data?.length}
          loading={collateralReport.isLoading}
        />
        <ReportModule
          title="Зээл"
          statistic={loanReport.data?.length}
          loading={loanReport.isLoading}
        />
      </Grid>
    </Box>
  );
};

export default ReportContainer;
