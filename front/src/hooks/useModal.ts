import { useState } from 'react';

interface ModalState<T = any> {
  current: boolean;
  value?: T;
}

export const useModal = <T = any>(initialOpen: boolean = false) => {
  const [open, setOpen] = useState<ModalState<T>>({
    current: initialOpen,
    value: undefined,
  });

  const onOpen = (value?: T) =>
    setOpen({
      current: true,
      value,
    });

  const onClose = () => setOpen({ current: false });

  return { isOpen: open.current, value: open.value, onOpen, onClose };
};
