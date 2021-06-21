import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import cactus from "./../static/images/cards/cactus.jpg"
import {StoreContext} from "../store/storeProvider";
import {Remove, Update} from "@material-ui/icons";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {useHistory} from "react-router-dom";
import axios from "../axios-config";
import userJpg from "../static/images/cards/user.jpg";



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function PlantCard(props) {
    const [picture, setPicture] = useState()

    const classes = useStyles();
    const {user} = useContext(StoreContext);
    let history = useHistory();

    function updatePlantClicked(id) {
        history.push(`/plants/${id}`);
    }

    function showMeasurements(id) {
        history.push(`measurement/${id}`);
    }

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

    useEffect(async () => {
        try {
            let formData = new FormData();
            await axios.get("/image/plant/" + props.plant.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(r => setPicture(`${r.data}`));

        } catch (e) {
            console.log("LIPA")
            console.log(e)
            setPicture(userJpg);
        }
    }, [props.plant.id]);


    async function changePhoto() {
        let fileHandle
        // open file picker
        [fileHandle] = await window.showOpenFilePicker(pickerOpts);

        // get file contents
        const fileData = await fileHandle.getFile();
        const objectURL = window.URL.createObjectURL(fileData);
        setPicture(objectURL)

        //test Dawida

        //Robię czytacza plików
        const reader = new FileReader();
        //Mówię co ma zrobić po przeczytaniu
        reader.onloadend = async function () {
            //przerabiam image na blob
            let imgBlob = new Blob([reader.result]);
            console.log(reader.result)
            let formData = new FormData();
            //wrzucam image przerobiony na blob do requesta
            formData.append("multipartImage", imgBlob);
            //postuję axiosem do bazy
            await axios.post("/image/plant/" + props.plant.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        }
        reader.readAsDataURL(fileData);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="user" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.plant.name}
                subheader={props.plant.description}
            />
            <CardMedia
                onClick={() => showMeasurements(props.plant.id)}
                className={classes.media}
                image={picture}
                title={props.plant.name}
                style={{cursor: 'pointer'}}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.plant.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="update"
                            onClick={() => updatePlantClicked(props.plant.id)}>
                    <Update/>
                </IconButton>
                <IconButton onClick={() => showMeasurements(props.plant.id)} aria-label="share">
                    <EqualizerIcon/>
                </IconButton>
                <IconButton onClick={changePhoto}>
                    <AddAPhotoIcon/>
                </IconButton>
                <IconButton aria-label="remove"
                            onClick={() => props.delete(props.plant)}>
                    <Remove/>
                </IconButton>
            </CardActions>
        </Card>
    );
}
