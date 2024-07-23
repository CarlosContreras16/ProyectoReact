/*import "bootstrap/dist/css/bootstrap.min.css"*/
/*import { useEffect, useState } from 'react';*/
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './App.css';
import { useEffect, useState } from "react";

function App() {

    const [tareas, SetTareas] = useState([]);
    const [descripcion, setDescripcion] = useState("");

    const mostrarTareas = async () => {

        const response = await fetch("api/tarea/lista");

        if (response.ok) {

            const data = await response.json();
            SetTareas(data);
        } else
        {
            console.log("status code: " + response.status);
        }
    }
    useEffect(() => {
        mostrarTareas();
    }, [])

    const guardarTarea = async(e) =>{
        e.preventDefault()

        const response = await fetch("api/tarea/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({descripcion : descripcion})
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();

        }
    }

    const cerrarTarea = async (id) => {

        const response = await fetch("api/tarea/Cerrar/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            await mostrarTareas();

        }
    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-HN", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">

                <div className="col-sm-12">

                    <form onSubmit={guardarTarea}>

                        <div className="input-group">

                            <input type="text"
                                className="form-control"
                                placeholder="Ingrese la descripcion de la tarea"
                                value={descripcion}
                                onChange={ (e) => setDescripcion(e.target.value)}
                            ></input>

                            <button className="btn btn-success" type="submit">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>    

                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                            <button onClick={() => cerrarTarea(item.idTarea) } className="btn btn-sm btn-outline-danger">Cerrar</button>
                                        </div>
                                    </div>
                                    
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

    //const [forecasts, setForecasts] = useState();

    //useEffect(() => {
    //    populateWeatherData();
    //}, []);

    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    : <table className="table table-striped" aria-labelledby="tableLabel">
    //        <thead>
    //            <tr>
    //                <th>Date</th>
    //                <th>Temp. (C)</th>
    //                <th>Temp. (F)</th>
    //                <th>Summary</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {forecasts.map(forecast =>
    //                <tr key={forecast.date}>
    //                    <td>{forecast.date}</td>
    //                    <td>{forecast.temperatureC}</td>
    //                    <td>{forecast.temperatureF}</td>
    //                    <td>{forecast.summary}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;

    //return (
    //    <div>
    //        <h1 id="tableLabel">Weather forecast</h1>
    //        <p>This component demonstrates fetching data from the server.</p>
    //        {contents}
    //    </div>
    //);
    
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    setForecasts(data);
    //}
}

export default App;