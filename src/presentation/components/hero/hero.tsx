import Image from 'next/image'

export const Hero = () => {
  return (
    <section>
      <div className="relative h-72 md:h-96">
        <figure className="absolute -z-10 w-full h-full">
          <div className="relative h-full">
            <Image
              src={'/images/hot-air-balloon.jpg'}
              layout="fill"
              objectFit="cover"
              priority={true}
              alt="Balão de Gás sobre o mar."
            />
          </div>
        </figure>
        <div className="absolute bg-black opacity-20 w-full h-full z-0"></div>
        <div className="absolute z-10 flex items-center h-full w-full">
          <h1 className="text-gray-100 text-4xl lg:text-5xl font-bold default-screen-margin">
            Histórias para entender as intensidades do mundo.
          </h1>
        </div>
      </div>
    </section>
  )
}
