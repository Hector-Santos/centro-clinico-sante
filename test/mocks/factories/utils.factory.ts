import { faker } from '@faker-js/faker';

export const generateWhatsAppNumber = (): string => {
  const totalDigits = faker.number.int({ min: 10, max: 15 });
  const first = faker.string.numeric({ length: 1, exclude: ['0'] });
  const rest = faker.string.numeric(totalDigits - 1);
  return `+${first}${rest}`;
};
