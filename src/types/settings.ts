export type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number | string;
};

export type SettingsUserType = {
  user: { type: { username: string } };
};

export type ConfigType = {
  user: SettingsUserType;
};

export type SettingsType = {
  config: ConfigType;
  products: ProductType[] | undefined;
  users_id: string;
} | null;
