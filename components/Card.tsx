import { FRONTEND_URL } from "@/constants";
import { ProductT } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Card = ({ product }: { product: ProductT }) => {
  return (
    <article>
      <Link href={`/product/${product.id}`} className="card__container">
        <div className="image">
          <Image
            src={
              product.image
                ? product.image
                : "https://images.unsplash.com/photo-1633783714421-332b7f929148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            }
            width={300}
            height={400}
            objectFit="cover"
            alt="product"
          />
        </div>
        <div className="card__container__overlay">
          <div className="item"></div>
          <div className="item head">
            <p>{product.title}</p>
            <hr />
          </div>
          <div className="item price">
            <p className="new">${product.price}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Card;
