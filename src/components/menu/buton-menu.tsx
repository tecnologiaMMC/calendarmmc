import { ListItemIcon, ListItemText, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { FaRegCircleUser, FaUserXmark } from "react-icons/fa6";
import { RiArchiveStackLine } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { PiUserCircleThin } from "react-icons/pi";
import { iniciarSession, whatsAppOpen } from "../menu_basic/buton_menu_basic";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function ButonMenu() {
   const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;
   const theme = useTheme();
   const isAboveSm = useMediaQuery(theme.breakpoints.up("md"));
   const anchorOrigin = isAboveSm
      ? ({ vertical: "bottom", horizontal: "center" } as const)
      : ({ vertical: "top", horizontal: "left" } as const);

   const transformOrigin = isAboveSm
      ? ({ vertical: "top", horizontal: "right" } as const)
      : ({ vertical: "bottom", horizontal: "right" } as const);
   return (
      <>
         <div

            className="flex items-center justify-center w-11 h-11 cursor-pointer rounded-full fixed bg-[#4E2A53] bottom-[18px] right-[18px] md:top-[13px]   md:right-[2%] lg:right-[3%] xl:right-[5%] "

            onClick={handleClick}
         >
            <div className="w-8 h-8 text-white p-[3px] sm:p-[2px]">
               <FaRegCircleUser className="w-full h-full hidden md:block " />
               <FaPlus className="w-full h-full block md:hidden" />
            </div>
         </div>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
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
               className="hidden md:block md:flex"
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
export default ButonMenu;
