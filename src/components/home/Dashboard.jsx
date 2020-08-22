/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NewsList } from "./NewsList";
import { NewsChart } from "./NewsChart";
import { useMedia } from "react-use";

const dashboardStyle = css`
  max-width: 1280px;
  margin: 0 auto;
  background-color: #ff6600;
  @media screen and (max-width: 1279px) {
    margin: 0 1rem;
  }
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;

export const Dashboard = ({ items, pageInfo, upVote, hide }) => {
  const isWideEnough = useMedia("(min-width:768px)");

  if (items.length === 0 || !pageInfo) {
    return null;
  }
  return (
    <div css={dashboardStyle}>
      <NewsList
        items={items}
        hasNextPage={pageInfo.pages - 1 !== pageInfo.currentPage}
        hasPreviousPage={pageInfo.currentPage !== 0}
        currentPage={pageInfo.currentPage}
        hide={hide}
        upVote={upVote}
      />
      {isWideEnough && <NewsChart items={items} />}
    </div>
  );
};
