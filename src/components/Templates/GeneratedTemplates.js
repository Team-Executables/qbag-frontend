/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userData, multilingual } from "../../atoms";
import axiosInstance from "../../axios";

//MUI
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';

const GeneratedTemplates = () => {
    const navigate = useNavigate();
    const uData = useRecoilValue(userData);
    const multi = useRecoilValue(multilingual);

    const [templateList, setTemplateList] = useState([]);

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        else {
            axiosInstance
                .get(`questions/get-url-template`)
                .then((res) => {
                    const obj = []
                    Object.entries(res.data.saved_url_templates).forEach(([key, value]) => obj.push(value));
                    console.log(obj)
                    setTemplateList(obj);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const handleClick = (template_string) => {
        console.log(template_string);
        navigate(template_string)
    }


    return (
        <Box>
            <List>
                {templateList && templateList.length > 0 ? templateList.map((paper) => (
                    <Paper sx={{ marginTop: "10px", backgroundColor: "#e1f5fe" }} key={paper.template_string}>
                        <ListItem button onClick={() => handleClick(paper.template_string)}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "white" }}>
                                    <AssignmentTwoToneIcon color="primary" sx={{ fontSize: 26 }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={paper.name}
                            />
                        </ListItem>
                    </Paper>
                ))

                    :
                <Typography variant="overline" display="block" gutterBottom>
                    {multi.noTemplatesSaved}
                </Typography>
                }
            </List>
        </Box>
    );
};

export default GeneratedTemplates;
