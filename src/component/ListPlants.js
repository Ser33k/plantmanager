import React, {useContext, useEffect, useState} from "react";
import PlantCard from "./PlantCard";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


function ListPlants(props) {

  return (
        <div>
          <GridList cellHeight={400}>
            {props.plants.map((plant) => (
                <GridListTile key={plant.name}>
                  <PlantCard plant={plant} delete={props.delete}/>
                </GridListTile>
            ))}
          </GridList>
        </div>
  );
}

export default ListPlants;
