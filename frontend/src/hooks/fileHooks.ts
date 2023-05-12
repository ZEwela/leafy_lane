import apiClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";

export const useUploadFileMutation = () =>
  useMutation({
    mutationFn: async (file: any) =>
      (
        await apiClient.post<{ message: string }>("/api/files/upload", file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data,
  });
