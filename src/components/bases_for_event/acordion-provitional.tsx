import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props{
    children:JSX.Element,
    title:string
}

function AccordionCustomize({children,title}:Props) {
   return (
      <Accordion>
         <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={<ExpandMoreIcon />}
         >
            <p className="text-p-mmc text-[22px]">
                     {title}
                  </p>
         </AccordionSummary>
         <AccordionDetails>
           {children}
         </AccordionDetails>
      </Accordion>
   );
}
export default AccordionCustomize;
