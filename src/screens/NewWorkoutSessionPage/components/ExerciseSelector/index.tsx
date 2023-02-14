import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import ExerciseRenderer from "../../../../components/ExercisesRenderer";
import { RandomFade } from "../../../../components/RandomFade";
import { createActionableExerciseThunk } from "../../slice";

interface ExerciseSelectorProps {
  open: boolean;
  onClose: () => void;
  workoutId?: string;
  workoutSessionId?: string;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  open,
  onClose,
  workoutId,
  workoutSessionId,
}) => {
  const dispatch = useAppDispatch();

  const handleExerciseSelect = (exerciseId: string) => {
    if (!workoutSessionId || !workoutId) return;
    dispatch(
      createActionableExerciseThunk({
        body: {
          exerciseId,
          workoutId,
        },
      })
    );
    onClose();
  };

  return (
    <div>
      <Dialog open={open}>
        <>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Select exercise
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <ExerciseRenderer
              render={(exercise) => (
                <Grid item xs={6} key={exercise.name} marginY={2}>
                  <RandomFade>
                    <Card
                      onClick={() =>
                        handleExerciseSelect(exercise._id as string)
                      }
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {exercise.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </RandomFade>
                </Grid>
              )}
            />
          </DialogContent>
        </>
      </Dialog>
    </div>
  );
};
