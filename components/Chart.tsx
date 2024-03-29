import React from "react";
import { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { PlainObject } from "@mongodb-js/charts-embed-dom/dist/declarations/src/types";

interface Props {
  chartId: string;
  width: number;
  height: number;
  filter: PlainObject;
}

const Chart = ({ chartId, width, height, filter }: Props) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-joshua-development-rdbgd",
  });
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
    })
  );
  useEffect(() => {
    if (chartDiv.current) {
      chart
        .render(chartDiv.current)
        .then(() => setRendered(true))
        .catch((err) => console.log("Error during Charts rendering.", err));
    }
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart
        .setFilter(filter)
        .catch((err) => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div className="chart" ref={chartDiv} />;
};

export default Chart;
