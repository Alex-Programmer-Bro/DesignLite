import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    const sourceTitle = document.title;
    document.title = title;
    return () => {
      document.title = sourceTitle;
    }
  }, [])
};
