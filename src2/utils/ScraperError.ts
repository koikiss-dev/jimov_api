import { AxiosError } from "axios";

export class ScraperErrorResponse extends AxiosError {
  constructor(message: string, name?: string) {
    super(message);
    this.name = name || "Server error";
    this.stack = null;
  }
}
