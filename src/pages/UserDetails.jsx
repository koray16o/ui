import { useNavigate, useParams } from 'react-router-dom';
import useSwr from 'swr';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Spinner
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const UserDetails = () => {
  const { id } = useParams();
  const {
    data: response,
    error,
    isLoading
  } = useSwr(`https://reqres.in/api/users/${id}`, fetcher);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isLoading && !error) {
      setName(response.data.first_name);
      setEmail(response.data.email);
    }
  }, [response]);

  const navigate = useNavigate();

  const handleUpdate = e => {
    e.preventDefault();
    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
      .then(() => navigate('/users'))
      .catch(console.error);
  };

  if (error) {
    return (
      <div>
        <p>Error fetching User</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Center height={'100vh'} width={'100vw'}>
        <Spinner size={'xl'} color={'orange'} />
      </Center>
    );
  }

  return (
    <form onSubmit={handleUpdate}>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={'white'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={response.data.avatar}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>

          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500'
              }}
              onClick={() => navigate('/users')}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500'
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default UserDetails;
