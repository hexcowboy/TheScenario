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
import { IconPencil } from "@tabler/icons-react";
import { DataDto } from "@/types/dto";

type Props = {
  item: DataDto;
};

const DataUpdate = ({ item }: Props) => {
  const { dispatch } = useContext(DataContext);
  const [data, setData] = useState(item.data);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUpdate = useCallback(
    async (close: () => void) => {
      dispatch({
        type: "SET_STATUS",
        payload: { id: item.id, status: "updating" },
      });
      close();

      try {
        const result = await fetch(`http://127.0.01:3000/data/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        if (!result.ok) throw new Error("Error fetching data");
        dispatch({
          type: "UPDATE",
          payload: { id: item.id, data },
        });
      } catch (err) {
        console.error("DataCreate error:", err);
        dispatch({
          type: "SET_STATUS",
          payload: { id: item.id, status: "idle" },
        });
      }
    },
    [dispatch, item, data]
  );

  return (
    <>
      <Button onPress={onOpen} color="default" isIconOnly>
        <IconPencil size={20} className="text-primary" />
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
                <Button color="primary" onPress={() => handleUpdate(onClose)}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DataUpdate;
