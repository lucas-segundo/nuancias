import { WriterCardModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makeWriterLink } from 'presentation/routers/helpers'

export type UserCardProps = {
  userData: WriterCardModel.Model
}

export const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Link href={makeWriterLink(userData.username)}>
      <a className="flex">
        <figure className="flex mr-4">
          <Image
            className="rounded-full"
            src={userData.avatar.src}
            width={40}
            height={40}
            objectFit="cover"
            alt="Imagem do usuário principal"
          />
        </figure>
        <div className="flex flex-col">
          <span className="font-semibold">{userData.name}</span>
          <span className="text-xs text-gray-500">{userData.bio}</span>
        </div>
      </a>
    </Link>
  )
}
