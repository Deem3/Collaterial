import {
  IconButton,
  Box,
  Avatar,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
} from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { mainColors } from "@/config/colorScheme";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    navigate("/login");
    setUser(null);
  };
  return (
    <>
      <Box
        display="flex"
        height="10vh"
        width="100%"
        bgcolor={mainColors.primary}
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          variant="plain"
          color="support"
          sx={{ height: "fit-content", "--IconButton-size": "100px" }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box display="flex" marginRight={10}>
          <Avatar />

          <Dropdown>
            <MenuButton
              sx={{
                ":hover": {
                  bgcolor: "transparent",
                },
                border: "none",
                color: "#fff",
              }}
              endDecorator={<ExpandMoreOutlinedIcon sx={{ color: "#fff" }} />}
            >
              {user?.username}
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => logout()}>
                Log out <LogoutOutlinedIcon />
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Box>
    </>
  );
};

export default Header;
