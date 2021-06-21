import React, {useContext, useEffect, useState} from "react";
import PlantCard from "./PlantCard";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


function ListPlants(props) {

  return (
        // <div className={"background"}>
          <GridList style={{paddingTop: "60px"}} cellHeight={400}>
            {props.plants.map((plant) => (
                <GridListTile style={{display: "flex", justifyContent: "center", width: "50%"}} key={plant.name}>
                  <PlantCard style={{width: "200px"}} plant={plant} delete={props.delete}/>
                </GridListTile>
            ))}
          </GridList>
        // </div>
  );
}

export default ListPlants;
