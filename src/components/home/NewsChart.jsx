/** @jsx jsx */
import { LineChart } from "./LineChart";
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";

const newsChartStyle = css`
  background-color: ${colors.background};
`;

export const NewsChart = ({ items }) => {
  const chartData = items.map((item) => {
    return {
      label: item.objectID,
      value: item.points,
    };
  });
  return (
    <div css={newsChartStyle}>
      <LineChart data={chartData} xLabel="ID" yLabel="Votes" />
    </div>
  );
};
