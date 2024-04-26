export enum AdditionalFieldTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export type additionalFields = {
  name: string;
  type: AdditionalFieldTypes;
};
