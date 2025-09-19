import { Button, Menu, MenuItem, Link } from "@mui/material"
import { TypeMenuItem } from '../types/MenuItem';

import { useState } from "react";

export default function HeaderMenu(props: { menuItems: TypeMenuItem[]; name:string, linkto: string}) {
    const { menuItems, name, linkto } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);  
    };
    if (!menuItems || menuItems.length === 0) {
        return (
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                href={linkto}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {name}
            </Button>);
    }
    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
                
            >
                {name}
            </Button>
            <Menu
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: '45px' }}
                id={name}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem divider  key={item.key+'.'+name} onClick={handleClose}>
                        <Link underline="hover" href={item.href}>{item.label}</Link>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}