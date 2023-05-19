import React from "react";
interface HeaderProps {
    handleLogout: () => void;
    title: string;
    setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarVisible: boolean;
    isLoggedIn: boolean;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
