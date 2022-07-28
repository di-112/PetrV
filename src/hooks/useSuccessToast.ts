import { useToast } from '@chakra-ui/react';

export const useSuccessToast = () => {
  const toast = useToast({
    title: 'Успешно',
    status: 'success',
    duration: 9000,
    position: 'top-right',
    isClosable: true,
  })

  return toast
}
