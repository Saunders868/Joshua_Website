"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { SESSIONS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { UserSessionT } from "@/types";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface AdminSessionT extends UserSessionT {
  user: any;
  timeDifference: string;
}

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const { loading, response, error } = useAxios({
    url: SESSIONS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  const sessionData: AdminSessionT[] = response?.data;

  function formatTimeDifference(timeDifference: number): string {
    var seconds = Math.floor((timeDifference / 1000) % 60);
    var minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    var formattedTime = "";
  
    if (days > 0) {
      formattedTime += days + " day" + (days > 1 ? 's' : '') + ', ';
    }
    
    if (hours > 0) {
      formattedTime += hours + " hour" + (hours > 1 ? 's' : '') + ', ';
    }
    
    if (minutes > 0) {
      formattedTime += minutes + " minute" + (minutes > 1 ? 's' : '') + ', ';
    }
    
    formattedTime += seconds + " second" + (seconds > 1 ? 's' : '');
  
    return formattedTime;
  }
  

  sessionData?.forEach(function(item) {
    const updatedAt: Date = new Date(item.updatedAt);
    const createdAt: Date = new Date(item.createdAt);
    var timeDifference: number =  updatedAt.getTime() - createdAt.getTime();
  
    // Format the time difference as a string (e.g., "X days, Y hours, Z minutes")
    var formattedTimeDifference = formatTimeDifference(timeDifference as number);
  
    // Add the formatted time difference as a new property
    item.timeDifference = formattedTimeDifference;
  });


  const columns: GridColDef[] = [
    {
      field: "userAgent",
      headerName: "Browser User",
      type: "string",
      minWidth: 150,
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      valueGetter: (sessionData) => sessionData.row.user.name,
      minWidth: 150,
      flex: 1
    },
    {
      field: "timeDifference",
      headerName: "Length",
      type: "string",
      minWidth: 150,
      flex: 1
    },
    {
      field: "valid",
      headerName: "Status",
      type: "boolean",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.value ? (
          <div>
            <p>
              <span className="status completed">
                Active
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <span className="status process">
                In-active
              </span>
            </p>
          </div>
        );
      },
    }
  ];

  return (
    <section>
      <DashboardPageHeader title="Sessions" />
      <p>view sessions</p>

      <div className="m-top">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error === null ? (
              <>
                {response && response.data.length === 0 ? (
                  <NoData text="Carts" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={sessionData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 20]}
                  />
                )}
              </>
            ) : (
              `A network error has occured. Please try again later`
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
