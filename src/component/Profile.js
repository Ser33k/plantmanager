import React, {useContext} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {StoreContext} from "../store/storeProvider";
import userJpg from "../static/images/cards/user.jpg"
import Button from "@material-ui/core/Button";


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


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={userJpg}
                title={user.name}
                classes={{
                    root: classes.imgRoot,
                }}
            >
                <Button className={classes.button} variant="contained" color="primary">
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