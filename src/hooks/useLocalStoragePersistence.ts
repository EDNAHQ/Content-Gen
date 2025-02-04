import { useState, useEffect } from "react";
import { PostRow } from "@/types";

const STORAGE_KEY = 'imagePostsData';

export function useLocalStoragePersistence() {
  const loadInitialData = (): PostRow[] => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.some((row: PostRow) => row.generatedPost)) {
        return parsedData;
      }
    }
    return [
      { id: '1', isLoading: false, contentType: 'image' },
      { id: '2', isLoading: false, contentType: 'image' },
      { id: '3', isLoading: false, contentType: 'image' },
      { id: '4', isLoading: false, contentType: 'image' },
      { id: '5', isLoading: false, contentType: 'image' },
    ];
  };

  const [postRows, setPostRows] = useState<PostRow[]>(loadInitialData);

  useEffect(() => {
    if (postRows.some(row => row.generatedPost)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(postRows));
    }
  }, [postRows]);

  return { postRows, setPostRows };
}