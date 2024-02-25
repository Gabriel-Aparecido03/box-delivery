import { useState } from "react"
import { Button } from "../ui/button"
import { Select } from "../ui/select"
import { useMutation } from "@tanstack/react-query"
import { makePackageAsDelivered } from "../../services/api/packages/make-package-as-delivered"
import { makePackageAsPickup } from "../../services/api/packages/make-package-as-pickup"
import { makePackageAsReturned } from "../../services/api/packages/make-package-as-returned"

interface ChangePackageStatus {
  id: string
  currentStatus: string
}


export function ChangePackageStatus({ currentStatus, id }: ChangePackageStatus) {

  const [newStatus, setNewStatus] = useState(currentStatus)

  const valuesOfStatus = ['delivered', 'returned', 'pick-up', 'waiting-for-delivery']

  const { mutateAsync: makePackageAsDeliveredFn } = useMutation({
    mutationFn: makePackageAsDelivered,
  })

  const { mutateAsync: makePackageAsPickUpFn } = useMutation({
    mutationFn: makePackageAsPickup,
  })

  const { mutateAsync: makePackageAsReturnedFn } = useMutation({
    mutationFn: makePackageAsReturned,
  })

  async function handleChangeStatus() {
    switch (newStatus) {
      case 'delivered':
        await makePackageAsDeliveredFn({ id })
        break;
      case 'returned':
        await makePackageAsReturnedFn({ id })
        break;
      case 'pick-up':
        await makePackageAsPickUpFn({ id })
        break;
    }
  }


  return (
    <div className="flex gap-6 items-center justify-center">
      <Select onChange={e => setNewStatus(e.target.value)} value={newStatus}>
        {valuesOfStatus.map(i => <option value={i} key={i} label={`${i.replaceAll('-', ' ')}`} />)}
      </Select>
      {newStatus !== 'waiting-for-delivery' && <Button onClick={handleChangeStatus} text="save" />}
    </div>
  )
}