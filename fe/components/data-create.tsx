"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useCallback, useContext, useState } from "react";
import { DataContext } from "./data-context";
import { DataDto } from "@/types/dto";

const DataCreate = () => {
  const { dispatch } = useContext(DataContext);
  const [data, setData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCreate = useCallback(
    async (close: () => void) => {
      const tempId = Math.random().toString(36);
      dispatch({ type: "SET_ADDING", payload: { data, id: tempId } });
      close();

      try {
        const result = await fetch("http://127.0.01:3000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (!result.ok) throw new Error("Error fetching data");
        const body: DataDto = await result.json();
        dispatch({
          type: "UPDATE_ID",
          payload: { oldId: tempId, newId: body.id },
        });
        dispatch({
          type: "SET_STATUS",
          payload: { id: body.id, status: "idle" },
        });
        setData("");
      } catch (err) {
        console.error("DataCreate error:", err);
        dispatch({
          type: "REMOVE",
          payload: tempId,
        });
      }
    },
    [data, dispatch]
  );

  return (
    <>
      <Button onPress={onOpen} color="default">
        Create Data
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        suppressHydrationWarning
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Data
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="Data"
                  placeholder="Enter your data"
                  variant="bordered"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleCreate(onClose)}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DataCreate;
