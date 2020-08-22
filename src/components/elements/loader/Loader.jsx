/** @jsx jsx */
import Loader from "react-loader-spinner";
import { colors } from "../../../theme/constants";
import { css, jsx } from "@emotion/core";

const loaderStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Spinner = () => (
  <div css={loaderStyles}>
    <Loader type="ThreeDots" color={colors.primary} height={100} width={100} />
  </div>
);
