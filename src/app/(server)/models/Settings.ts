type SettingsForm = {
  name: string;
  type: "text" | "number" | "textarea" | "select";
  options?: string[];
};

type SettingsProps = {
  pointer: string;
  forms?: SettingsForm[];
};

class Settings {
  template: SettingsProps;

  constructor(data: SettingsProps) {
    this.template = data;
    if (data.forms) {
      this.validateForm(data.forms);
    }
  }

  validateForm(forms: SettingsForm[]): SettingsForm[] {
    return forms.map(({ name, type, options }: SettingsForm) => {
      const isSelect = type === "select";

      if (!name || !type || (isSelect && !options?.length))
        throw new Error("Settings model is not valid");

      const next: SettingsForm = { name, type };
      if (isSelect) next.options = options;
      return next;
    });
  }

  get schema() {
    const { pointer, forms } = this.template;

    if (!pointer) throw new Error("Missing Key");
    const nextSchema: SettingsProps = { pointer: pointer };

    if (forms) nextSchema.forms = forms;

    return nextSchema;
  }
}

export default Settings;
