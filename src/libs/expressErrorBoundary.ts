import { Request, Response, NextFunction } from "express";

const errorBoundaryDecorator = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const fn = descriptor.value;
  descriptor.value = async (
    ...args: [req: Request, res: Response, next: NextFunction]
  ) => {
    try {
      await fn.apply(this, args);
    } catch (error) {
      const [, , next] = args;
      next(error);
    }
  };
};

export default errorBoundaryDecorator;