import { useQuery } from "@tanstack/react-query";
import { fetchAllPackages } from "../../services/api/packages/fetch-all-packages";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { SearchPackage } from "./search-packages";
import { TableRowPackages } from "./table-row-packages";
import { useSearchParams } from "react-router-dom";

export function TableOfPackages() {

  const [searchParams] = useSearchParams()

  const deliverymanName = searchParams.get('deliverymanName')
  const recipientName = searchParams.get('recipientName')

  const { data } = useQuery({
    queryKey: [`packages-control`],
    queryFn: async () =>
      await fetchAllPackages()
  })

  const packages = data?.data

  const filteredByDeliverymanName = deliverymanName && packages ? packages.filter(i => i.deliveryman.name.toLowerCase().includes(deliverymanName.toLowerCase())) : packages ?? []

  const filteredByRecipientName = recipientName && packages ? filteredByDeliverymanName.filter(i => i.recipient.name.toLowerCase().includes(recipientName.toLowerCase())) : filteredByDeliverymanName ?? []

  return (
    <>
      <SearchPackage />
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient Name</TableHead>
              <TableHead>Deliveryman Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredByRecipientName.length > 0 && filteredByRecipientName.map(item =>
              <TableRowPackages
                createdAt={item.createdAt}
                id={item.id}
                updatedAt={item.updatedAt}
                deliverymanName={item.deliveryman.name}
                recipientName={item.recipient.name}
                key={item.id}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </>

  )
}