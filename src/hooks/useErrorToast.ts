import { useToast } from '@chakra-ui/react';

export const useErrorToast = () => {
  const toast = useToast({
    title: 'Ошибка',
    status: 'error',
    duration: 9000,
    position: 'top-right',
    isClosable: true,
  })

  return toast
}
