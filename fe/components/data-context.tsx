"use client";

import { DataDtoWithState } from "@/types/state";
import React, { createContext, useReducer, useEffect } from "react";
import { State as ApiState } from "@/types/state";
import { DataDto } from "@/types/dto";

type State = {
  status: ApiState;
  data: DataDtoWithState[];
};

const initialState: State = {
  status: "loading",
  data: [],
};

type Action =
  | { type: "SET_API_STATE"; payload: ApiState }
  | { type: "SET_DATA"; payload: DataDtoWithState[] }
  | { type: "SET_ADDING"; payload: DataDto }
  | {
      type: "SET_STATUS";
      payload: { id: string; status: DataDtoWithState["status"] };
    }
  | { type: "UPDATE_ID"; payload: { oldId: string; newId: string } }
  | { type: "UPDATE"; payload: { id: string; data: string } }
  | { type: "REMOVE"; payload: string };

// Context
export const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Reducer
const dataReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_API_STATE":
      return { ...state, status: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_ADDING":
      return {
        ...state,
        data: [
          { ...action.payload, status: "adding" } as DataDtoWithState,
          ...state.data,
        ],
      };
    case "SET_STATUS":
      // find the item and update its status
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    case "UPDATE_ID":
      // find the item and update its status
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.oldId
            ? { ...item, id: action.payload.newId }
            : item
        ),
      };
    case "UPDATE":
      // find the item and update its status
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? ({
                ...item,
                data: action.payload.data,
                status: "idle",
              } as DataDtoWithState)
            : item
        ),
      };
    case "REMOVE":
      // find the item that is being deleted and remove it
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

type Props = {
  limit?: number;
  children: React.ReactNode;
};

export const DataProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://127.0.01:3000/data`);
        if (!result.ok) throw new Error("Error fetching data");
        const body = await result.json();
        dispatch({ type: "SET_API_STATE", payload: "success" });
        dispatch({
          type: "SET_DATA",
          payload: body.map((item: DataDto) => ({
            ...item,
            status: "idle",
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_API_STATE", payload: "error" });
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
