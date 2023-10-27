import { useState } from 'react';

export default function useManageModal(): [boolean, string, (id?: string) => void] {
  const [isManageModalActive, setIsManageModalActive] = useState(false);
  const [Id, setId] = useState("");

  const handleManageModal = (id?: string) => {
    setId(id || "");
    setIsManageModalActive(!isManageModalActive);
  };

  return [ isManageModalActive, Id, handleManageModal ];
}
