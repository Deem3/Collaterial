import { mainColors } from "@/config/colorScheme";
import { Box, Stack } from "@mui/joy";
import MenuLink from "./MenuLink";
import {
  ContentPasteOutlined,
  InsertDriveFileOutlined,
  GroupOutlined,
  HomeOutlined,
  InboxOutlined,
} from "@mui/icons-material";

const Menu = () => {
  return (
    <Box bgcolor={mainColors.primary} height="100%">
      <Stack
        display="flex"
        rowGap="28px"
        alignItems="center"
        width="100%"
        paddingTop={4}
      >
        <MenuLink icon={<HomeOutlined />} name="Нүүр хуудас" link="/" />
        <MenuLink icon={<GroupOutlined />} link="/customer" name="Харилцагч" />
        <MenuLink
          icon={<InboxOutlined />}
          link="/collateral"
          name="Барьцаа хөрөнгө"
        />
        <MenuLink icon={<ContentPasteOutlined />} link="/lend" name="Зээл" />
        <MenuLink
          icon={<InsertDriveFileOutlined />}
          name="Тайлан"
          link="/report"
        />
      </Stack>
    </Box>
  );
};
export default Menu;
