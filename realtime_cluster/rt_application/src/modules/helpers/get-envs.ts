

export const getType = (): string => {
  if (process.env.APP_TYPE) {
    return process.env.APP_TYPE;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getMongoConnection = (): string => {
  if (process.env.MONGO) {
    return process.env.MONGO;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getRouterConnection = (): string => {
  if (process.env.ROUTER) {
    return process.env.ROUTER;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};


export const getPort = (): string => {
  if (process.env.PORT) {
    return process.env.PORT;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getPortInternal = (): string => {
  if (process.env.PORT_INTERNAL) {
    return process.env.PORT_INTERNAL;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getHOST = (): string => {
  if (process.env.HOST) {
    return process.env.HOST;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getRT_CONSTRAIN = (): number => {
  if (process.env.RT_CONSTRAIN) {
    return +process.env.RT_CONSTRAIN;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

export const getMESSAGE_AWAITER = (): number => {
  if (process.env.MESSAGE_AWAITER) {
    return +process.env.MESSAGE_AWAITER;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};


