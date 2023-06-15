import { UseToastOptions } from "@chakra-ui/react"

export const getToast = (title: string, status:string)=>{
    return {
        title: title,
        status: status,
        position: "top-right",
        duration: 4000,
        isClosable: true,
      } as UseToastOptions
}