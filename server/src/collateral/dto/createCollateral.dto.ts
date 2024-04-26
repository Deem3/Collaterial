type CreateCollateralDto = {
  id: number;
  owner: string;
  assetType: number;
  subAssetType: number;
  collateralName: string;
  state: string;
  quantity: number;
  depositAmount: number;
  marketValue: number;
  dateOfAssessment: Date;
  description: string;
  additionalFields?: AdditionalType;
};

type AdditionalType = {
  [key: string]: string[] | number[];
};

export default CreateCollateralDto;
