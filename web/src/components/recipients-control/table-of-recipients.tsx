import { useQuery } from "@tanstack/react-query";
import { fetchRecpients } from "../../services/api/recipients/fetch-recipients";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { SearchRecipient } from "./search-recipients";
import { RecipientTableRow } from "./table-row-recipient";
import { useSearchParams } from "react-router-dom";
export function TableOfRecipients() {

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name')
  const documentNumber = searchParams.get('documentNumber')

  const { data } = useQuery({
    queryKey: [`recipients-control`],
    queryFn: async () =>
      await fetchRecpients()
  })

  const recipients = data?.data

  const filteredByName = name && recipients ? recipients.filter(i => i.name.toLowerCase().includes(name.toLowerCase())) : recipients ?? []
  const filteredByDocumentNumber = documentNumber && recipients ? filteredByName.filter(i => i.documentNumber.toLowerCase().includes(documentNumber.toLowerCase())) : filteredByName ?? []

  return (
    <>
      <SearchRecipient />
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredByDocumentNumber.length > 0 && filteredByDocumentNumber.map(item =>
              <RecipientTableRow
                createdAt={item.createdAt}
                documentNumber={item.documentNumber}
                id={item.id}
                name={item.name}
                updatedAt={item.updatedAt}
                key={item.id}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </>

  )
}