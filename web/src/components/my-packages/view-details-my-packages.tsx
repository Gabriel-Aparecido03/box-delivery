import { Map } from "../map";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TextInput } from "../ui/text-input";

export function ViewMyPackages() {
  return (
    <Dialog>
      <div className="w-full flex">
        <DialogTrigger>
          <Button fullWidth variant="secondary" text="View" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>View NearOfMe</DialogTitle>
            <DialogDescription>
              Please, fill the fields below. Click to add when you're done
            </DialogDescription>
            <div className="flex flex-col gap-2  items-stretch justify-start">
              <span className="text-sm">Name</span>
              <TextInput />
            </div>
            <div className="flex flex-col gap-2  items-stretch justify-start">
              <span className="text-sm">Document number</span>
              <TextInput />
            </div>
            <div className="flex flex-col gap-2  items-stretch justify-start">
              <span className="text-sm">Password</span>
              <TextInput />
            </div>
            <Map />
          </DialogContent>
        </DialogPortal>
      </div>
    </Dialog>
  )
}