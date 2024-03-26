export type SettingsUserType = {
  username: string;
};

export type SettingsType = {
  user: SettingsUserType;
};

export type ConfigurationsType = {
  settings: SettingsType;
  users_id: string;
} | null;
