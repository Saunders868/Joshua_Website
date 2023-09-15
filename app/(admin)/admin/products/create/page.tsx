import DashboardPageHeader from "@/components/DashboardPageHeader"
import CreateProduct from "@/components/Forms/CreateProduct"

const Page = () => {
  return (
    <section>
      <DashboardPageHeader title="Create Product" />

      <div className="admin__content">
        <CreateProduct />
      </div>
    </section>
  )
}

export default Page