import DownArrow from "@/icons/DownArrow";
import RightArrow from "@/icons/RightArrow";
import React from "react";

const AccordionItem = ({
  question,
  hashtags,
  answer,
  id,
}: {
  question: string;
  hashtags: string[];
  answer: string;
  id: number;
}) => {
  const currentId: string = "question" + id;
  return (
    <div className="accordion-item" id={currentId}>
      <a className="accordion-link" href={`#${currentId}`}>
        <h3>{question}</h3>
        {hashtags.length > 0 ? (
          <ul>
            {hashtags.map((hashtag) => (
              <li key={hashtag}>#{hashtag}</li>
            ))}
          </ul>
        ) : null}
        <RightArrow classString="icon ion-md-arrow-forward" />
        <DownArrow classString="icon ion-md-arrow-down" />
      </a>
      <div className="answer">
        <p>{answer}</p>
      </div>
      <hr />
    </div>
  );
};

export default AccordionItem;
