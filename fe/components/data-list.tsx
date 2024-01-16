"use client";

import { useContext } from "react";
import { DataContext } from "./data-context";
import { Card, CardBody } from "@nextui-org/react";
import { DataDtoWithState } from "@/types/state";
import DataDelete from "./data-delete";
import DataUpdate from "./data-edit";

const DataList = () => {
  const { state } = useContext(DataContext);

  switch (state.status) {
    case "loading":
      return <div>Loading...</div>;
    case "success":
      if (state.data.length === 0) return <div>No data</div>;
      return (
        <ul className="flex flex-col gap-4">
          {state.data.map((item) => (
            <DataCard key={item.id} item={item} />
          ))}
        </ul>
      );
    case "error":
      return <div>Error</div>;
  }
};

const DataCard = ({ item }: { item: DataDtoWithState }) => {
  return (
    <Card
      as="li"
      className={
        "px-4 min-h-12" +
        (["adding", "removing", "updating"].includes(item.status)
          ? " opacity-50"
          : "")
      }
    >
      <CardBody className="flex flex-row justify-between items-center">
        <span>{item.data}</span>
        <div className="flex flex-row gap-4">
          <DataUpdate item={item} />
          <DataDelete item={item} />
        </div>
      </CardBody>
    </Card>
  );
};

export default DataList;
