import React, { useEffect, useState } from "react";
import Grow from "@mui/material/Grow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "tss-react/mui";
import { isString } from "lodash";

interface TableSearchProps {
  searchText: string | { value: string };
  onSearch: (text: string) => void;
  onHide: () => void;
  debouncedTime?: number;
  options: any;
}

const useStyles = makeStyles({ name: "MUIDataTableSearch" })((theme) => ({
  main: {
    display: "flex",
    flex: "1 0 auto",
    alignItems: "center",
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginRight: "8px",
  },
  searchText: {
    flex: "0.8 0",
  },
  clearIcon: {
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));

const DebouncedTableSearch: React.FC<TableSearchProps> = ({
  options,
  searchText,
  onSearch,
  onHide,
  debouncedTime = 300,
}) => {
  const { classes } = useStyles();
  const [state, setState] = useState({ text: searchText });

  let textValue: string;
  if (searchText && (searchText as any).value !== undefined)
    textValue = (searchText as any).value;
  else textValue = searchText as string;

  const handleTextChange = (event) => {
    setState({
      text: event.target.value,
    });
  };

  useEffect(() => {
    if (!state.text) return;
    onSearch(isString(state.text) ? state.text : state.text.value);
  }, [state]);

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      onHide();
    }
  };

  const clearIconVisibility = options.searchAlwaysOpen ? "hidden" : "visible";

  return (
    <Grow appear in timeout={300}>
      <div className={classes.main}>
        <SearchIcon className={classes.searchIcon} />
        <TextField
          className={classes.searchText}
          autoFocus
          variant="standard"
          inputProps={{
            "data-test-id": options.textLabels.toolbar.search,
            "aria-label": options.textLabels.toolbar.search,
          }}
          value={textValue || ""}
          onKeyDown={onKeyDown}
          onChange={handleTextChange}
          fullWidth
          placeholder={options.searchPlaceholder}
          {...(options.searchProps ? options.searchProps : {})}
        />
        <IconButton
          className={classes.clearIcon}
          style={{ visibility: clearIconVisibility }}
          onClick={onHide}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </Grow>
  );
};

export default DebouncedTableSearch;
