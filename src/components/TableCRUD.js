import React from "react";
import './showU.css';
import {Link} from "react-router-dom";
const TableCRUD = ({ labels, bodyData, editRoute, deleteFunction}) => {
    return (
        <table className='crud-table table'>
            <thead>
            <tr>
                {labels.map((label) => {
                    return (
                        <th scope="col" key={label}>{label}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {
                bodyData.map((row) => {
                    return (
                        <tr key={row.id}>
                            { row.data_row.map(element => { return (<td>{element}</td>) }) }
                            <td><Link to={ editRoute + row.id } className="btn btn-info btn-sm"><i className="fa-solid fa-pencil"></i> Editar</Link></td>
                            <td>                    <button onClick={() => { deleteFunction(row.id) }} className="btn btn-danger btn-sm ml-2"><i className="fa-solid fa-trash"></i> Eliminar</button>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};

export default TableCRUD;