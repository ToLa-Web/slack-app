import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";

type ResponseType = string | null

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useGenerateUploadUrl = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null)

 /*  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSettled, setIsSettled] = useState(false); */

  const isPending = useMemo(() => status === "pending", [status])
  const isSuccess = useMemo(() => status === "success", [status])
  const isError = useMemo(() => status === "error", [status])
  const isSettled = useMemo(() => status === "settled", [status])

  const mutation = useMutation(api.upload.generateUploadUrl);
  const mutate = useCallback(
    async (_value: object, Options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending")

        const response = await mutation();
        Options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error")
        Options?.onError?.(error as Error);
        if (Options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled")
        Options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
