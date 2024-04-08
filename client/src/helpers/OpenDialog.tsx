import AddOrEditEntity from "@/components/AddOrEditEntity";

/**
 * Function for button in entity row in table
 */
export const OpenButton = ({ data }: { data: { id: number } }) => {
  return (
    <AddOrEditEntity title="Edit entity" id={data.id} />
  )
}
