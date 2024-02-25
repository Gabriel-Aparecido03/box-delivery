import { PencilSimpleLine } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TextInput } from "../ui/text-input";
import { Map } from "../map";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateRecipient } from "../../services/api/recipients/update-recipient";
import { getRecipientById } from "../../services/api/recipients/get-by-recipient";

interface EditRecipientPropsType {
  id: string
}

export function EditRecipient({ id }: EditRecipientPropsType) {

  const [open, setOpen] = useState(false)

  const [documentNumber, setDocumentNumber] = useState('')
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const { data, status } = useQuery({
    queryKey: ['deliveryman', id],
    queryFn: () => getRecipientById({ id }),
  })

  const { mutateAsync: updateRecipientFn } = useMutation({
    mutationFn: updateRecipient,
    onSuccess: () => setOpen(false)
  })

  useEffect(() => {
    if (status === "success") {
      setDocumentNumber(data.data.documentNumber)
      setName(data.data.name)
      setLatitude(data.data.coordinates.latitude)
      setLongitude(data.data.coordinates.longitude)
    }
  }, [status])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex">
        <DialogTrigger>
          <Button variant="text" icon={<PencilSimpleLine />} />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Edit Recipient</DialogTitle>
            <DialogDescription>
              Please, fill the fields below. Click to add when you're done
            </DialogDescription>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 items-stretch justify-start">
                <span className="text-sm">Name</span>
                <TextInput value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 items-stretch justify-start">
                <span className="text-sm">Document number</span>
                <TextInput value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} />
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
              <Button onClick={() => { updateRecipientFn({ documentNumber, id, latitude, longitude, name }) }} variant="primary" text="Save" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}