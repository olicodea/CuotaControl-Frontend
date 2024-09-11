import { useMemo } from "react";

export const useGenerarArrayHasta = (numero) => {
  const array = useMemo(() => {
    const result = [];
    for (let i = 1; i <= numero; i++) {
      result.push(i);
    }
    return result;
  }, [numero]);

  return array;
};
