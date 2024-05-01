type TimeMethodsArg = string | number;

class Time {
  options: { timeStyle: "short"; dateStyle: "short" };
  local: string;
  dateInstance: Date;

  constructor(date?: Date) {
    this.dateInstance = date ? new Date(date) : new Date();
    this.options = {
      timeStyle: "short",
      dateStyle: "short",
    };
    this.local = "en-GB";
  }

  get dateTimeAsLocal() {
    return this.dateInstance.toLocaleString(this.local, this.options);
  }

  get timeAsLocal() {
    return this.dateInstance.toLocaleTimeString(this.local, {
      timeStyle: this.options.timeStyle,
    });
  }

  get hourAsLocal() {
    return this.dateInstance.toLocaleTimeString(this.local, {
      hour: "numeric",
    });
  }

  get dayAsLocal() {
    return this.dateInstance.toLocaleString(this.local, {
      day: "numeric",
    });
  }

  get dateAsLocal() {
    return this.dateInstance.toLocaleString(this.local, {
      dateStyle: this.options.dateStyle,
    });
  }
  get date() {
    return this.dateInstance;
  }
}

export default Time;
