import Logger from "../config/Logger";

export interface IError extends Omit<Error, 'stack'> {
  code: number
}

export const BadRequest = (message: string): IError => {
  const error = new Error(message);
  error.name = "BadRequest";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 400,
  };
};

export const NotFound = (message: string = "Usuário não encontrado"): IError => {
  Logger?.error(JSON.stringify(message))
  const error = new Error(message);
  error.name = "NotFound";
  throw {
    message: error.message,
    name: error.name,
    code: 404,
  };
};

export const Unauthorized = (message: string = "Não autorizado"): IError => {
  const error = new Error(message);
  error.name = "Unauthorized";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 401,
  };
};

export const Forbidden = (message: string): IError => {
  const error = new Error(message);
  error.name = "Forbidden";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 403,
  };
};

export const Conflict = (message: string): IError => {
  const error = new Error(message);
  error.name = "Conflict";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 409,
  };
};

export const InternalServerError = (message: string = "Internal Server Error"): IError => {
  const error = new Error(message);
  error.name = "InternalServerError";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 500,
  };
};

export const ServiceUnavailable = (message: string = 'Serviço indisponível'): IError => {
  const error = new Error(message);
  error.name = "ServiceUnavailable"
  Logger.error(message);
  throw {
    message: error.message,
    name: error.name,
    code: 503,
  };
};

export const NotImplemented = (message: string): IError => {
  const error = new Error(message);
  error.name = "NotImplemented";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 501,
  };
};

export const BadGateway = (message: string): IError => {
  const error = new Error(message);
  error.name = "BadGateway";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 502,
  };
};

export const GatewayTimeout = (message: string): IError => {
  const error = new Error(message);
  error.name = "GatewayTimeout";
  Logger.error(message)
  throw {
    message: error.message,
    name: error.name,
    code: 504,
  };
};

export const CustomError = (
  message: string,
  name: string,
  code: number
): IError => {
  const error = new Error(message);
  error.name = name;
  Logger.error(message)
  throw { message: error.message, name: error.name, code };
}
