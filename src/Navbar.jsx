import React from 'react'
import { Flex, Spacer, Heading, Box, ButtonGroup, Button } from '@chakra-ui/react'
const Navbar = () => {
  return (
    <div>
      <Flex minWidth='max-content' alignItems='center' gap='2' bg="orange" p="10px">
  <Box p='2'>
    <Heading size='md'>Chakra UI</Heading>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
    <Button colorScheme='teal'>Welcome</Button>
    {/* <Button colorScheme='teal'>Log in</Button> */}
  </ButtonGroup>
</Flex></div>
  )
}

export default Navbar