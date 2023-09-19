"use client";

import { USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { UserSessionT } from "@/types";
import { useAxios } from "@/utils/useAxios";
import React from "react";

const SessionsTable = ({ dataArray }: { dataArray: UserSessionT[] }) => {
  const userData = useAppSelector((state) => state.user);
  const { loading, response, error } = useAxios({
    url: USERS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  if (loading) return "Loading...";

  if (error) return "A network error occurred. Please try again later."

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>User Sessions</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>User Agent</th>
              <th>Valid</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((session) => (
              <tr key={session._id}>
                <td>
                  <div>
                    <p>
                      {}
                    </p>
                  </div>
                </td>
                <td>
                  <p>{session.userAgent}</p>
                  {/* <span className="status completed">Completed</span> */}
                </td>
                <td>
                  <p>
                    <span className={`${session.valid ? "completed" : "process"} status`}>
                      {session.valid}
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsTable;
