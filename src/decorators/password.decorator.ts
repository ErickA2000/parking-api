import {
  type ValidationOptions,
  registerDecorator,
  type ValidationArguments
} from "class-validator";
import { PASSWORD } from "@Constants/regex";

/**
 *
 * @description Validate if it contains at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character and is between 8 to 16 characters
 *
 */
export function IsPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPassword",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: string, args: ValidationArguments) {
          return PASSWORD.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Password <${args.value}> must contain at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character and is between 6 and 16 characters.`;
        }
      }
    });
  };
}
