/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import DropDown from './DropDown';
import sortByOptions from '../consts';

interface Props {
  selectedSource: string;
  selectedProduct: string;
  selectedStartDate: string;
  selectedEndDate: string;
  sources: string[];
  products: string[];
  sortBy: string;
  selectedView: string;
  setSelectedSource: (newSelectedSource: string) => void;
  setSelectedProduct: (newSelectedProduct: string) => void;
  setSelectedStartDate: (newSelectedStartDate: string) => void;
  setSelectedEndDate: (newSelectedEndDate: string) => void;
  setSortBy: (newSortBy: string) => void;
  setSelectedView: (newView: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(1),
  },
  textField: {
    color: 'white',
    margin: theme.spacing(1),
  },
  filterContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

const Header = ({
  selectedSource,
  selectedProduct,
  selectedStartDate,
  selectedEndDate,
  sources,
  products,
  sortBy,
  selectedView,
  setSelectedSource,
  setSelectedProduct,
  setSelectedStartDate,
  setSelectedEndDate,
  setSortBy,
  setSelectedView,
}: Props) => {
  const classes = useStyles();

  const handleSourceChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSelectedSource(event.target.value);
  };

  const handleProductChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSelectedProduct(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSelectedEndDate(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSortBy(event.target.value);
  };

  const handleViewChange = (event: React.ChangeEvent<{ value: string }>): void => {
    setSelectedView(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Product Performance
          </Typography>
          <div id="filterContainer" className={classes.filterContainer}>
            <div id="dropDownContainer">
              <DropDown
                defaultValue="Logs"
                handleOnChange={handleViewChange}
                label="View"
                labelId="select-view-label"
                menuItems={['Logs', 'Charts']}
                selectId="select-view"
                value={selectedView}
              />
              <DropDown
                defaultValue="Date"
                handleOnChange={handleSortByChange}
                label="Sort By"
                labelId="sort-by-label"
                menuItems={sortByOptions}
                selectId="sort-by"
                value={sortBy}
              />
              <DropDown
                defaultValue="All"
                handleOnChange={handleSourceChange}
                label="Source"
                labelId="select-source-label"
                menuItems={sources}
                selectId="select-source"
                value={selectedSource}
              />
              <DropDown
                defaultValue="All"
                handleOnChange={handleProductChange}
                label="Product"
                labelId="select-product-label"
                menuItems={products}
                selectId="select-product"
                value={selectedProduct}
              />
            </div>
            <div id="dateContainer">
              <TextField
                id="date"
                label="Start Date"
                type="date"
                value={selectedStartDate}
                className={classes.textField}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textField,
                }}
                InputProps={{
                  className: classes.textField,
                }}
              />
              <TextField
                id="date"
                label="End Date"
                type="date"
                value={selectedEndDate}
                className={classes.textField}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textField,
                }}
                InputProps={{
                  className: classes.textField,
                }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
