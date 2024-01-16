import { DataDto } from "./dto";

export type State = "loading" | "error" | "success";

export type DataDtoWithState = DataDto & {
  status: "adding" | "removing" | "updating" | "idle";
};
