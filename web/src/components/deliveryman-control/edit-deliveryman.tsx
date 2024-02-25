import { PencilSimpleLine } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TextInput } from "../ui/text-input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDeliverymanById } from "../../services/api/deliveryman/get-deliveryman-by-id";
import { updateDeliveryman } from "../../services/api/deliveryman/update-deliveryman";
import { useEffect, useState } from "react";
import { Map } from "../map";

interface EditDeliverymanPropsType {
  id: string
}

export function EditDeliveryman({ id }: EditDeliverymanPropsType) {

  const [open, setOpen] = useState(false)

  const [documentNumber, setDocumentNumber] = useState('')
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const { data, status } = useQuery({
    queryKey: ['deliveryman', id],
    queryFn: () => getDeliverymanById({ id }),
  })

  const { mutateAsync: updateDeliverymanFn } = useMutation({
    mutationFn: updateDeliveryman,
    onSuccess : () => setOpen(false)
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
            <DialogTitle>Edit Deliveryman</DialogTitle>
            <DialogDescription>
              Please, fill the fields below. Click to add when you're done
            </DialogDescription>
            <div className="flex flex-col gap-4 mt-6 h-full">
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
              <Button onClick={() => { updateDeliverymanFn({ documentNumber, id, latitude, longitude, name }) }} variant="primary" text="Save" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}