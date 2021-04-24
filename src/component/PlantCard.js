import React, {useContext} from 'react';
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
import {useHistory} from "react-router-dom";

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
    const classes = useStyles();
    const {user} = useContext(StoreContext);
    let history = useHistory();

    function updatePlantClicked(id) {
        history.push(`/plants/${id}`);
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
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.plant.name}
                subheader={props.plant.description}
            />
            <CardMedia
                className={classes.media}
                image={cactus}
                title={props.plant.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.plant.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="update"
                            onClick={() => updatePlantClicked(props.plant.id)}>
                    <Update />
                </IconButton>
                <IconButton aria-label="remove"
                            onClick={() => props.delete(props.plant)}>
                    <Remove />
                </IconButton>
            </CardActions>
        </Card>
    );
}
