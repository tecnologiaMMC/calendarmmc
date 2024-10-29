import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stringifier } from 'postcss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  p: 0,
  minWidth: '300px',
  border:'mone',
  outline:'none'
};

export default function ModalImage({url}:{url:string}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img  src={url} alt="" onClick={handleOpen}  className='w-full h-full object-cover'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={url} alt="" onClick={handleOpen} />
        </Box>
      </Modal>
    </>
  );
}