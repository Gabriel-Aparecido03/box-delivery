import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TextInput } from "../ui/text-input";
import { useMutation } from "@tanstack/react-query";
import { changeDeliverymanPassword } from "../../services/api/deliveryman/change-password";

interface ChangePasswordDeliverymanPropsType {
  id: string
}

export function ChangePasswordDeliveryman({ id }: ChangePasswordDeliverymanPropsType) {

  const [open, setOpen] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleValid() {
    if (password !== confirmPassword) return false
    if (password.length === 0 || confirmPassword.length === 0) return false
    return true
  }

  const { mutateAsync: changePasswordFn } = useMutation({
    mutationFn: changeDeliverymanPassword,
    onSuccess: () => setOpen(false)
  })


  async function execute() {
    if(!handleValid()) return
    changePasswordFn({ id , password})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex">
        <DialogTrigger>
          <Button variant="secondary" text="Change Password " />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Change Password Deliveryman</DialogTitle>
            <div className="flex flex-col gap-2  items-stretch justify-start">
              <span className="text-sm">Password</span>
              <TextInput value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2  items-stretch justify-start">
              <span className="text-sm">Confirm Password</span>
              <TextInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <Button onClick={execute} variant="primary" text="Save" />
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}