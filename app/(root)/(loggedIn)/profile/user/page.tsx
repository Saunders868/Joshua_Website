"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import UpdateUser from "@/components/Forms/UpdateUser";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";

const Page = () => {
    const user = useAppSelector((state) => state.user.user);
    const { response, error, loading } = useAxios({
        url: `${USERS_URL}/${user.id}`, token: {
            token: user.token,
            refreshToken: user.refreshToken
        }
    });

    if (loading) return <Loading />;

    if (error) return "A network error occured. Please try again later...";

    // console.log(response);
    
    const parts = response?.data.user.name.split(" ");
    const firstName = parts[0];
    const lastName = parts[1];

    return (
        <section>
            <DashboardPageHeader title="Update Profile" />
            <div className="admin__content single__admin__page">

                <UpdateUser 
                    profile
                    id={response?.data.user._id} 
                    username={response?.data.user.username} 
                    email={response?.data.user.email} 
                    firstName={firstName} 
                    lastName={lastName}
                    role={response?.data.user.role} 
                />
            </div>
        </section>
    )
}

export default Page