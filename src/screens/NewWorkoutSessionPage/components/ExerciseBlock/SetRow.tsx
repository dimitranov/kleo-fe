import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { deepOrange, green, grey } from "@mui/material/colors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useLongPress from "../../../../hooks/useLongPress";
import { UnitsOfMass } from "../../../../types/shared";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SetStatus, SimpleSet } from "../../types";

interface SetRowProps {
  set: SimpleSet;
  index: number;
  exerciseId: string;
  previousSet: SimpleSet;
  handleSaveSet: (index: number, set: Partial<SimpleSet>) => void;
  handleDelete: (index: number) => void;
  unitsOfMass: UnitsOfMass;
  deleteMode: boolean;
}

const SetRow: React.FC<SetRowProps> = ({
  set,
  index,
  exerciseId,
  previousSet,
  unitsOfMass,
  handleSaveSet,
  handleDelete,
  deleteMode,
}) => {
  const [currentWeight, setCurrentWeight] = useState(set.weight || "");
  const [currentReps, setCurrentReps] = useState(set.reps || "");
  const [willDelete, setWillDelete] = useState(false);

  const isSaved = set._id || set.status === SetStatus.SAVED;
  const isDirty = !set._id || set.status === SetStatus.IN_PROGRESS;

  const handleBlur = (key: string, value: string | number) => () => {
    handleSaveSet(index, {
      [key]: Number(value),
      status: SetStatus.IN_PROGRESS,
    });
  };

  const handleDeleteSet = () => {
    setWillDelete(true);
    setTimeout(() => {
      handleDelete(index);
    }, 500);
  };

  const handleWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setCurrentWeight(value);
    },
    []
  );

  const handleRepsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentReps(e.target.value);
    },
    []
  );

  const getSaveColor = () => {
    if (!currentReps) return deepOrange[400];
    if (isSaved) return green[300];
    if (isDirty) return grey[500];
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
        backgroundColor: deleteMode ? "#ffe6e6" : "white",
        color: "white",
      }}
      className={willDelete ? "set-row-remove" : "set-row"}
    >
      <TableCell component="th" scope="row" padding="normal">
        <Typography fontWeight="600">{index + 1}</Typography>
      </TableCell>
      <TableCell align="center" style={{ width: "30%" }} padding="none">
        -
      </TableCell>
      <TableCell
        align="center"
        sx={{ position: "relative", padding: "4px 10px" }}
        padding="normal"
      >
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ position: "absolute", right: "-3px", bottom: 0 }}
        >
          {unitsOfMass}
        </Typography>
        <input
          type="number"
          onBlur={handleBlur("weight", currentWeight)}
          value={currentWeight}
          onChange={handleWeightChange}
          className="small-text-input"
          disabled={deleteMode}
          style={
            deleteMode
              ? {
                  backgroundColor: "#ffe6e6",
                }
              : {}
          }
        />
      </TableCell>
      <TableCell
        align="center"
        padding="normal"
        sx={{ position: "relative", padding: "4px 10px" }}
      >
        <input
          type="number"
          onBlur={handleBlur("reps", currentReps)}
          value={currentReps}
          onMouseDown={(e: any) => console.log(e)}
          onChange={handleRepsChange}
          disabled={deleteMode}
          className="small-text-input"
          style={
            deleteMode
              ? {
                  backgroundColor: "#ffe6e6",
                }
              : {}
          }
        />
      </TableCell>
      <TableCell align="center" padding="checkbox">
        {deleteMode ? (
          <IconButton
            aria-label="delete"
            color="error"
            onClick={handleDeleteSet}
          >
            <DeleteForeverIcon />
          </IconButton>
        ) : (
          <Checkbox
            defaultChecked
            disabled
            disableRipple
            disableTouchRipple
            checkedIcon={
              <CheckCircleIcon
                sx={{ color: getSaveColor(), transition: "200ms" }}
              />
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(SetRow);
