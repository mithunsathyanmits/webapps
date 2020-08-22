/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const buttonStyle = css`
  background: none;
  padding: 0;
  border: 0;
  :hover {
    cursor: pointer;
  }
`;
export const Button = ({ children, ...props }) => {
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
};
