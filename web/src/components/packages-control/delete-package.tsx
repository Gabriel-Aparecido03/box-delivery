import { TrashSimple } from "phosphor-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deletePackagesById } from "../../services/api/packages/delete-package";

interface DeletePackageParamsType {
  id : string
}

export function DeletePackage({ id }:DeletePackageParamsType) {

  const [open, setOpen] = useState(false)

  const { mutateAsync: deletePackagetFn } = useMutation({
    mutationFn: deletePackagesById,
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
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>
              This action will be deleted permanently this deliverman ! Are you sure ?
            </DialogDescription>
            <div className="flex w-full gap-6  items-center justify-center">
              <Button fullWidth onClick={() => setOpen(false)} text="No" variant="secondary" />
              <Button fullWidth onClick={() => { deletePackagetFn({ id }) }} text="Yes" variant="primary" />
            </div>
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}