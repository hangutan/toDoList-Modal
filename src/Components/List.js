import React from 'react';
//bootstrap-react
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function List({
    name,
    level,
    tasks,
    idEdit,
    styleLevel,
    toggleEdit,
    handleEdit,
    handleLevel,
    handleName,
    handleDelete
  }){
    return(
      <Table striped bordered hover className="table_list">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Level</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map(task=>{
                return <tr key={task.id}>
                  <td>...</td>
                  <td>
                    { 
                      toggleEdit && task.id === idEdit 
                        ? 
                      <Form.Control type="text" value={name} onChange={handleName}/> 
                        :
                      task.name
                    }
                  </td>
                  <td className="text-center">
                    { 
                      toggleEdit && task.id === idEdit 
                        ? 
                      <Form.Control 
                        as="select"
                        value={level}
                        onChange={handleLevel}
                      >
                        <option value='0'>Small</option>
                        <option value='1'>Medium</option>
                        <option value='2'>High</option>
                      </Form.Control>
                        :
                      <span className={`badge ${styleLevel[task.level].style}`}>{styleLevel[task.level].name}</span>
                    }  
                  </td>
                  <td>
                    <Button 
                      variant="primary" className="btn-edit" 
                      onClick={()=>handleEdit(task.id)}
                    >
                      {toggleEdit && task.id === idEdit ?'Save Edit':'Edit'}
                    </Button>
                    <Button variant="danger" className="btn-delete" onClick={()=>handleDelete(task.id)}>Delete</Button>
                  </td>
                </tr>
              })
            }
              
          </tbody>
        </Table>
    )
}
