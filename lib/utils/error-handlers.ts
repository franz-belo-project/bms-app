import axios from 'axios';
import { z } from 'zod';

// const NO_TYPE_PROVIDED = "Type of error wasn't provided!";

export const apiErrorSchema = z.object({
  message: z.string(),
  status_code: z.number(),
});

export type APIError = z.infer<typeof apiErrorSchema>;

export const apiErrorEntity = z.object({
  message: z.string(),
  errors: z.object({
    password: z.array(z.object({})),
  }),
});

export type APIErrorEntity = z.infer<typeof apiErrorEntity>;

export function isAPIError(err: unknown): err is APIError {
  const { success } = apiErrorSchema.safeParse(err);
  return success;
}

export function isAPIErrorEntity(err: unknown): err is APIErrorEntity {
  const { success } = apiErrorEntity.safeParse(err);
  return success;
}

type ErrorVars<T = unknown> =
  | {
      type: 'APIError';
      error: APIError;
    }
  | {
      type: 'APIErrorEntity';
      error: APIErrorEntity;
    }
  | {
      type: 'UnexpectedError';
      error: T;
    }
  | {
      type: 'UnknownError';
      error?: T;
    };

export class AppError<T> extends Error {
  public variables: ErrorVars<T> | { type: null; error: null } = {
    type: null,
    error: null,
  };
  constructor({ type, error }: ErrorVars<T>) {
    super();

    this.variables.type = type;
    this.variables.error = error;

    switch (type) {
      case 'APIError':
        this.message = error.message;
        break;
      case 'APIErrorEntity':
        this.message = error.errors.password[0] as string;
        break;
      case 'UnexpectedError':
        this.message = "This error shouldn't happen and was unhandled";
        break;
      case 'UnknownError':
        this.message = 'An unknown error occurred!';
        break;
    }
  }
}

export function handleErrors(err: unknown) {
  const isAxiosError = axios.isAxiosError(err);

  if (isAxiosError && isAPIError(err.response?.data)) {
    return new AppError<unknown>({
      type: 'APIError',
      // error: err.response.data,
      error: err.response.data,
    });
  }

  if (isAxiosError && isAPIErrorEntity(err.response?.data)) {
    return new AppError<unknown>({
      type: 'APIErrorEntity',
      // error: err.response.data,
      error: err.response.data,
    });
  }

  if (typeof err === 'string') {
    return new AppError({
      type: 'UnexpectedError',
      error: new Error(err),
    });
  }

  return new AppError({ type: 'UnknownError' });
}
