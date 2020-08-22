/** @jsx jsx */
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
const listContainerStyle = css`
  font-size: 90%;
  margin-bottom: 1rem;
`;
const upVoteButtonStyle = css`
  margin: auto;
  padding: 10px;
`;
const listHeaderStyle = css`
  min-height: 3rem;
`;
const listbodyStyle = css`
  padding-top: 0.5rem;
  background-color: ${colors.background};
`;

const rowStyle = css`
  padding: 0.5rem 0;
  &:nth-of-type(2n) {
    background-color: ${colors.alternateBackground};
  }
`;

const rowStyles = css`
  display: flex;
  align-items: flex-start;
  > div {
    &:last-of-type {
      flex: 1;
    }
  }
`;

const secondaryStyle = css`
  font-size: 90%;
  color: ${colors.textColorSecondary};
  > * {
    padding: 0 0.1rem;
  }
`;

const hideButtonStyle = css`
  &:hover {
    text-decoration: underline;
  }
`;
const tableHeaderRowStyle = css`
  ${commonRowStyle};
  background-color: ${colors.primary};
  color: ${colors.textWhite};
`;

export const NewsListMobile = ({
  items,
  upVote,
  hide,
  hasNextPage,
  hasPreviousPage,
  currentPage,
}) => {
  return (
    <div
      css={listContainerStyle}
      role="table"
      aria-label="newslist"
      data-id="mobile"
    >
      <div>
        <div role="rowgroup">
          <div role="row" css={tableHeaderRowStyle}>
            <div role="columnheader">Upvote</div>
            <div role="columnheader">News Details | Comments | Votes</div>
          </div>
        </div>
      </div>
      <div css={listbodyStyle}>
        {items.map((news) => {
          return (
            <div css={rowStyle} key={news.objectID}>
              <div css={rowStyles}>
                <div css={upVoteButtonStyle}>
                  <Button
                    aria-label="upvote"
                    onClick={() => upVote(news.objectID)}
                  >
                    ▲
                  </Button>
                </div>
                <div>
                  <div>{news.title}</div>
                  <div css={secondaryStyle}>
                    <span>{`${news.num_comments} comments`}</span>
                  </div>
                  <div css={secondaryStyle}>
                    <span>{`${news.points} point(s) by ${news.author}`}</span>
                  </div>
                  <div>
                    [
                    <Button
                      aria-label="hide news"
                      css={hideButtonStyle}
                      onClick={() => hide(news.objectID)}
                    >
                      Hide
                    </Button>
                    ]
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
