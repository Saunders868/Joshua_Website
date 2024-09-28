"use client";

import { useParams } from "next/navigation";
import book from "@/books.json";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;

  const totalPages = Math.ceil(book.recipes.length / itemsPerPage) + 3;

  const currentItems = book.recipes.slice(
    (currentPage - 4) * itemsPerPage,
    (currentPage - 3) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="book">
      {currentPage === 1 && (
        <div className="book__introduction">
          {/* <h2>Introduction</h2> */}
          <Image src={book.image} alt="book cover" priority fill />
        </div>
      )}

      {currentPage === 2 && (
        <div className="book__note">
          <h2>Author&apos;s Note</h2>
          <p>Written by {book.author}</p>
          <p>{book.content[0].content}</p>
        </div>
      )}

      {currentPage === 3 && (
        <div className="book__toc">
          <h2>Table of Contents</h2>
          <ul>
            {book.recipes.map((recipe, index) => (
              <li key={index}>
                <button onClick={() => goToPage(index + 4)}>
                  Recipe {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentPage > 3 &&
        currentItems.map((item, index) => (
          <div className="recipies" key={index}>
            <h2>{item.title}</h2>

            <div className="recipies__image">
              <Image
                src={item.images[0]}
                alt="recipe"
                height={250}
                width={200}
              />
            </div>

            <h3>Ingredients</h3>
            <ol>
              {item.ingredients.map((ingredients, idx) => (
                <li key={idx}>{ingredients}</li>
              ))}
            </ol>

            <h3>Instructions</h3>
            <ol>
              {item.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>
        ))}

      {/* Pagination controls */}
      <div className="book__pagination">
        <button
          className="btn"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="white"
              d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
            />
          </svg>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="white"
              d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.02 17.01"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Page;
