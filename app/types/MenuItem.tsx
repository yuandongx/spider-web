export interface TypeMenuItem {
  label: string;
  href: string;
  key: string;
  children?: TypeMenuItem[];
}

export interface HeaderMenuProps {
  menuItems: TypeMenuItem[];
}