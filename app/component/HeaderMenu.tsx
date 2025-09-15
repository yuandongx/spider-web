import { Button, Menu, MenuItem } from "@mui/material"
import { TypeMenuItem } from '../types/MenuItem';

import { useState } from "react";

export default function HeaderMenu(props: { menuItems: TypeMenuItem[]; name:string}) {
    const { menuItems, name } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);  
    };
    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
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
                {menuItems && menuItems.map((item) => (
                    <MenuItem key={item.key+'.'+name} onClick={handleClose}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}