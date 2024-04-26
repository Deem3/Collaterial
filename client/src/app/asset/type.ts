export type AssetTypeDataType = { id: number; name: string; createdAt: Date; updatedAt: Date };

export type SubAssetTypeDataType = {
  id: number;
  name: string;
  assetTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  assetType: AssetTypeDataType;
};

export enum AdditionalFieldTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}
