import { Table, TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { SearchDeliveryman } from "./search-deliveryman";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliverymans } from "../../services/api/session/fetch-deliverymans";
import { DeliverymanTableRow } from "./deliveryman-table-row";
import { useSearchParams } from "react-router-dom";

export function TableOfDeliverymans() {

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name')
  const documentNumber = searchParams.get('documentNumber')

  const { data } = useQuery({
    queryKey: [`deliverymans-control`],
    queryFn: async () =>
      await fetchDeliverymans() 
  })

  const deliverymans = data?.data

  const filteredByName = name && deliverymans ? deliverymans.filter(i => i.name.toLowerCase().includes(name.toLowerCase())) : deliverymans ?? []
  const filteredByDocumentNumber = documentNumber && deliverymans ? filteredByName.filter(i => i.documentNumber.toLowerCase().includes(documentNumber.toLowerCase())) : filteredByName ?? []

  return (
    <>
      <SearchDeliveryman />
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead className="text-center">Actions</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredByDocumentNumber.length > 0 && filteredByDocumentNumber.map(item =>
              <DeliverymanTableRow
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