import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { TextInput } from "../ui/text-input";

export function SearchRecipient() {
  const [documentNumber, setDocumentNumber] = useState('')
  const [name, setName] = useState('')

  const [ _, setSearchParams ] = useSearchParams()

  function handleApplyFilters() {
    setSearchParams(state => {
      if(name) {
        state.set('name',name)
      } else {
        state.delete('name')
      }
      return state
    })

    setSearchParams(state => {
      if(documentNumber) {
        state.set('documentNumber',documentNumber)
      } else {
        state.delete('documentNumber')
      }
      return state
    })
  }

  return (
    <div className="flex gap-12 items-center">
      <div className="flex items-center gap-6">
        <TextInput
          placeholder="Document number"
          value={documentNumber}
          onChange={e => setDocumentNumber(e.target.value)}
        />
        <TextInput 
          placeholder="Name" 
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="w-[100px]">
        <Button onClick={handleApplyFilters} fullWidth variant="secondary" size="md" text="Filter" icon={<MagnifyingGlass />} />
      </div>
    </div>
  )
}