import { Fade } from "@mui/material";
import React from "react";

interface RandomFadeProps {
  children: React.ReactElement<any, any>;
}

function getRandomNumberBetween(min: number, max: number): number {
  // Ensure that both min and max are 3-digit numbers
  const min3Digit = 100;
  const max3Digit = 999;
  min = Math.max(min, min3Digit);
  max = Math.min(max, max3Digit);

  // Generate a random number between min and max
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const RandomFade: React.FC<RandomFadeProps> = ({ children }) => (
  <Fade in timeout={getRandomNumberBetween(100, 700)}>
    {children}
  </Fade>
);
