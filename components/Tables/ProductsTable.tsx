import { ProductT } from "@/types";
import Image from "next/image";
import React from "react";

const ProductsTable = ({ dataArray }: { dataArray: ProductT[] }) => {
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Products</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((product) => (
              <tr key={product.id}>
                <td>
                  <div>
                    <Image fill src={product.image!} alt="product" />
                  </div>
                </td>
                <td>
                  <p>{product.title}</p>
                </td>
                <td>
                  <p>{`${product.desc.substring(0, 10)}...`}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
