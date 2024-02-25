import { Plus } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { TextInput } from "../ui/text-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addDeliveryman } from "../../services/api/deliveryman/add-deliveryman";
import { Map } from "../map";

export function AddNewDeliveryman() {

  const [open, setOpen] = useState(false)

  const [documentNumber, setDocumentNumber] = useState('')
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleValid() {
    if (name.length === 0) return false
    if (documentNumber.length === 0) return false
    if (password !== confirmPassword) return false
    if (password.length === 0 || confirmPassword.length === 0) return false
    return true
  }

  const { mutateAsync: addDeliverymanFn } = useMutation({
    mutationFn: addDeliveryman,
    onSuccess: () => setOpen(false)
  })

  async function execute() {
    if (!handleValid()) return
    addDeliverymanFn({ documentNumber, latitude, longitude, name, password })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full flex justify-end">
        <DialogTrigger>
          <Button variant="primary" text="Add new deliveryman " icon={<Plus />} />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Add Deliveryman</DialogTitle>
            <DialogDescription>
              Please, fill the fields below. Click to add when you're done
            </DialogDescription>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 items-stretch justify-start">
                <span className="text-sm">Name</span>
                <TextInput value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 items-stretch justify-start">
                <span className="text-sm">Document number</span>
                <TextInput value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2  items-stretch justify-start">
                <span className="text-sm">Password</span>
                <TextInput value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2  items-stretch justify-start">
                <span className="text-sm">Confirm Password</span>
                <TextInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 items-stretch justify-start">
                <span className="text-sm">Localization</span>
                <Map
                  coordinates={[latitude, longitude]}
                  onMarkerChange={({ lat, lng }) => {
                    setLatitude(lat)
                    setLongitude(lng)
                  }}
                />
              </div>
            </div>
            <div className="w-1/2">
              <Button fullWidth onClick={execute} text="Save" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}