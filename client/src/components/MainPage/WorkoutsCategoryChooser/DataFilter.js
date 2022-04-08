import React, { useState } from "react";
import Search from "../Search/Search";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import moment from "moment";
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  GridRowsProp,
  GridColDef,
  GridValueSetterParams,
} from "@mui/x-data-grid";

const data = {
  rows: [],
  columns: [
    { field: "id", headerName: "id", width: 110 },
    { field: "title", headerName: "Title", width: 150, editable: true },
    {
      field: "Time",
      headerName: "Time",
      width: 110,
      editable: true,
      //   type: "dateTime",
      //   valueSetter: moment().format("kk:mm[ ]A"),
      //   valueGetter: ({ value }) => moment(value).format("kk:mm[ ]A"),
    },
    { field: "trainerName", headerName: "Trainer", width: 150, editable: true },
    { field: "category", headerName: "Category", width: 150, editable: true },
    {
      field: "groupSize",
      headerName: "Group size",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    { field: "duration", headerName: "Duration", width: 150, editable: true },
    { field: "actions", headerName: "Actions", width: 150, editable: true },
  ],
};

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function DataFilter({
  workoutsList,
  setWorkoutsList,
  search,
  setSearch,
}) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    groupSize: false,
    description: false,
    duration: false,
  });

  data.rows = workoutsList.map((workout) => {
    const workoutValue = {
      id: workout._id,
      title: workout.title,
      Time: workout.time,
      dayInWeek: workout.dayInWeek,
      dayInMonth: workout.dayInMonth,
      weekOfYear: workout.weekOfYear,
      category: workout.category,
      trainerName: workout.trainerName,
      groupSize: workout.groupSize,
      description: workout.description,
      duration: workout.duration,
      actions: "",
    };
    return workoutValue;
  });

  // console.log(data.rows[0].dayInWeek +", "+ data.rows[0].dayInMonth);

  function matchDayInWeek(day) {
    const rowArr = data.rows.filter((row) => {
      return (
        row.dayInWeek === day &&
        row.weekOfYear === String(Number(moment().format("w")) + 1)
      );
    });
    return rowArr;
  }
  return (
    <div style={{ height: 325, width: "100%" }}>
      {/* <Search currentSearch={search} onSearch={setSearch} /> */}
      {week.map((day) => {
        const matchDate = matchDayInWeek(day);

        return (
          <div
            style={{
              display: "flex",
              height: 325,
              width: "100%",
              marginBottom: 100,
            }}
            key={uuid()}
          >
            <div style={{ flexGrow: 1 }}>
              <div>
                <strong>
                  {day + ", " + matchDate[0].dayInMonth}
                  {": "}
                </strong>
              </div>
              <br />
              <DataGrid
                experimentalFeatures={{ newEditingApi: true }}
                editMode="row"
                checkboxSelection
                rowHeight={50}
                rows={matchDayInWeek(day)}
                columns={data.columns}
                columnVisibilityModel={JSON.parse(
                  localStorage.getItem("columnVisibilityModel")
                )}
                onColumnVisibilityModelChange={(newModel) => {
                  localStorage.setItem(
                    "columnVisibilityModel",
                    JSON.stringify(newModel)
                  );
                  setColumnVisibilityModel(newModel);
                }}
              />
            </div>
          </div>
        );
      })}
      {/* <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            editMode="row"
            checkboxSelection
            rowHeight={50}
            rows={data.rows} columns={data.columns}
            columnVisibilityModel={JSON.parse(
              localStorage.getItem("columnVisibilityModel")
            )}
            onColumnVisibilityModelChange={(newModel) => {
              localStorage.setItem(
                "columnVisibilityModel",
                JSON.stringify(newModel)
              );
              setColumnVisibilityModel(newModel);
            }}
          /> */}
    </div>
  );
}

// const data = {
//   rows: [
//     {
//       id: 1,
//       title: "Hello",
//       Time: moment().format("kk:mm[ ]A"),
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 2,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 3,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 4,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 5,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 6,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 7,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 8,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 9,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 10,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 11,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 12,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 13,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//     {
//       id: 14,
//       title: "Hello",
//       Time: "World",
//       category: "",
//       trainerName: "",
//       groupSize: "",
//       description: "",
//       duration: "",
//       actions: "",
//     },
//   ],
//   columns: [
//     { field: "id", headerName: "id", width: 110 },
//     { field: "title", headerName: "Title", width: 150, editable: true },
//     {
//       field: "Time",
//       headerName: "Time",
//       width: 150,
//       editable: true,
//       //   type: "dateTime",
//       //   valueSetter: moment().format("kk:mm[ ]A"),
//       //   valueGetter: ({ value }) => moment(value).format("kk:mm[ ]A"),
//     },
//     { field: "trainerName", headerName: "Trainer", width: 150, editable: true },
//     { field: "category", headerName: "Category", width: 150, editable: true },
//     {
//       field: "groupSize",
//       headerName: "Group size",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 150,
//       editable: true,
//     },
//     { field: "duration", headerName: "Duration", width: 150, editable: true },
//     { field: "actions", headerName: "Actions", width: 150, editable: true },
//   ],
//   rowLength: 5,
//   maxColumns: 6,
// };
