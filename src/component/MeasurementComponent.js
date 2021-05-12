import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {StoreContext} from "../store/storeProvider";
import PlantDataService from "../service/PlantDataService";
import MeasurementDataService from "../service/MeasurementDataService";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import cactus from "./../static/images/cards/cactus.jpg"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { FaThermometerHalf } from 'react-icons/fa';
import {WiHumidity} from "react-icons/wi";
import {deepPurple, purple} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center"
    },
    head:{
        fontSize: theme.typography.pxToRem(30),
        fontFamily: 'Roboto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
        width: '30vw',
    },
    imgContainer: {
        maxHeight: '100%',
        display: "flex",
        alignItems: "center",
        borderRadius: '50%'
    },
    img: {
        maxHeight: '15vw',
        borderRadius: '30%'


    },
    font: {
        fontSize: '40px'
    },
    divider: {
        backgroundColor: deepPurple[400]
    },
    expanded: {
        backgroundColor: "white"
    },
    title: {
        margin: '20px'
    },
    accordion: {
        backgroundColor: deepPurple[50]
    }

}));

const MeasurementComponent = (props) => {
    const classes = useStyles();

    const {user} = useContext(StoreContext);
    const [plantId, setPlantId] = useState(parseInt(props.match.params.id));
    const [plant, setPlant] = useState([]);

    const [measurement, setMeasurement] = useState([]);

    useEffect(() => {
        PlantDataService.retrievePlant(user.id, plantId).then((r) => {
            setPlant(r.data);
        });

        MeasurementDataService.retrieveAllMeasurementByPlantId(plantId)
            .then(r => setMeasurement(r.data));
    }, [])

    const accordionComponents = measurement.length > 0 ? measurement.map(measure => {
        const date = new Date(measure.date);
        return(
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{date.toString().slice(0,24)}</Typography>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails className={classes.root}>
                    <List component="nav" className={classes.table} aria-label="mailbox folders">
                        <ListItem  button>
                            <WbSunnyOutlinedIcon className={classes.font}/>
                            <ListItemText align='right' primary={measure.brightness+'%'}/>
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <WiHumidity className={classes.font}/>

                            <ListItemText align='right' primary={measure.humidity+'%'} />
                        </ListItem>
                        <ListItem button>
                            <FaThermometerHalf className={classes.font}/>
                            <ListItemText align='right' primary={measure.temperature+'°C'} />
                        </ListItem>

                    </List>
                    <div className={classes.imgContainer}>
                        <img className={classes.img} src={cactus} alt="cactus"/>
                    </div>
                </AccordionDetails>
            </Accordion>
        )

    }) :
        <Typography variant='h5'>There is no measurements for this plant :(</Typography>

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant='h3' component='h2'>Measurements</Typography>
            <Divider className={classes.divider}/>
            <Typography className={classes.title} variant='h4' component='h4'>{plant.name}</Typography>

            {accordionComponents}
        </div>
    )
}

export default MeasurementComponent;