import { BACKEND, ROUTER, DEBUG } from "../components/consts/paths";

export const getRouterConnection = (): string => {
  if (ROUTER) {
    return ROUTER;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getBackendURL = (): string => {
  if (BACKEND) {
    return BACKEND;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getDEBUG = (): string => {
  if (DEBUG) {
    return DEBUG;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};