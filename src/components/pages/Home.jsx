import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { get, set } from "idb-keyval";
import { ListFetcher } from "../../api/request";
import { Dashboard } from "../home/Dashboard";
import { IndexedDBKeys } from "../../constants/storage";
import { URLS } from "../../api/constants";
import { Spinner } from "../elements/loader/Loader";

const filterNews = ({ votes, hidden }, data) => {
  if (!data) {
    return [];
  }
  const visibleData = data.hits.filter((news) => !hidden[news.objectID]);
  return visibleData.map((news) => {
    return {
      ...news,
      points: news.points + (votes[news.objectID] || 0),
    };
  });
};

export const Home = ({ match, staticContext }) => {
  const [state, setState] = useState({
    votes: {},
    hidden: {},
  });

  const [queueHide, setQueuHide] = useState([]);
  const [queueVote, setQueuVote] = useState({});

  const markHidden = (id) => {
    setState((state) => ({
      ...state,
      hidden: {
        ...state.hidden,
        [id]: true,
      },
    }));
    setQueuHide([...queueHide, id]);
  };

  const upVote = (id) => {
    setState((state) => ({
      ...state,
      votes: {
        ...state.votes,
        [id]: (state.votes[id] || 0) + 1,
      },
    }));
    setQueuVote((state) => ({
      ...state,
      [id]: (state[id] || 0) + 1,
    }));
  };

  const initialData = staticContext?.initialData ?? window.__initialData__;

  if (!staticContext?.initialData && window.__initialData__) {
    delete window.__initialData__;
  }

  const { data, error } = useSWR(
    `${URLS.searchByDate}${match.params.id ? `&page=${match.params.id}` : ""}`,
    ListFetcher,
    {
      revalidateOnFocus: false,
      initialData,
    }
  );

  if (error) {
    throw error;
  }

  useEffect(() => {
    const initializeLocalState = async () => {
      const [votes = {}, hidden = {}] = await Promise.all([
        get(IndexedDBKeys.votes),
        get(IndexedDBKeys.hidden),
      ]);
      setState({
        votes,
        hidden,
      });
    };
    initializeLocalState();
  }, []);

  useEffect(() => {
    if (Object.keys(queueVote).length > 0) {
      const timeOut = setTimeout(async () => {
        try {
          const votes = (await get(IndexedDBKeys.votes)) || {};
          if (Object.keys(queueVote).length > 0) {
            await set(IndexedDBKeys.votes, {
              ...votes,
              ...queueVote,
            });
          }
        } catch (error) {
          console.error("Failed local update");
        }
      }, 800);
      return () => clearTimeout(timeOut);
    }
  }, [queueVote]);

  useEffect(() => {
    if (queueHide.length > 0) {
      const timeOut = setTimeout(async () => {
        try {
          const hidden = (await get(IndexedDBKeys.hidden)) || {};

          if (queueHide.length > 0) {
            const newHidden = queueHide.reduce(
              (acc, value) => ({
                ...acc,
                [value]: true,
              }),
              {}
            );
            await set(IndexedDBKeys.hidden, {
              ...hidden,
              ...newHidden,
            });
          }
        } catch (error) {
          console.error("Local update failed");
        }
      }, 800);
      return () => clearTimeout(timeOut);
    }
  }, [queueHide]);

  const filteredData = filterNews(state, data);

  const pageInfo = data && {
    currentPage: data.page,
    pages: data?.nbPages,
    perPage: data?.hitsPerPage,
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <Dashboard
      items={filteredData}
      pageInfo={pageInfo}
      upVote={upVote}
      hide={markHidden}
    />
  );
};
