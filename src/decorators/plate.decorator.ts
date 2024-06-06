import {
  type ValidationOptions,
  registerDecorator,
  type ValidationArguments
} from "class-validator";
import { PLATE } from "@Constants/regex";

/**
 *
 * @description Valida la placa de vehículo, que sea alfanumérica de 6 caracteres sin letras especiales ni la ñ
 *
 */
export function IsPlate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPlate",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: string, args: ValidationArguments) {
          return PLATE.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `<${args.value}> no corresponde a una placa valida`;
        }
      }
    });
  };
}
