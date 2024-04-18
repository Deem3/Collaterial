import { userAtom } from "@/store/auth";
import { Button } from "@mui/joy";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuLinkProps {
  link: string;
  icon: React.ReactNode;
  name: string;
  role?: string;
  buttonGap?: number;
}

const MenuLink: FunctionComponent<MenuLinkProps> = ({
  role,
  link,
  name,
  icon,
  buttonGap = 6,
}) => {
  const { pathname } = useLocation();

  const [user] = useAtom(userAtom);

  if (role && user?.sub.role != role) return null;

  return (
    <Link
      to={link}
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        disabled={pathname === link}
        color="neutral"
        startDecorator={icon}
        sx={{
          ":disabled": {
            color: "#fff",
            backgroundColor: "rgb(0,0,0,0.5)",
          },
          "--Button-gap": `${buttonGap}px`,
          width: "99%",
          borderRadius: "5px",
          justifyContent: "flex-start",
        }}
      >
        {name}
      </Button>
    </Link>
  );
};
export default MenuLink;
