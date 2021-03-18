import {useEffect, useState} from "react";
import PlantDataService from "../service/PlantDataService";
import {Formik, Form, Field} from "formik";

function PlantComponent(props) {
    const [id, setId] = useState(props.match.params.id)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if (id === -1) {
            return
        }

        PlantDataService.retrievePlant(id)
            .then(r => {
                setDescription(r.data.description)
                setName(r.data.name)
            })
        console.log(name)
        console.log(description)
    })

    return (
        <div>
            <h3>Plant details</h3>
            <div className="container">
                <Formik
                    initialValues={{ id, description, name }}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}

export default PlantComponent
