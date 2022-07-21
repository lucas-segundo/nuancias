export const makePtBRDate = (date: string) => {
  const dateToFormat = new Date(date)

  return dateToFormat.toLocaleDateString('pt-BR')
}
