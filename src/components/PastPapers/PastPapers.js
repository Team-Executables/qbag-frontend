import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";
import axiosInstance from "../../axios";
import { format } from 'date-fns';

//MUI
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@mui/material";
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';

const PastPapers = () => {
    const navigate = useNavigate();
    const uData = useRecoilValue(userData);

    const [paperList, setPaperList] = useState([]);

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        else {
            axiosInstance
                .get(`questions/all-papers`)
                .then((res) => {
                    console.log(res.data);
                    setPaperList(res.data.papers);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const handleClick = (paper_id) => {
        console.log(paper_id);
        navigate(`/dashboard/question/paper/${paper_id}`)
    }



    return (
        <Box>
            <List>
                {paperList && paperList.length > 0 ? paperList.map((paper) => (
                    <Paper sx={{ marginTop: "10px", backgroundColor: "#e1f5fe" }} key={paper.id}>
                        <ListItem button onClick={() => handleClick(paper.id)}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "white" }}>
                                    <AssignmentTwoToneIcon color="primary" sx={{ fontSize: 26 }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={paper.name}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2">
                                            Board: {paper.board} | Class: {paper.grade}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2">
                                            Marks: {paper.total_marks} | Questions: {paper.total_marks}
                                        </Typography>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2">
                                    Generated On <br />
                                    {`${format(new Date(paper.export_date), "do MMM, yyyy")}`}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))

                    :

                    <Typography variant="overline" display="block" gutterBottom>
                        No question papers generated yet
                    </Typography>
                }
            </List>
        </Box>
    );
};

export default PastPapers;
