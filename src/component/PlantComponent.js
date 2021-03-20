import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PlantDataService from "../service/PlantDataService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HoverRating from "./HoverRating";

function PlantComponent(props) {
  const [id, setId] = useState(parseInt(props.match.params.id));
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (id === -1) {
      return;
    }

    PlantDataService.retrievePlant(id).then((r) => {
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
    debugger;
    const { id, name, description } = values;

    const plant = {
      id,
      name,
      description,
    };

    if (id === -1) {
      PlantDataService.createPlant(plant).then(() => history.push("/plants"));
    } else {
      PlantDataService.updatePlant(id, plant).then(() =>
        history.push("/plants")
      );
    }
  };

  return (
    <div>
      <h3>Plant details</h3>
      <div className="container">
        <Formik
          initialValues={{ id, description, name }}
          onSubmit={(values) => handleOnSubmit(values)}
          validateOnChange={false}
          validateOnBlur={false}
          validate={validate}
          enableReinitialize={true}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Id</label>
                <Field
                  className="form-control"
                  type="text"
                  name="id"
                  disabled
                />
              </fieldset>
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
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <HoverRating/>
    </div>
  );
}

export default PlantComponent;
