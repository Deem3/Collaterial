import { mainColors } from '@/config/colorScheme';
import { Box, Grid, Typography } from '@mui/joy';
import AppModule from './AppModule';
import {
  PeopleAltOutlined,
  ContentPasteOutlined,
  InboxOutlined,
  InsertDriveFileOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';
const HomeContainer = () => {
  const [user] = useAtom(userAtom);
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
          Барьцаа хөрөнгө бүртгэлийн программ
        </Typography>
      </Box>
      <Grid
        gridTemplateRows="1fr"
        gridTemplateColumns={user?.sub.role === 'EMPLOYEE' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'}
        display="grid"
        marginTop={5}
        marginX={5}
        justifyItems="center"
      >
        {user?.sub.role === 'EMPLOYEE' ? (
          <>
            <AppModule
              title="Харилцагч"
              icon={<PeopleAltOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />}
              to="/customer"
            />
            <AppModule
              title="Барьцаа хөрөнгө"
              icon={<InboxOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />}
              to="/collateral"
            />
            <AppModule
              title="Зээл"
              icon={<ContentPasteOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />}
              to="/lend"
            />
            <AppModule
              title="Тайлан"
              icon={
                <InsertDriveFileOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />
              }
              to="/report"
            />
          </>
        ) : (
          <>
            <AppModule
              title="Хэрэглэгч"
              icon={<PersonOutlineOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />}
              to="/user"
            />
            <AppModule
              title="Хөрөнгийн төрөл"
              icon={<InboxOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />}
              to="/asset"
            />
            <AppModule
              title="Тайлан"
              icon={
                <InsertDriveFileOutlined sx={{ fontSize: '5rem', color: mainColors.primary }} />
              }
              to="/report"
            />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default HomeContainer;
