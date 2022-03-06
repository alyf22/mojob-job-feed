<template>
  <div class="home mx-15 px-15">
    <job-feed
      :job-listings="jobListings"
      :position-functions="positionFunctionFilters"
      @PageSizeChanged="onPageSizeChange($event)"
      @PositionFunctionChanged="onPositionFunctionsChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JobFeed from "@/components/JobFeed.vue";
import BaseApi from "@/api-requests/api";
import { IPage, PositionFunction, JobListing } from "@/models/models";

@Component({
  components: {
    JobFeed,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private positionFunctionFilters: PositionFunction[] = [];
  private jobListings: JobListing[] = [];
  private pageSize: Number = 5; // size = -1 means All job Listings
  private positionFunctions: Array<String> = []; // selected position functions

  //fetch specific-sized job listings
  public async fetchJobListings() {
    this.mojobApi = new BaseApi(
      "https://test-api.mojob.io/public/",
      this.axios
    );
    try {
      const jobListingsResposePage: IPage<JobListing> = await this.mojobApi.getJobListings(
        this.pageSize,
        this.positionFunctions
      );
      if (jobListingsResposePage.results) {
        this.jobListings = jobListingsResposePage.results;
        // console.log(JSON.stringify(this.jobListings, null, 2));
        // console.log(this.jobListings);
      } else if (jobListingsResposePage && this.pageSize != -1) {
      } else {
        console.log("Failed loading specific-sized job listings");
      }
    } catch (e) {
      console.log("Failed loading specific-sized job listings");
      console.log(e);
    }
  }

  //fetch All job listings
  public async fetchAllJobListings() {
    this.mojobApi = new BaseApi(
      "https://test-api.mojob.io/public/",
      this.axios
    );
    try {
      const jobListingsResposePage: JobListing[] = await this.mojobApi.getAllJobListings(
        this.positionFunctions
      );
      if (jobListingsResposePage) {
        this.jobListings = jobListingsResposePage;
        // console.log(JSON.stringify(this.jobListings, null, 2));
        // console.log(this.jobListings);
      } else {
        console.log("Failed loading All job listings");
      }
    } catch (e) {
      console.log("Failed loading All job listings");
      console.log(e);
    }
  }

  public async fetchJobLocationFilters() {
    this.mojobApi = new BaseApi(
      "https://test-api.mojob.io/public/",
      this.axios
    );
    try {
      const jobLocationFiltersResponsePage: IPage<PositionFunction> = await this.mojobApi.getPositionFunctions();
      if (jobLocationFiltersResponsePage.results) {
        this.positionFunctionFilters = jobLocationFiltersResponsePage.results;
        // console.log(JSON.stringify(this.positionFunctionFilters, null, 2));
        // console.log(this.positionFunctionFilters);
      } else {
        console.log("Failed loading position function filters");
      }
    } catch (e) {
      console.log("Failed loading position function filters");
      console.log(e);
    }
  }

  public onPageSizeChange(size: Number) {
    this.pageSize = size;
    this.pageSize == -1 ? this.fetchAllJobListings() : this.fetchJobListings();
  }

  public onPositionFunctionsChange(positionFunctions: Array<String>) {
    this.positionFunctions = positionFunctions;
    this.pageSize == -1 ? this.fetchAllJobListings() : this.fetchJobListings();
  }

  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */
  // private async mounted() {
  //   // Here is an example on how to retrieve job position function filters
  //   await this.fetchJobLocationFilters();
  //   await this.fetchJobListings();
  // }

  private created() {
    this.fetchJobLocationFilters();
    this.pageSize == -1 ? this.fetchAllJobListings() : this.fetchJobListings();
  }
}
</script>
