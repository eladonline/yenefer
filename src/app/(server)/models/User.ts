type UserProps = {
  email: string;
  password: string;
  license?: string;
};

class User {
  template: UserProps;

  constructor(data: UserProps) {
    this.template = data;
  }

  get schema() {
    const { password, email, license } = this.template;
    if (!password || !email) throw new Error("Missing Key");

    return {
      password,
      email,
      license: license || "basic",
    };
  }
}

export default User;
