import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { TextInput } from "../ui/text-input";

export function SearchPackage() {
  const [deliverymanName, setDeliverymanName] = useState('')
  const [recipientName, setRecipientName] = useState('')

  const [_, setSearchParams] = useSearchParams() 

  function handleApplyFilters() {
    setSearchParams(state => {
      if (recipientName) {
        state.set('recipientName', recipientName)
      } else {
        state.delete('recipientName')
      }
      return state
    })

    setSearchParams(state => {
      if (deliverymanName) {
        state.set('deliverymanName', deliverymanName)
      } else {
        state.delete('deliverymanName')
      }
      return state
    })
  }

  return (
    <div className="flex gap-12 items-center">
      <div className="flex items-center gap-6">
        <TextInput
          placeholder="Deliveryman Name"
          value={deliverymanName}
          onChange={e => setDeliverymanName(e.target.value)}
        />
        <TextInput
          placeholder="Recipient Name"
          value={recipientName}
          onChange={e => setRecipientName(e.target.value)}
        />
      </div>
      <div className="w-[100px]">
        <Button onClick={handleApplyFilters} fullWidth variant="secondary" size="md" text="Filter" icon={<MagnifyingGlass />} />
      </div>
    </div>
  )
}