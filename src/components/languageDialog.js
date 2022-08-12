import * as React from 'react';
import PropTypes from 'prop-types';
import { multilingualSupport } from "../utils";
import { useSetRecoilState } from "recoil";
import { multilingual } from "../atoms";

// MUI
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TranslateIcon from '@mui/icons-material/Translate';
import { teal, amber } from '@mui/material/colors';
import Divider from '@mui/material/Divider';


export default function LanguageDialog(props) {

    const languages = Object.keys(multilingualSupport);
    const setLanguage = useSetRecoilState(multilingual);

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        setLanguage(multilingualSupport[value])
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: amber[200], color: teal[900], mr: 1 }}>
                    <TranslateIcon />
                </Avatar>
                Select Language
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {languages.map((language) => (
                    <>
                        <Divider />
                        <ListItem button onClick={() => handleListItemClick(language)} key={language} sx={{ textAlign: "center" }}>
                            <ListItemText primary={language} />
                        </ListItem>
                    </>
                ))}
            </List>
        </Dialog>
    );
}

LanguageDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};