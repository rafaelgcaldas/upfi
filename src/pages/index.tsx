import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {

  const getImages = async ({ pageParam = 0}) => {
    const { data} = await api.get(`images?after=${pageParam}`);
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages, {
      getNextPageParam: (lastPage) => {
        console.log("lastPage: ", lastPage)
        if (lastPage.hasNextPage) {
          return lastPage.nextCursor;
        }

        return null;
      }
    });

  const formattedData = useMemo(() => {
    return data?.pages[0].data.map(page => {
      return {
        title: page.title,
        description: page.description,
        url: page.url,
        ts: page.ts,
        id: page.id,
      }
    })
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        { !hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? (
              <Text>Carregando...</Text>
              ) : (
              <Text>Carregar mais</Text>
            )}
          </Button>
        ) }
      </Box>
    </>
  );
}
