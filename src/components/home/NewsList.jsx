import React from "react";
import { Responsive } from "../elements/layout/Responsive";
import { NewsListWeb } from "../news-list/NewsListWeb";
import { NewsListMobile } from "../news-list/NewsListMobile";

export const NewsList = (props) => {
  return (
    <Responsive
      desktop={<NewsListWeb {...props} />}
      all={<NewsListMobile {...props} />}
    />
  );
};
