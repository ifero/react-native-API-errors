jest.mock('../hooks/useGetJokes', () => ({
  useGetJokes: () => ({
    data: undefined,
    error: { code: 400 },
    mutate: jest.fn,
  }),
}));

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 42,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0 }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({ params: { slug: '/' } }),
}));
