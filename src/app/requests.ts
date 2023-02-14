import { AsyncThunk } from "@reduxjs/toolkit";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { createSelector } from "reselect";

type APIRequestStatus = "pending" | "fulfilled" | "rejected";

export type APIRequestState = {
  status: APIRequestStatus;
  additionalData?: Record<string, unknown>;
};

const API_ACTION_MATCHER = new RegExp(/(.*)(pending|fulfilled|rejected)/);

type RequestState = ReturnType<typeof requestReducer>;

const selector = (state: RequestState) => state.request;

export const makeRequestSelector = (loadingKey: string) =>
  createSelector([selector], (request) => {
    return get(
      request,
      (loadingKey.match(API_ACTION_MATCHER) as RegExpMatchArray)[1]
    );
  });

export function requestReducer(
  state: Record<string, APIRequestState> = {},
  action: any
) {
  const { type } = action;

  const matches = API_ACTION_MATCHER.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, status] = matches;
  return {
    ...state,
    [requestName]: {
      status: status as APIRequestStatus,
      additionalData: action.payload?.additionalData,
    },
  };
}

export const useRequestState = (thunk: AsyncThunk<any, any, {}>) => {
  const request: APIRequestState | undefined = useSelector(
    makeRequestSelector(thunk.pending.type)
  );
  const [requestState, setRequestState] = useState<APIRequestState>();
  const [clearState, setClearState] = useState<boolean>(true);

  useEffect(() => {
    if (clearState && request?.status === "pending") {
      setClearState(false);
      setRequestState(request);
    } else if (clearState) {
      return;
    }
    setRequestState(request);
  }, [clearState, request]);

  const reset = useCallback(() => {
    setClearState(true);
    setRequestState(undefined);
  }, []);

  return useMemo(
    () => ({
      pending: requestState?.status === "pending",
      fulfilled: requestState?.status === "fulfilled",
      rejected: requestState?.status === "rejected",
      additionalData: requestState?.additionalData,
      reset,
    }),
    [requestState?.status, requestState?.additionalData, reset]
  );
};
