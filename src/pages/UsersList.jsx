import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import UserCard from '../components/UserCard';
import useSwr from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const UsersList = () => {
  const {
    data: response,
    error,
    isLoading
  } = useSwr('https://reqres.in/api/users', fetcher);

  if (error) {
    return (
      <div>
        <p>Error getting Data at this moment</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Center height={'100vh'} width={'100vw'}>
        <Spinner color="orange" size={'xl'} />
      </Center>
    );
  }

  return (
    <Grid
      alignItems={'center'}
      justifyContent={'center'}
      templateColumns={'repeat(4, 1fr)'}
    >
      {response.data.map(user => {
        return (
          <GridItem>
            <UserCard user={user} key={user.id} />{' '}
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default UsersList;
