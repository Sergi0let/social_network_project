export type ValidatorType = (value: string) => string | undefined;

export const requiredField: ValidatorType = (value) => {
  if (value) {
    return undefined;
  }
  return 'Field is Required';
};

export const maxLengthCreator =
  (maxLength: number): ValidatorType =>
  (value) => {
    if (value.length > maxLength) {
      return `Max length is ${maxLength} symbols`;
    }
    return undefined;
  };
