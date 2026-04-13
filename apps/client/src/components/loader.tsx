import React from "react";
import { PropagateLoader } from "react-spinners";

interface LoaderProps {
  size: number;
}

const AstraLoader = ({ size }: LoaderProps) => {
  return <PropagateLoader color="#7c3aed" size={size} speedMultiplier={1.2} />;
};

export default AstraLoader;
