import { AxiosStatic } from "axios";
import { IPage, PositionFunction, JobListing } from "@/models/models";

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  // get job listing with specific size
  public getJobListings = (
    pageSize: Number,
    positionFunctions: Array<String>
  ): Promise<IPage<JobListing>> =>
    this.axios
      .get(
        `${this.baseUrl}job/listings/?page=1${
          pageSize == -1 ? "" : "&page_size=" + pageSize
        }&use_pagination=True${
          positionFunctions.length != 0
            ? "&position_functions=" + positionFunctions.join(",")
            : ""
        }`
      )
      .then((response) => response.data);

  // get all job listings
  /**
   * Note: decided to make getAllJobListings to make it more generic
   * So that If I didn't know the size I will still get them all
   */
  public getAllJobListings = (
    positionFunctions: Array<String>
  ): Promise<JobListing[]> =>
    this.axios
      .get(
        `${this.baseUrl}job/listings/${
          positionFunctions.length != 0
            ? "?position_functions=" + positionFunctions.join(",")
            : ""
        }`
      )
      .then((response) => response.data);

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */
}
