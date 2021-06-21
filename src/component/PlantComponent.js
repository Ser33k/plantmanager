import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import PlantDataService from "../service/PlantDataService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HoverRating from "./HoverRating";
import {StoreContext} from "../store/storeProvider";
import Button from "@material-ui/core/Button";

function PlantComponent(props) {
  const [id, setId] = useState(parseInt(props.match.params.id));
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const { user } = useContext(StoreContext);

  let history = useHistory();

  useEffect(() => {
    if (id === -1) {
      return;
    }

    PlantDataService.retrievePlant(user.id, id).then((r) => {
      setDescription(r.data.description);
      setName(r.data.name);
    });
    console.log(name);
    console.log(description);
  });

  const validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Description";
    }

    return errors;
  };

  const handleOnSubmit = (values) => {
    const { id, name, description } = values;
    const plant = {
      name,
      description,
      measured_humidity: 20,
      owner: user
    };
    console.log(user);
    console.log(plant);
    if (id === -1) {

      PlantDataService.createPlant(user.id, plant).then(() => history.push("/"));
    } else {
      PlantDataService.updatePlant(user.id, id, plant).then(() =>
        history.push("/")
      );
    }
  };

  return (
    <div className={"background"}>

      <div className="container" style={{maxWidth: "600px", paddingTop: "60px"}}>
        <h2 className={'plant-header'} >{id === -1 ? 'Add plant' : 'Update plant'}</h2>
        <Formik
          initialValues={{ id, description, name }}
          onSubmit={(values) => handleOnSubmit(values)}
          validateOnChange={false}
          validateOnBlur={false}
          validate={validate}
          enableReinitialize={true}

        >
          {(props) => (
            <Form className={'plant-form'}>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
                style={{marginTop: "80px"}}
              />
              {/*<fieldset className="form-group">*/}
              {/*  <label>Id</label>*/}
              {/*  <Field*/}
              {/*    className="form-control"*/}
              {/*    type="text"*/}
              {/*    name="id"*/}
              {/*    disabled*/}
              {/*  />*/}
              {/*</fieldset>*/}
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Name</label>
                <Field className="form-control" type="text" name="name" />
              </fieldset>
              <HoverRating/>
              <Button variant={"contained"} style={{backgroundColor: "#a1ef8b",  fontSize: "40px"}} type="submit">
                Send
              </Button>
            </Form>
          )}
        </Formik>

      </div>

    </div>
  );
}

export default PlantComponent;
