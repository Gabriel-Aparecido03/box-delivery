import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { MyPackages } from "../../services/api/packages/my-packages";
import { SearchMyPackages } from "./search-my-packages";
import { TableRowMyPackages } from "./table-row-my-packages";
import { useSearchParams } from "react-router-dom";

export function TableOfMyPackages() {

  const [searchParams] = useSearchParams()

  const recipientName = searchParams.get('recipientName')

  const { data } = useQuery({
    queryKey: [`my-packages`],
    queryFn: async () =>
      await MyPackages()
  })

  const packages = data?.data

  const filteredByRecipientName = recipientName && packages ? packages.filter(i => i.recipient.name.toLowerCase().includes(recipientName.toLowerCase())) : packages ?? []

  return (
    <div className="mt-10">
      <SearchMyPackages />
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
              <TableRowMyPackages
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