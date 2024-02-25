import { HTMLAttributes, forwardRef } from "react";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ ...props }, ref) => {
  return (
    <div className="relative w-full overflow-auto border border-solid border-zinc-300 rounded-lg p-2">
      <table
        ref={ref}
        className={'w-full caption-bottom text-sm'}
        {...props}
      />
    </div>
  )
})
Table.displayName = 'Table'

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className="[&_tr:last-child]:border-0"
      {...props}
    />
  )
})
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className="[&_tr:last-child]:border-0"
      {...props}
    />
  )
})
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(({ ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'}
      {...props}
    />
  )
})
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'}
      {...props}
    />
  )
})
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
})
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={`px-4 py-3.5 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
})
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(({ ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className="mt-4 text-sm text-muted-foreground"
      {...props}
    />
  )
})
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
}