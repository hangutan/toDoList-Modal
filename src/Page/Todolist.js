import React,{useState,useCallback} from 'react';
import uuid from 'react-uuid';
import Modal from '../Components/Modal';
//import Component
import FormList from '../Components/FormList';
import List from '../Components/List';
//react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Todolist(){
  const data =[
    {
      id : uuid(),
      name : 'Javascript Master',
      level: 0
    },
    {
      id:uuid(),
      name:'Nodejs Express',
      level: 1
    },
    {
      id:uuid(),
      name:'PHP & SQL',
      level: 2
    }
  ];

  const dataLevel=[
    {
      name : 'Small',
      style:'badge-danger'
    },
    {
        name:'Medium',
        style:'badge-primary'
    },
    {
        name:'High',
        style:'badge-success'
    }
  ]

  const [tasks,setTasks]= useState(data);
  const [name, setName] = useState('');
  const [level,setLevel] = useState(0);
  const [styleLevel,setStyleLevel]= useState(dataLevel);
  const [isvisible,setIsvisible] = useState(false);
  const [toggleEdit,setToggleEdit] = useState(false);
  const [idEdit,setIdEdit] = useState('');
  const [search,setSearch] = useState('');

  const onCancel = useCallback( ()=>{
    setIsvisible(false);
  },[]
  );

  const handleName =(e)=>{
    setName(e.target.value);
  }
  const handleLevel = (e) =>{
    setLevel(e.target.value)
  }
  const handleSubmit = () =>{
    let newTask = {
      id : uuid(),
      name,
      level
    }
    console.log(newTask)
    setTasks([...tasks,newTask]);
    setName('');
    setLevel(0);
    onCancel();
  }
  const handleDelete = (id) =>{
    console.log(id);
    let newTask = tasks.filter(task=>{
      return task.id !== id
    });
    console.log(newTask);
    setTasks(newTask);
  }
  const handleEdit = (id)=>{
    if(toggleEdit===false){
      setIdEdit(id);
      setToggleEdit(true);
      let taskEdit = tasks.find(task=>{
        return task.id === id
      })
      const { name , level } = taskEdit;
      setName(name);
      setLevel(level);
    }else{
      let newEditTask = [...tasks.map(item=>{
        return item.id===id ? {...item,name,level} : item
      })]
      setTasks(newEditTask);
      setToggleEdit(false);
      setName('');
      setLevel(0);
    }
  }
  const handleSearch = (e)=>{
    console.log(e.target.value);
    setSearch(e.target.value);
  }
  const handleClear = ()=>{
    setSearch('');
  }
  const handleSort = (e)=>{
    console.log(e.target.name);
    if(e.target.name === "ascname"){
        let taskSort = [...tasks.sort((a,b) =>{
          if(a.name > b.name) return 1;
            else if (a.name < b.name) return -1;
            else return 0;
        })]
      setTasks(taskSort);
    }else if(e.target.name === 'asclevel'){
      let taskSort = [...tasks.sort((a,b) =>{
        if(a.level > b.level) return 1;
          else if (a.level < b.level) return -1;
          else return 0;
      })
    ]
    setTasks(taskSort);
    }else if(e.target.name ==='descname'){
      let taskSort = [...tasks.sort((a,b) =>{
        if(a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
      })]
    setTasks(taskSort);
    }else{
      let taskSort = [...tasks.sort((a,b) =>{
        if(a.level > b.level) return -1;
          else if (a.level < b.level) return 1;
          else return 0;
      })]
      setTasks(taskSort);
    }
  }

  let injectedProps = {
    isvisible,
    isRenderHeader : true,
    title : 'Thêm Danh Sách Khóa Học',
    onCancel : onCancel ,
    renderFooter : () =>{
      return (
        <div>
          <Button className="cancel-form" variant="danger" onClick={onCancel}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
      )
    }
  }

  return(
    <>
      <div className="content">
        <FormList 
          search={search}
          isvisible={isvisible}
          handleClear={handleClear}
          handleSort={handleSort}
          setIsvisible={setIsvisible}
          handleSearch={handleSearch}
        />
        <List 
          tasks={tasks.filter(task =>{
            return task.name.toLowerCase().indexOf(search) !== -1
          })}
          name= {name}
          level= {level}
          idEdit={idEdit}
          handleName={handleName}
          handleLevel={handleLevel}
          styleLevel={styleLevel}
          toggleEdit={toggleEdit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <Modal {...injectedProps}>
        <Form className="form-list">
          <Form.Control 
            className='input-name' size="md" type="text" 
            placeholder="Name" value={name} onChange={handleName}
          />
          <Form.Control 
            as="select"
            value={level}
            onChange={handleLevel}
          >
            <option value='0'>Small</option>
            <option value='1'>Medium</option>
            <option value='2'>High</option>
          </Form.Control>
        </Form>
      </Modal>
    </>
  )
}