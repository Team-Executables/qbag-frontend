import React from 'react';
import { useRecoilValue } from "recoil";
import { multilingual } from "../atoms";

//MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {

    const multi = useRecoilValue(multilingual);

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.closeDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.description.split('\\n').map((item, key) => {
                            return <React.Fragment key={key}>{item}<br /></React.Fragment>
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeDialog} variant="contained" color="primary">
                        {multi.ok}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}