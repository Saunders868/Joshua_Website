import { PRODUCTS_URL } from "@/constants";
import { axiosCall } from "@/utils/Axios";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const id = params.id;

  const product = await axiosCall({
    method: "get",
    url: `${PRODUCTS_URL}/${id}`,
    payload: null,
  });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={product.data.image} alt={product.data.title} />
      </div>
    ),
    {
      ...size,
    }
  );
}
