import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Button } from '../elements'

export const PrivacyPolicy = () => {
  const cookie = Cookies.get('privacy-policy')
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    setIsHidden(Boolean(cookie))
  }, [cookie])

  const handleClick = () => {
    Cookies.set('privacy-policy', 'agree', { expires: 365 })
    setIsHidden(true)
  }

  return (
    <div
      className={`grid grid-cols-3 p-4 border border-cyan-200 rounded  md:right-1/2 md:translate-x-1/2 mx-4 md:mx-0 bottom-2 bg-gray-50 ${
        isHidden ? 'hidden' : 'fixed'
      }`}
      aria-label="Política de Privacidade"
      aria-hidden={isHidden}
    >
      <div className="col-span-2 text-justify text-sm">
        <p>
          Usamos cookies em nosso site para fornecer a experiência mais
          relevante, lembrando suas preferências e visitas. Ao navegar pelo
          site, interpretamos que concorda com nossa{' '}
          <a
            className="underline"
            href="/pdfs/politica-privacidade.pdf"
            download
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Button
          text="OK"
          className="w-20"
          onClick={handleClick}
          aria-label="Botão Privacidade"
        />
      </div>
    </div>
  )
}
