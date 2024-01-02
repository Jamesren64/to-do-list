import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

function App() {

  const [curTextVal, setCurTextVal] = useState("")

  const [toDoTasks, setToDoTasks] = useState([{name:"Task 1", check:false, id:1}, {name:"Task 2", check:false, id:2}, {name:"Task 3", check:false, id:3}])

  console.log(toDoTasks)
  function handleCheck(id) {
    const sortedToDoTasks = [...toDoTasks]
    sortedToDoTasks.forEach(item => {
      if (item.id === id) item.check = !item.check
    })
    setToDoTasks(sortedToDoTasks)

  }

  function mapFunction(task, index) {
    const textDecorationSx = task.check ? 'line-through' : undefined;
    const textColorSx = task.check ? 'gray' : 'black';
    return (
      <>
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography sx={{paddingLeft: 2, textDecoration: textDecorationSx, color: textColorSx}}>{task.name}</Typography> 
          <Stack flexDirection={'row'} sx={{paddingRight: 1}}>
            <Checkbox checked={task.check} onChange={() => handleCheck(task.id)} />
            <IconButton sx={{marginLeft: -1}}>
              <DeleteIcon onClick={() => deleteTask(task.id)}/>
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
      </>
    )
  }

  function updateCurText(event) {
    setCurTextVal(event.target.value)
  }

  function createTask() {
    const listOfIds = toDoTasks.map(task => task.id)
    setToDoTasks([...toDoTasks, {name: curTextVal, check:false, id: Math.max(...listOfIds) + 1}])
  }

  function deleteTask(id) {
    const index = toDoTasks.findIndex(task => task.id === id)
    setToDoTasks([...toDoTasks.slice(0, index), ...toDoTasks.slice(index+1)])
  }

  return (
    <Stack alignItems={'center'} gap={3}>
      <Stack justifyContent={'center'} flexDirection={'row'}>
        <Typography variant="h3">My Check List</Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={1}>
        
        <Stack width={300} height={500} sx={{overflow:'auto', border:'2px solid gray', borderRadius: 5}} >
          <Typography variant="h6" sx={{alignSelf: 'center', borderBottom: '2px solid gray', marginTop: 1}}>Incomplete</Typography>
          
          {toDoTasks.filter(task => !task.check).map(mapFunction)}
        </Stack>

        <Stack width={300} height={500} sx={{overflow:'auto', border:'2px solid gray', borderRadius: 5}} >
          <Typography variant="h6" sx={{alignSelf: 'center', borderBottom: '2px solid gray', marginTop: 1}}>Completed</Typography>
          {toDoTasks.filter(task => task.check).map(mapFunction)}
        </Stack>
      </Stack>
      <Stack justifyContent={'center'} flexDirection={'row'} gap={1}>
        <TextField width={200} size={'small'} onChange={updateCurText} value={curTextVal} label="Task Name" variant="outlined" />
        <Button variant="contained" onClick={createTask}>Create</Button>
      </Stack>
    </Stack>
  );
}

export default App;
