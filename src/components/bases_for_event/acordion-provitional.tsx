import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props{
    children:JSX.Element,
}

function AcordionProvitional({children}:Props) {
   return (
      <Accordion>
         <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={<ExpandMoreIcon />}
         >
            <p className="text-p-mmc text-[22px]">
                     Modalidades y restricciones
                  </p>
         </AccordionSummary>
         <AccordionDetails>
           {children}
         </AccordionDetails>
      </Accordion>
   );
}
export default AcordionProvitional;
