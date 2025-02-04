import { ListItemIcon, ListItemText, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { FaRegCircleUser, FaUserXmark } from "react-icons/fa6";
import { RiArchiveStackLine } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
export const iniciarSession = () => {
   window.open("https://sesion.eventosdemarinera.com/", "_blank");
};

export const whatsAppOpen = () => {
   window.open("https://wa.me/954109568", "_blank");
};
function ButonMenuBasic() {
   const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const open = Boolean(anchorEl);
   const id = open ? "simple-popoverr" : undefined;

   return (
      <>
         <div
            className="flex items-center justify-center w-11 h-11 right-4 lg:right-[5%] cursor-pointer rounded-full fixed top-[16px]"
            onClick={handleClick}
         >
            <div className="w-11 h-11 text-white p-[2px] ">
               <FaRegCircleUser className="w-full h-full " />
            </div>
         </div>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
         >
            <MenuItem role="button" onClick={() => whatsAppOpen()}>
               <ListItemIcon className="min-w-40">
                  <RiArchiveStackLine />
               </ListItemIcon>
               <ListItemText
                  primary="Registrar evento"
                  className="!font-sans !text-gray-600"
               />
            </MenuItem>
            <MenuItem
               role="button"
               onClick={() => iniciarSession()}
               
            >
               <ListItemIcon className="min-w-40">
                  <FaSignInAlt />
               </ListItemIcon>
               <ListItemText
                  primary="Ingresar"
                  className="!font-sans !text-gray-600"
               />
            </MenuItem>
         </Popover>
      </>
   );
}
export default ButonMenuBasic;
