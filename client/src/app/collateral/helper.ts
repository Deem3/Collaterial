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
