import { mainColors } from '@/config/colorScheme';
import { userAtom } from '@/store/auth';
import {
  ContentPasteOutlined,
  GroupOutlined,
  HomeOutlined,
  InboxOutlined,
  InsertDriveFileOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import { Box, Stack } from '@mui/joy';
import { useAtom } from 'jotai';
import MenuLink from './MenuLink';

const Menu = () => {
  const [user] = useAtom(userAtom);
  return (
    <Box bgcolor={mainColors.primary} height="100%">
      <Stack display="flex" rowGap="28px" alignItems="center" width="100%" paddingTop={4}>
        {user?.sub.role === 'EMPLOYEE' ? (
          <>
            <MenuLink icon={<HomeOutlined />} name="Нүүр хуудас" link="/" />
            <MenuLink icon={<GroupOutlined />} link="/customer" name="Харилцагч" />
            <MenuLink icon={<InboxOutlined />} link="/collateral" name="Барьцаа хөрөнгө" />
            <MenuLink icon={<ContentPasteOutlined />} link="/lend" name="Зээл" />
            <MenuLink icon={<InsertDriveFileOutlined />} name="Тайлан" link="/report" />
          </>
        ) : (
          <>
            <MenuLink icon={<HomeOutlined />} name="Нүүр хуудас" link="/" />
            <MenuLink icon={<PersonOutlineOutlined />} name="Хэрэглэгч" link="/user" />
            <MenuLink icon={<InboxOutlined />} link="/asset" name="Хөрөнгийн төрөл" />
            <MenuLink icon={<InsertDriveFileOutlined />} name="Тайлан" link="/report" />
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Menu;
