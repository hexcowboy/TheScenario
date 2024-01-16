"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Code,
} from "@nextui-org/react";
import { useCallback, useContext } from "react";
import { DataContext } from "./data-context";
import { IconTrash } from "@tabler/icons-react";
import { DataDto } from "@/types/dto";

type Props = {
  item: DataDto;
};

const DataDelete = ({ item }: Props) => {
  const { dispatch } = useContext(DataContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = useCallback(
    async (close: () => void) => {
      dispatch({
        type: "SET_STATUS",
        payload: { id: item.id, status: "removing" },
      });
      close();

      try {
        const result = await fetch("http://127.0.01:3000/data", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: item.id }),
        });
        if (!result.ok) throw new Error("Error fetching data");
        dispatch({
          type: "REMOVE",
          payload: item.id,
        });
      } catch (err) {
        console.error("DataCreate error:", err);
        dispatch({
          type: "SET_STATUS",
          payload: { id: item.id, status: "idle" },
        });
      }
    },
    [dispatch, item]
  );

  return (
    <>
      <Button onPress={onOpen} color="default" isIconOnly>
        <IconTrash size={20} className="text-danger" />
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
                Are you sure you want to delete this data?
                <Code size="md">{item.data}</Code>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={() => handleDelete(onClose)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DataDelete;
