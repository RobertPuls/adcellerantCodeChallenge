// eslint-disable-next-line no-use-before-define
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

interface Props {
  label: string;
  labelId: string;
  selectId: string;
  defaultValue: string;
  value: string;
  menuItems: string[];
  // TODO: figure this out
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (event: React.ChangeEvent<{ value: any | string }>) => void;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    color: 'white',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    'margin-bottom': theme.spacing(1),
    color: 'white',
  },
  whiteText: {
    color: 'white !important',
  },
}));

const DropDown = ({
  label,
  labelId,
  selectId,
  defaultValue,
  value,
  menuItems,
  handleOnChange,
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.whiteText} id={labelId}>{label}</InputLabel>
      <Select
      // default value isn't working
        defaultValue={defaultValue}
        labelId={labelId}
        id={selectId}
        value={value}
        onChange={handleOnChange}
        className={classes.select}
      >
        {menuItems.map((menuItem) => (
          <MenuItem value={menuItem}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
