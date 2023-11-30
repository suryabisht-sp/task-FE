/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Input, Text, Box, Container, Button, Heading } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { IconButton, Stack, Checkbox } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Task = () => {
  const [data, setData] = useState();
  const [value, setValue] = React.useState('')
  const [flag, setFlag] = useState(false)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const colors = ['tomato', 'orange', 'cyan', 'purple', 'teal']; // Add more colors as needed


  const handleChange = (e) => setValue(e.target.value)
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/v1/task/");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      if (jsonData) {
        setLoader(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await fetch("http://localhost:3005/api/v1/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value,
          completed: false,
        }),
      });
      if (result?.status === 200) {
        setFlag(!flag)
        setValue("")
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleEdit = (id) => {
    navigate(`/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      const result = await fetch(`http://localhost:3005/api/v1/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result?.status === 200) {
        setFlag(!flag)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [flag])


  return (
    <Stack >
      <Heading p="5px" fontSize="4xl" fontWeight={900}>Task</Heading>
      <Container>
        <FormControl border="1px solid teal" p={"10px"} borderRadius={4} mb={5}>
          <FormLabel fontWeight={800}>Add Task</FormLabel>
          <Input type='email' onChange={(e) => { handleChange(e) }} value={value} />
          <FormHelperText>
            <Button onClick={() => { handleSubmit() }} colorScheme='teal'>Submit</Button>
          </FormHelperText>
        </FormControl>
      </Container>
      {loader ? <Container><Spinner/></Container> :
        <Container>
          {console.log("data", data)}
          {data?.item.length < 1 && <Box bgGradient="linear(to-r, #ff9966, #ff5e62)"
            borderRadius="5px"> <Text color="#fff" fontWeight="700" fontSize="xl" p={5}>Hurray! No Task Pending</Text></Box>}
          {data && data?.item?.map((items, index) => {
            const colorIndex = index % colors.length; // Get the color index in a circular manner
            const bgColor = colors[colorIndex];
            return (<Box key={index} display="flex" justifyContent="center" >
              <SimpleGrid width="100%" >
                <Box bg={bgColor} height="150px"
                  padding="10px"
                  borderRadius={4}
                  margin="5px">
                  <IconButton
                    color={items.completed === true ? "green" : "red"} _hover={{ cursor: "default" }}
                    aria-label='Search database' boxSize={10} border={items.completed === true ? "1px solid green" : "1px solid red"} borderRadius=
                    "50%"
                    icon={items.completed === true ? <CheckIcon w={6} h={6} /> : <CloseIcon w={6} h={6} />} />
                  <Text>Name: {items.name}</Text>
                  <Text fontWeight={items.completed === true ? "800" : ""} color={items.completed === true ? "green" : ""}>Completed: {items.completed === true ? "true" : "false"}</Text>
                  <IconButton
                    colorScheme='teal' _hover={{ background: "#fff", color: "green" }}
                    mr={5}
                    aria-label='Search database'
                    icon={<EditIcon />}
                    onClick={() => { handleEdit(items._id) }}
                  />
                  <IconButton onClick={() => { handleDelete(items?._id) }}
                    colorScheme='teal' _hover={{ background: "#fff", color: "red" }}
                    aria-label='Search database'
                    icon={<DeleteIcon />}
                  />
                </Box>
              </SimpleGrid>
            </Box>)
          })}
        </Container>}
    </Stack>
  )
}

export default Task