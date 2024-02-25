import { Plus } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchRecpients } from "../../services/api/recipients/fetch-recipients";
import { fetchDeliverymans } from "../../services/api/session/fetch-deliverymans";
import { useEffect, useState } from "react";
import { Select } from "../ui/select";
import { Map } from "../map";
import { registerPackage } from "../../services/api/packages/register-package";

export function AddNewPackage() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [deliverymanId, setDeliverymanId] = useState('')
  const [recipientId, setRecipientId] = useState('')
  const [open, setOpen] = useState(false)

  const { data: recipientsData , status : statusRecipient } = useQuery({
    queryKey: [`recipients-control`],
    queryFn: async () =>
      await fetchRecpients()
  })

  const { data: deliverymansData , status : statusDeliveryman } = useQuery({
    queryKey: [`deliverymans-control`],
    queryFn: async () =>
      await fetchDeliverymans()
  })

  const { mutateAsync: registerPackageFn } = useMutation({
    mutationFn: registerPackage,
    onSuccess: () => setOpen(false)
  })

  useEffect(() => {
    if (statusDeliveryman === "success" && statusRecipient === "success") {
      setDeliverymanId(deliverymansData[0].id ?? '')
      setRecipientId(recipientsData?.data[0].id ?? '')
    }
  }, [statusDeliveryman,statusRecipient])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full flex justify-end">
        <DialogTrigger>
          <Button variant="primary" text="Add new package " icon={<Plus />} />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Add Package</DialogTitle>
            <DialogDescription>
              Please, fill the fields below. Click to add when you're done
            </DialogDescription>
            <div>
              <div className="flex flex-col gap-2  items-stretch justify-start">
                <span className="text-sm">Recipient </span>
                <Select value={recipientId} onChange={e => setRecipientId(e.target.value)}>
                  {recipientsData?.data && recipientsData.data.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}
                </Select>
              </div>
              <div className="flex flex-col gap-2  items-stretch justify-start">
                <span className="text-sm">Deliveryman </span>
                <Select value={deliverymanId} onChange={e => setDeliverymanId(e.target.value)}>
                  {deliverymansData && deliverymansData.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}
                </Select>
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
              <Button onClick={() => { registerPackageFn({ deliverymanId, latitude, longitude, recipientId }) }} variant="primary" text="Save" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}