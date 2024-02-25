import { TrashSimple } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { deleteDeliverymanById } from "../../services/api/deliveryman/delete-deliveryman";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteDeliverymanPropsType {
  id: string
}

export function DeleteDeliveryman({ id }: DeleteDeliverymanPropsType) {

  const [open, setOpen] = useState(false)

  const { mutateAsync: deleteDeliverymanFn } = useMutation({
    mutationFn: deleteDeliverymanById,
    onSuccess: () => setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex">
        <DialogTrigger>
          <Button variant="text" icon={<TrashSimple />} />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Delete Deliveryman</DialogTitle>
            <DialogDescription>
              This action will be deleted permanently this deliverman ! Are you sure ?
            </DialogDescription>
            <div className="flex gap-8 w-1/2 items-center justify-center mx-auto ">
              <Button fullWidth onClick={() => setOpen(false)} text="No" variant="secondary" />
              <Button fullWidth onClick={() => deleteDeliverymanFn({ id })} text="Yes" variant="primary" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}