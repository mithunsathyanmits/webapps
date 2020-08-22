import React from "react";
import { colors } from "../../../theme/constants";
import { css } from "@emotion/core";
import { Button } from "../buttons/Button";

const buttonStyle = css`
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  padding: 0.5rem 1rem;
  border-radius: 3px;
`;

export const Loader = () => (
  <div>
    <Button
      aria-label="reload page"
      css={buttonStyle}
      onClick={() => window.location.reload()}
    >
      Reload Page
    </Button>
  </div>
);
