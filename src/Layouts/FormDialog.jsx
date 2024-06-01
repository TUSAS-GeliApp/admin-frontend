import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
    const {open, setOpen, dialogTitle, dialogContent, contentText, maxWidth} = props;

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={maxWidth}
        >
            <DialogTitle id="dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">
                    {contentText}
                </DialogContentText>
                    {dialogContent}
            </DialogContent>
        </Dialog>
    );
}