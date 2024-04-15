import { mainColors } from "@/config/colorScheme";
import { Box, Stack } from "@mui/joy";
import MenuLink from "./MenuLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Menu = () => {
  return (
    <Box bgcolor={mainColors.primary} height="100%">
      <Stack display="flex" alignItems="center" width="100%" paddingTop={4}>
        <MenuLink icon={<HomeOutlinedIcon />} name="Нүүр хуудас" link="/" />
        <MenuLink
          icon={<GroupOutlinedIcon />}
          link="/customer"
          name="Харилцагч"
        />
        <MenuLink
          icon={<ContentPasteOutlinedIcon />}
          link="/lend"
          name="Зээл"
        />
        <MenuLink
          icon={<InsertDriveFileOutlinedIcon />}
          name="Тайлан"
          link="/report"
        />
        <MenuLink
          icon={<SettingsOutlinedIcon />}
          name="Тохиргоо"
          link="/setting"
        />
      </Stack>
    </Box>
  );
};
export default Menu;
