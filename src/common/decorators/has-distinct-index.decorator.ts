import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'HasDistinctIndex', async: false })
export class HasDistinctIndexConstraint
  implements ValidatorConstraintInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any[], _args: ValidationArguments): boolean {
    if (!Array.isArray(value)) return false;

    const seen = new Set<number>();

    for (const item of value) {
      if (typeof item !== 'object' || item === null) continue;

      // Find the first key that includes 'index' and is a number
      const indexKey = Object.keys(item).find(
        (key) =>
          typeof item[key] === 'number' && key.toLowerCase().includes('index'),
      );

      if (indexKey === undefined) continue;

      const indexValue = item[indexKey];
      if (seen.has(indexValue)) return false;
      seen.add(indexValue);
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `All index-like values (e.g., weekdayIndex, dayIndex) must be distinct in '${args.property}'.`;
  }
}

export function HasDistinctIndex(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'HasDistinctIndex',
      target: object.constructor,
      propertyName,
      options,
      validator: HasDistinctIndexConstraint,
    });
  };
}
