import React, {useContext, useState, useEffect} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {StoreContext} from "../store/storeProvider";
import userJpg from "../static/images/cards/user.jpg"
import Button from "@material-ui/core/Button";
import axios from "../axios-config";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    imgRoot: {
        borderRadius: "50%",
        // maxWidth: "10%",
        width: "100%",
        height: "auto",
        marginBottom: "20px"
    },
    media: {
        // height: 0,
        paddingTop: '56.25%', // 16:9
        display: "flex",
        justifyContent: "center",
        // width: "100%",
        height: "auto",
        maxWidth: "300px"

    },
    actionButtons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Profile() {
    const classes = useStyles();
    const {user} = useContext(StoreContext);
    const [picture, setPicture] = useState()

    useEffect(async () => {
        try {
            let formData = new FormData();
            await axios.get("/image/" + user.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(r => setPicture(`${r.data}`));

        } catch (e) {
            console.log("LIPA")
            console.log(e)
            setPicture(userJpg);
        }
    }, [user.id]);

    const pickerOpts = {
        types: [
            {
                description: 'Images',
                accept: {
                    'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                }
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false
    };



    async function changeAvatar() {
        let fileHandle
        // open file picker
        [fileHandle] = await window.showOpenFilePicker(pickerOpts);

        // get file contents
        const fileData = await fileHandle.getFile();
        const objectURL = window.URL.createObjectURL(fileData);
        setPicture(objectURL)

        //test Dawida

        //Robię czytacza plików
        const userId = user.id
        console.log(user.id)
        const reader = new FileReader();
        //Mówię co ma zrobić po przeczytaniu
        reader.onloadend = async function () {
            //przerabiam image na blob
            //.split(/,(.+)/)[1]]
            let imgBlob = new Blob([reader.result]);
            console.log(reader.result)
            let formData = new FormData();
            //wrzucam image przerobiony na blob do requesta
            formData.append("multipartImage", imgBlob);
            //postuję axiosem do bazy
            await axios.post("/image/" + userId, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        }
        reader.readAsDataURL(fileData);
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={picture}
                title={user.name}
                classes={{
                    root: classes.imgRoot,
                }}
            >
                <Button className={classes.button}
                        variant="contained"
                        onClick={changeAvatar}
                        color="primary">
                    CHANGE AVATAR
                </Button>

            </CardMedia>

            <CardContent>
                <Typography style={{
                    textAlign: "center"
                }} variant="h3" color="textPrimary" component="p">
                    {`${user.fname} ${user.lname}`}
                </Typography>
                <Typography style={{
                    textAlign: "center"
                }} variant="h5" color="textPrimary" component="p">
                    {user.email}
                </Typography>
            </CardContent>

            <CardActions className={classes.actionButtons} disableSpacing>
                <Button style={{marginBottom: "10px"}} variant="contained" color="primary">CHANGE PASSWORD</Button>
                <Button variant="contained" color="secondary">DELETE ACCOUNT</Button>
            </CardActions>
        </Card>
        </div>
    );
};