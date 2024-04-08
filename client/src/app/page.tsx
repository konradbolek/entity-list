
import AddOrEditEntity from "@/components/AddOrEditEntity";
import EntitiesList from "@/components/EntitiesList";

/**
 * Build page with Entites list
 */
export default async function Page() {
  return (
    <main className="container mx-auto my-10">
      <AddOrEditEntity title="Add new entity" containerClass="my-6" />
      <EntitiesList />
    </main>
  )
}