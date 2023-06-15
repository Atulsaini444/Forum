export const getDate = (date: string) => {
    return (new Date(date).toLocaleString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      ))
}