import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Divider,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { useRequestState } from "../../../../app/requests";
import { generateRandomId } from "../../../../utils/helpers";
import { updateActionableExerciseThunk } from "../../slice";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  IActionableExercise,
  SetIntensity,
  SetStatus,
  SetType,
  SimpleSet,
} from "../../types";
import SetRow from "./SetRow";
import TitleHeader from "./TitleHeader";
import { UnitsOfMass } from "../../../../types/shared";

interface IExerciseBlockProps {
  exercise: IActionableExercise;
  exerciseIndex: number;
}

const EMPTY_SET: SimpleSet = {
  weight: 0,
  reps: 0,
  type: SetType.REGULAR,
  intensity: SetIntensity.MEDIUM,
  status: SetStatus.IN_PROGRESS,
};

const ExerciseBlock: React.FC<IExerciseBlockProps> = ({
  exercise,
  exerciseIndex,
}) => {
  const dispatch = useAppDispatch();

  const setInitialSets = () => {
    if (exercise.sets.length === 0) {
      return [EMPTY_SET];
    }
    return exercise.sets;
  };

  const [sets, setSets] = useState<SimpleSet[]>(setInitialSets());
  const [setsAreDirty, setSetsAreDirty] = useState<boolean>(false);
  const [errorWhileSave, setErrorWhileSave] = useState<boolean>(false);
  const [unitsOfMass, setUnitsOfMass] = useState<UnitsOfMass>(exercise.units);
  const [deleteSetMode, setDeleteSetMode] = useState<boolean>(false);

  const updateRequest = useRequestState(updateActionableExerciseThunk);

  useEffect(() => {
    if (updateRequest.fulfilled) {
      setSetsAreDirty(false);
      setSets((curr) => curr.map((c) => ({ ...c, status: SetStatus.SAVED })));
    }

    if (updateRequest.rejected) {
      setErrorWhileSave(true);
    }
  }, [updateRequest]);

  const handleClearAlert = () => {
    setErrorWhileSave(false);
  };

  const handleDelete = (index: number) => {
    setSetsAreDirty(true);
    setSets((curr) => {
      const temp = [...curr];
      temp.splice(index, 1);
      return temp;
    });
  };

  const handleAddNewEmptySet = () => {
    setSetsAreDirty(true);
    setSets((curr) => curr.concat([EMPTY_SET]));
  };

  const handleExerciseSave = () => {
    dispatch(
      updateActionableExerciseThunk({
        body: {
          sets: sets.filter((set) => set.reps !== 0),
        },
        actionableExerciseId: exercise._id as string,
      })
    );
  };

  const handleUpdateUnits = useCallback(
    (units: UnitsOfMass) => {
      setUnitsOfMass(units);
      dispatch(
        updateActionableExerciseThunk({
          body: {
            units,
          },
          actionableExerciseId: exercise._id as string,
        })
      );
    },
    [exercise._id]
  );

  const handleCopyPrevSet = () => {
    setSetsAreDirty(true);
    setSets((curr) => {
      const newCopiedSet = { ...curr[curr.length - 1] };
      delete newCopiedSet._id;
      newCopiedSet.status = SetStatus.IN_PROGRESS;
      return curr.concat([newCopiedSet]);
    });
  };

  const handleSaveSet = (index: number, set: Partial<SimpleSet>) => {
    setSetsAreDirty(true);
    setSets((curr) => {
      const temp = [...curr];
      temp[index] = {
        ...temp[index],
        ...set,
      };
      return temp;
    });
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <TitleHeader
          exercise={exercise.exercise}
          number={exerciseIndex}
          unitOfMass={unitsOfMass}
          handleUpdateUnits={handleUpdateUnits}
          handleDeleteSet={() => setDeleteSetMode(true)}
        />
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Prev</TableCell>
                <TableCell align="center">Weight</TableCell>
                <TableCell align="center">Reps</TableCell>
                <TableCell align="center">Saved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sets.map((set: SimpleSet, index: number) => (
                <SetRow
                  set={set}
                  key={generateRandomId()}
                  index={index}
                  previousSet={set}
                  exerciseId={exercise._id as string}
                  unitsOfMass={unitsOfMass}
                  deleteMode={deleteSetMode}
                  handleSaveSet={handleSaveSet}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-around" marginY="10px">
          {deleteSetMode ? (
            <Button variant="text" onClick={() => setDeleteSetMode(false)}>
              FINISH
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={handleAddNewEmptySet}>
                Add set
              </Button>
              <Button variant="text" onClick={handleCopyPrevSet}>
                Copy set
              </Button>
            </>
          )}
        </Box>
        {errorWhileSave && (
          <Alert severity="error" onClose={handleClearAlert}>
            <AlertTitle>Was not able to save</AlertTitle>
            System was not able to save your set changes —{" "}
            <strong>Please try again shortly!</strong>
          </Alert>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          marginY="20px"
          paddingRight="50px"
        >
          <LoadingButton
            onClick={handleExerciseSave}
            // loading={!saveCompleted}
            loading={updateRequest.pending}
            loadingPosition="start"
            disabled={!setsAreDirty}
            startIcon={<SaveIcon />}
            variant="outlined"
            className={setsAreDirty ? "shake-element-every-7s" : ""}
          >
            Save
          </LoadingButton>
        </Box>
        <Divider />
      </Box>
    </Fade>
  );
};

export default React.memo(ExerciseBlock);
