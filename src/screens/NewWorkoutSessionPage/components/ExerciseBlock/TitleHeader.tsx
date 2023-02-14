import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IExercise } from "../../types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import { UnitsOfMass } from "../../../../types/shared";
import { capitalizeFirst, generateRandomId } from "../../../../utils/helpers";

interface TitleHeaderProps {
  exercise: IExercise;
  number: number;
  unitOfMass: UnitsOfMass;
  handleUpdateUnits: (units: UnitsOfMass) => void;
  handleDeleteSet: () => void;
}

const options = [
  {
    name: "Change to KG",
    code: "change-kg",
    icon: CheckIcon,
    iconColor: "success",
  },
  true,
  {
    name: "Change to LBS",
    code: "change-lbs",
    icon: CheckIcon,
    iconColor: "success",
  },
  true,
  {
    name: "Remove",
    code: "remove",
    icon: DeleteForeverIcon,
    iconColor: "error",
  },
  true,
  {
    name: "Remove Set",
    code: "remove-set",
    icon: DeleteForeverIcon,
    iconColor: "error",
  },
];

const ITEM_HEIGHT = 48;

const TitleHeader: React.FC<TitleHeaderProps> = ({
  exercise,
  number,
  unitOfMass,
  handleUpdateUnits,
  handleDeleteSet,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (code: string) => {
    switch (code) {
      case "change-kg":
        handleUpdateUnits(UnitsOfMass.KILOGRAMS);
        break;

      case "change-lbs":
        handleUpdateUnits(UnitsOfMass.POUNDS);
        break;

      case "remove":
        console.log("remove");
        break;

      case "remove-set":
        handleDeleteSet();
        break;

      default:
        break;
    }
    handleClose();
  };

  const renderOptionIcon = (option: any) => {
    if (
      (option.code === "change-kg" && unitOfMass !== UnitsOfMass.KILOGRAMS) ||
      (option.code === "change-lbs" && unitOfMass !== UnitsOfMass.POUNDS)
    ) {
      return null;
    }

    return <option.icon color={option.iconColor} />;
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Box>
          <Typography variant={"h6"}>
            {`${number + 1}. ${exercise.name}`}
          </Typography>
        </Box>
        <Box>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                // maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => {
              if (typeof option === "boolean") {
                return (
                  <Divider style={{ margin: 0 }} key={generateRandomId()} />
                );
              }
              return (
                <MenuItem
                  key={option.code}
                  onClick={() => handleOptionSelect(option.code)}
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                  <Typography variant="inherit" marginRight={"7px"}>
                    {option.name}
                  </Typography>
                  <ListItemIcon>{renderOptionIcon(option)}</ListItemIcon>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Box>
      <Typography variant="subtitle2" marginBottom={"10px"}>
        {`${capitalizeFirst(exercise.muscle)} - ${capitalizeFirst(
          exercise.intensity
        )}`}
      </Typography>
    </>
  );
};

export default React.memo(TitleHeader);
