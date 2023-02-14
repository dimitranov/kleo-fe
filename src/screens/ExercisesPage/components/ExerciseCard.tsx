import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { IExercise } from "../types";

interface ExerciseCardProps {
  exercise: IExercise;
}

export default function ExerciseCart({ exercise }: ExerciseCardProps) {
  return (
    <Card>
      {/* <CardMedia
        component="img"
        height="140"
        src={`http://localhost:23000/img/tours/${exercise.images[0]}`}
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {exercise.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {exercise.muscle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {exercise.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {exercise.intensity}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
