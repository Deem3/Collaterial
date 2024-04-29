export const controllerStyle = 'flex justify-between items-center';

export const InputType = (type: string) => {
  switch (type) {
    case 'string':
      return 'text';
    case 'number':
      return 'number';
    case 'date':
      return 'date';
    default:
      break;
  }
};

export type EditType = {
  id: number;
  ownerId: string;
  assetTypeId: number;
  subAssetTypeId: number;
  collateralName: string;
  state: string;
  quantity: number;
  depositAmount: number;
  marketValue: number;
  dateOfAssessment: Date;
  description: string;
  additionalFields: {
    [key: string]: string[] | number[];
  };
};

export const collateralStateConverter = (state: string) => {
  switch (state) {
    case 'SOLD':
      return 'Борлуулсан';
    case 'RELEASED':
      return 'Чөлөөлсөн';
    case 'HELD_ASSET':
      return 'Барьцаанд байгаа';
    default:
      break;
  }
};

export type EditSalesType = {
  collateralId: bigint;
  amountSold: number;
  soldDate: Date;
  description: string;
};
