import { WriterCardModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makeWriterLink } from 'presentation/routers/helpers'

export type WriterCardProps = {
  writer: WriterCardModel.Model
}

export const WriterCard = ({ writer }: WriterCardProps) => {
  return (
    <Link href={makeWriterLink(writer.username)}>
      <a className="flex">
        <figure className="flex mr-4">
          <Image
            className="rounded-full"
            src={writer.avatar.src}
            width={40}
            height={40}
            objectFit="cover"
            alt="Imagem do usuário principal"
          />
        </figure>
        <div className="flex flex-col">
          <span className="font-semibold">{writer.name}</span>
          <span className="text-xs text-gray-500">{writer.bio}</span>
        </div>
      </a>
    </Link>
  )
}
