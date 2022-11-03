import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Spinner size="lg" color="yellow.500" />
    </Center>
  );
}
