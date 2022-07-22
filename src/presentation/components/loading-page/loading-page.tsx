import Image from 'next/image'

export type LoadingPageProps = {
  //isLoading: boolean
}

export const LoadingPage = () => {
  return (
    <section className="flex flex-col space-y-2 justify-center items-center h-screen bg-gray-100">
      <Image
        src={'/loading-spinner.svg'}
        width={50}
        height={50}
        alt="Circulo rodando"
      />
      <span className="text-2xl font-bold">Carregando...</span>
    </section>
  )
}
