import DashboardPageHeader from "@/components/DashboardPageHeader";
import Link from "next/link";

const Page = () => {
  return (
    <section>
      <DashboardPageHeader title="Products" />

      <p>create product, update product, delete product, update product</p>

      <div className="admin__content">
        <Link href={"/admin/products/create"}>Create</Link>
      </div>
    </section>
  );
};

export default Page;
