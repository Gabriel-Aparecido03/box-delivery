import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { SearchNearOfMe } from "./search-near-of-me";
import { TableRowPackagesNearOfMe } from "./table-row-near-of-me";
import { nearOfMePackages } from "../../services/api/deliveryman/near-of-me";
import { useSearchParams } from "react-router-dom";

export function TableOfNearOfMe() {

  const [searchParams] = useSearchParams()

  const recipientName = searchParams.get('recipientName')

  const { data } = useQuery({
    queryKey: [`near-of-me-packages`],
    queryFn: async () =>
      await nearOfMePackages()
  })

  const packages = data?.data

  const filteredByRecipientName = recipientName && packages ? packages.filter(i => i.recipient.name.toLowerCase().includes(recipientName.toLowerCase())) : packages ?? []


  return (
    <div className="mt-10">
      <SearchNearOfMe />
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deliveryman name</TableHead>
              <TableHead>Recipient name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredByRecipientName.length > 0 && filteredByRecipientName.map(item =>
              <TableRowPackagesNearOfMe
                createdAt={item.createdAt}
                id={item.id}
                updatedAt={item.updatedAt}
                deliverymanName={item.deliveryman.name}
                recipientName={item.recipient.name}
                key={item.id}
                status={item.status.name}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>

  )
}