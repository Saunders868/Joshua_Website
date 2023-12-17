"use client";

import { CloudinaryInfoT } from "@/types";
import { CldUploadWidget } from "next-cloudinary";
import React, { SetStateAction } from "react";

const CloudinaryWidget = ({
  resource,
  setResource,
}: {
  resource?: object;
  setResource: React.Dispatch<SetStateAction<{ info?: CloudinaryInfoT }>>;
}) => {
  return (
    <CldUploadWidget
      options={{ sources: ["local", "url"] }}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        console.log("result", result);
        setResource({
          info: result?.info as CloudinaryInfoT,
        });
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource({ info: {} as CloudinaryInfoT });
          console.log("unsuccessful resource: ", resource);
          open();
        }
        return (
          <div className="action">
            <button
              type="button"
              className="action-button"
              onClick={handleOnClick}
            >
              Upload an Image
            </button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default CloudinaryWidget;
