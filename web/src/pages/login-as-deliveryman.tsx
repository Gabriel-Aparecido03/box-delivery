import { EyeClosed, Eye } from "phosphor-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { TextInput } from "../components/ui/text-input"
import { useAuth } from "../hook/use-auth"

export function LoginAsDeliveryman() {

  const navigate = useNavigate()
  const { makeLoginLikeDeliveryman } = useAuth()

  const [documentNumber, setDocumentNumber] = useState('')
  const [password, setPassword] = useState('')

  const [isInvalidDocumentNumber, setIsInvalidDocumentNumber] = useState(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false)

  async function handleMakeLogin() {
    try {
      await makeLoginLikeDeliveryman(documentNumber, password)
      navigate('/dashboard/deliveryman/my-packages') 
    } catch (error) {
      setIsInvalidPassword(true)
      setIsInvalidDocumentNumber(true)
      setErrorMessage('Invalid document number and/or password !')
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="w-1/3 mx-auto flex flex-col items-center justiyf-center">
        <h1 className="text-zinc-700 font-regular text-lg text-center ">Make your login like <strong>Deliveryman</strong> !<br /> And start navigate at <strong className="text-xl">Box.delivery</strong></h1>
        <div className="w-1/2 flex flex-col gap-3 mx-auto mt-6 max-w-[1200px] min-w-[300px]">
          <TextInput
            placeholder="Document number"
            onChange={e => setDocumentNumber(e.target.value)}
            value={documentNumber}
            isInvalid={isInvalidDocumentNumber}
          />
          <TextInput
            placeholder="Password"
            type={showPasswordVisibility ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            isInvalid={isInvalidPassword}
            icon={
              <>
                {!showPasswordVisibility && <EyeClosed className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordVisibility(true) }} />}
                {showPasswordVisibility && <Eye className="w-4 h-4 cursor-pointer" onClick={() => { setShowPasswordVisibility(false) }} />}
              </>
            }
          />
          <p className="text-red-400 font-thin text-sm">{errorMessage}</p>
          <Button text="Sign in" onClick={handleMakeLogin} />
        </div>
        <Link className="underline text-sm font-light text-zinc-700 text-center mt-5" to="/">Are you <strong>Admin</strong> ? Make login here</Link>
      </div>
    </div>
  )
}