import { TrashSimple } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { deleteRecipientById } from "../../services/api/recipients/delete-recipient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteRecipientPropsType {
  id: string
}

export function DeleteRecipient({ id }: DeleteRecipientPropsType) {
  const [open, setOpen] = useState(false)

  const { mutateAsync: deleteRecipientFn } = useMutation({
    mutationFn: deleteRecipientById,
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
            <DialogTitle>Delete Recipient</DialogTitle>
            <DialogDescription>
              This action will be deleted permanently this deliverman ! Are you sure ?
            </DialogDescription>
            <div className="flex w-full gap-6  items-center justify-center">
              <Button fullWidth onClick={() => setOpen(false)} text="No" variant="secondary" />
              <Button fullWidth onClick={() => { deleteRecipientFn({ id }) }} text="Yes" variant="primary" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}