import useSWR from 'swr';

export const useGetJokes = (slug?: string) => useSWR(slug ?? '/random');
