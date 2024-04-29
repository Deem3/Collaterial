import { mainColors } from '@/config/colorScheme';
import { userAtom } from '@/store/auth';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Avatar, Box, Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    navigate('/login');
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
        borderBottom="solid 1px white"
      >
        <IconButton
          variant="plain"
          color="support"
          sx={{ height: 'fit-content', '--IconButton-size': '50px', marginX: '1%' }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box display="flex" marginRight={10}>
          <Avatar />

          <Dropdown>
            <MenuButton
              sx={{
                ':hover': {
                  bgcolor: 'transparent',
                },
                border: 'none',
                color: '#fff',
              }}
              endDecorator={<ExpandMoreOutlinedIcon sx={{ color: '#fff' }} />}
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
