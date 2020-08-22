/** @jsx jsx */
import { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { max } from "d3-array";
import { line as d3Line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";

const margin = 30;

const defaultColors = {
  guide: "#F3F1F1",
  domain: "#C5C5C5",
  line: "#FB6600",
};

const chartStyles = css`
  .tick {
    text {
      fill: ${colors.textColor};
    }
  }

  .y-axis {
    .tick {
      line {
        stroke: ${defaultColors.guide};
      }
      &:last-child {
        line {
          stroke: none;
        }
      }
      &:first-of-type {
        line {
          stroke: ${defaultColors.domain};
        }
      }
    }
    .domain {
      stroke: ${defaultColors.domain};
    }
  }
`;

const axisLabelStyle = css`
  font-weight: 500;
`;

const xLabelStyle = css`
  ${axisLabelStyle};
`;

const yLabelStyle = css`
  ${axisLabelStyle}
  transform: rotate(-90deg);
`;

const containerStyle = css`
  display: flex;
  align-items: center;
`;

const chartContainerStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LineChart = ({ data, xLabel = "x-axis", yLabel = "y-axis" }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const renderChart = () => {
      const {
        height: wHeight,
        width: wWidth,
      } = svgRef.current.getBoundingClientRect();
      const height = wHeight - 2 * margin;
      const width = wWidth - 2 * margin;
      const svg = select(svgRef.current);

      const eql = Math.ceil(width / data.length);
      const x = scaleOrdinal(data.map((_, index) => margin + 10 + index * eql)),
        y = scaleLinear().rangeRound([height, margin]);

      const line = d3Line()
        .x((d) => x(d.label))
        .y((d) => y(d.value));

      x.domain(
        data.map(function (d) {
          return d.label;
        })
      );

      y.domain([
        0,
        max(data, function (d) {
          return d.value;
        }),
      ]);

      const xAxis = axisBottom(x);
      const yAxis = axisLeft(y);

      const xAxisRender = svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      xAxisRender.selectAll(".tick line").attr("stroke", "transparent");
      xAxisRender
        .selectAll(".tick text")
        .attr("y", 0)
        .attr("x", -10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end");

      svg
        .select(".y-axis")
        .style("transform", `translateX(${margin}px)`)
        .call(yAxis.tickSize(-width));

      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", (value) => line(value))
        .attr("fill", "none")
        .attr("stroke", defaultColors.line);

      svg
        .selectAll(".data-circle")
        .data(data)
        .join("circle")
        .attr("r", 5)
        .attr("class", "data-circle")
        .attr("cx", (value) => x(value.label))
        .attr("cy", (value) => y(value.value))
        .attr("fill", defaultColors.line);
    };

    renderChart();

    window.addEventListener("resize", renderChart);
    return () => window.removeEventListener("resize", renderChart);
  }, [data]);

  return (
    <div css={containerStyle}>
      <div css={yLabelStyle}>{yLabel}</div>
      <div css={chartContainerStyle}>
        <svg ref={svgRef} width="100%" height={400} css={chartStyles}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <div css={xLabelStyle}>{xLabel}</div>
      </div>
    </div>
  );
};
