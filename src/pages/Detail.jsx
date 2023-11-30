import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams,useNavigate } from 'react-router-dom';
import {
  Checkbox, CheckboxGroup, Input, Text, Box, HStack, Container, Button, Heading, Stack, FormControl,
  FormLabel,
  FormHelperText, Spinner
} from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const Detail = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false)
  const [check, setCheck]=useState()
  const [value, setValue] = useState('')
  const { id } = useParams()
  const [flag, setFlag] = useState(false)
  const navigate=useNavigate()


  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/v1/task/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      if (jsonData) {
          setLoader(true)       
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  
  const handleChange = (e) => setValue(e.target.value)

  useEffect(() => {
    fetchData()
  }, [id])


  useEffect(() => {
    if (data) {
      setValue(data.item.name)
      setCheck(data.item.completed)
    }
  },[data])

  const handleSubmit = async () => {
    try {
      const result = await fetch(`http://localhost:3005/api/v1/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value,
          completed: check,
        }),
      });
      if (result?.status === 200) {
        setFlag(!flag)
        setValue("")
        navigate("/")
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleCheckboxChange = () => {
   setCheck((prevCheck) => !prevCheck);
  };

   return (
    <Stack spacing={5}>
       <Heading p="5px" fontSize="4xl" fontWeight={900}>Update Task</Heading>
       {loader ?
         <Container>
           <FormControl border="1px solid teal" p={"10px"} borderRadius={4} mb={5}>
             <FormLabel fontWeight={800}>Task</FormLabel>
             <Input onClick={() => setValue("")} value={value} type='email' onChange={(e) => { handleChange(e) }} />
             <HStack pt="5px">
               <Text>Completed:</Text>
               <Checkbox colorScheme='red' isChecked={!check} onChange={() => handleCheckboxChange(!check)}>
                 No
               </Checkbox>
               <Checkbox colorScheme='green' isChecked={check} onChange={() => handleCheckboxChange(!check)}>
                 Yes
               </Checkbox>
             </HStack>
             <FormHelperText>
               <Button onClick={() => { handleSubmit() }} colorScheme='teal'>Update</Button>
             </FormHelperText>
           </FormControl>
         </Container> :
         <Container>
       <CircularProgress isIndeterminate color='green.600' size='50px' thickness='8px'/>
         </Container>
           }
    </Stack>
  )
}

export default Detail