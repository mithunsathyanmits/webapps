import React from "react";
import { MediaContextProvider, Media } from "../../../providers/MediaProvider";

export const Responsive = ({
  mobile,
  tablet = null,
  desktop = null,
  all = null,
}) => {
  if (all) {
    if (!tablet) {
      tablet = all;
    }
    if (!desktop) {
      desktop = all;
    }
    if (!mobile) {
      mobile = all;
    }
  }
  if (!all && !mobile && !tablet && !desktop) {
    throw new Error("Atleast one component should be defined");
  }
  return (
    <MediaContextProvider>
      <Media between={["xs", "md"]}>{mobile}</Media>
      <Media at="md">{tablet}</Media>
      <Media greaterThanOrEqual="lg">{desktop}</Media>
    </MediaContextProvider>
  );
};
