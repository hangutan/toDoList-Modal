import React from 'react';
//react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export default function FormList({
  isvisible,
  setIsvisible,
  handleSort,
  handleSearch,
  handleClear,
  search
  }){
  return (
    <Row>
        <Col md={6}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort List
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item name="ascname" onClick={handleSort}>ASC Name</Dropdown.Item>
            <Dropdown.Item name="descname" onClick={handleSort}>DESC Name</Dropdown.Item>
            <Dropdown.Item name='asclevel' onClick={handleSort}>ASC Level</Dropdown.Item>
            <Dropdown.Item name='desclevel' onClick={handleSort}>DESC Level</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <Form >
            <Form.Control 
              className='search-name' size="md" type="text" placeholder="Search name ..." 
              onChange={handleSearch}
              value={search}
            />
            <Button className="btn-search" onClick={handleClear}>Clear</Button>
          </Form>
        </Col>
        <Col md={6}>
          <Button className="btn-open" variant="primary" onClick={()=>setIsvisible(!isvisible)}>Click Open Form Create List</Button>
        </Col>
    </Row>
  )
}