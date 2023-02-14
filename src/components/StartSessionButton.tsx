import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface StartSessionButtonProps {
  onClick?: () => void;
  asLink?: boolean;
  to?: string;
  title: string;
}

export const StartSessionButton: React.FC<StartSessionButtonProps> = ({
  onClick,
  asLink,
  to,
  title,
}) => {
  if (asLink && to) {
    return (
      <Button variant="contained" size="large" component={Link} to={to}>
        {title}
      </Button>
    );
  }

  return (
    <Button variant="contained" size="large" onClick={onClick}>
      {title}
    </Button>
  );
};
