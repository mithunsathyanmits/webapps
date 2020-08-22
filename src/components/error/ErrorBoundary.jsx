/** @jsx jsx */
import { Component } from "react";
import { Loader } from "../elements/loader/ErrorLoader";
import { css, jsx } from "@emotion/core";

const errorContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export class AppErrorboundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div css={errorContainer}>
          <h1>Something went wrong!!</h1>
          <Loader />
        </div>
      );
    }
    return this.props.children;
  }
}
