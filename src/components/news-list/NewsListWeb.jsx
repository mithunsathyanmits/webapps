/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";
import { Pagination } from "./pagination";
import { Button } from "../elements/buttons/Button";

const commonRowStyle = css`
  display: flex;
  align-items: center;
  & > div {
    padding: 0.1rem 0.5rem;
    min-width: 5rem;
    text-align: center;
    &:last-child {
      flex: 1;
      text-align: left;
    }
  }
`;

const tableHeaderRowStyle = css`
  ${commonRowStyle};
  background-color: ${colors.primary};
  color: ${colors.textWhite};
`;

const tableContainerStyle = css`
  background-color: ${colors.background};
  margin: 0.5rem 0;
`;

const tableRowStyle = css`
  ${commonRowStyle}
  &:nth-of-type(2n) {
    background-color: ${colors.alternateBackground};
  }
`;

const secondaryStyle = css`
  color: ${colors.textColorSecondary};
  font-size: 90%;
`;
const hideButtonStyle = css`
  &:hover {
    text-decoration: underline;
  }
`;

const newsDetailStyle = css`
  display: flex;
  flex-wrap: wrap;
  & > div {
    & > span {
      padding: 0 0.1rem;
    }
  }
  & > span {
    padding: 0 0.1rem;
  }
  a {
    text-decoration: none;
    color: ${colors.textColorSecondary};
    :hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
  }

  @media screen and (max-width: 1079px) {
    flex-direction: column;
  }
`;

export const NewsListWeb = ({
  items,
  hasNextPage,
  hasPreviousPage,
  currentPage,
  hide,
  upVote,
}) => {
  return (
    <div
      css={tableContainerStyle}
      role="table"
      aria-label="newslist"
      data-id="web"
    >
      <div role="rowgroup">
        <div role="row" css={tableHeaderRowStyle}>
          <div role="columnheader">Comments</div>
          <div role="columnheader">Votes</div>
          <div role="columnheader">Upvote</div>
          <div role="columnheader">News Details</div>
        </div>
      </div>
      <div role="rowgroup">
        {items.map((item) => {
          const url = item.url ? new URL(item.url) : null;
          return (
            <div role="row" css={tableRowStyle} key={item.objectID}>
              <div role="cell">{item.num_comments}</div>
              <div role="cell">{item.points}</div>
              <div role="cell">
                <Button
                  aria-label="upvote"
                  title="upVoteButton"
                  onClick={() => upVote(item.objectID)}
                >
                  ▲
                </Button>
              </div>
              <div role="cell" css={newsDetailStyle}>
                <div>
                  <span>{item.title}</span>
                  {url && (
                    <a href={item.url}>
                      <span css={secondaryStyle}>{`(${url.host})`}</span>
                    </a>
                  )}
                </div>
                <div>
                  <span css={secondaryStyle}>by</span>
                  <span>{item.author}</span>
                  <span css={secondaryStyle}></span>
                  <span>
                    [
                    <Button
                      aria-label="hide"
                      css={hideButtonStyle}
                      onClick={() => hide(item.objectID)}
                      title="hideButton"
                    >
                      Hide
                    </Button>
                    ]
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        currentPage={currentPage}
      />
    </div>
  );
};
