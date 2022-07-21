import { UserModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makeUserLink } from 'presentation/routers/helpers'

export type UserCardProps = {
  userData: Pick<UserModel, 'username' | 'name' | 'bio' | 'avatar'>
}

const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Link href={makeUserLink(userData.username)}>
      <a className="flex cursor-pointer">
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

export default UserCard
