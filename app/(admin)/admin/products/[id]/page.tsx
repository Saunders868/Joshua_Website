"use client";

import DashboardPageHeader from '@/components/DashboardPageHeader';
import Error from '@/components/Error';
import CreateProduct from '@/components/Forms/CreateProduct';
import Loading from '@/components/Loading';
import { PRODUCTS_URL } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { useAxios } from '@/utils/useAxios';
import { useParams } from 'next/navigation'

const Page = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const { response, error, loading } = useAxios({
    url: `${PRODUCTS_URL}/${id}`, token: {
      token: user.token,
      refreshToken: user.refreshToken
    }
  });

  if (error) return <Error />;

  if (loading) return <Loading />;

  return (
    <section>
      <DashboardPageHeader title="Update Product" />
      <div className="admin__content single__admin__page">

        <CreateProduct title={response?.data.title} desc={response?.data.desc} price={response?.data.price} method="patch" button="Update" endpoint={id as string} />
      </div>
    </section>
  );
};

export default Page;
