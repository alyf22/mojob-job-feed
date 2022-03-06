<template>
  <div class="my-4">
    <v-card elevation="4" rounded="lg">
      <v-card-title class="mb-0 pb-2">
        {{ jobListing.job.title }}
      </v-card-title>
      <v-card-text
        >{{ jobListing.job.unit.display_name }} &#11044;
        {{ jobListing.job.position_function.name_en }} &#11044;
        {{ jobListing.job.due_date }}</v-card-text
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { JobListing } from "@/models/models";

@Component
export default class JobListingComponent extends Vue {
  @Prop({ default: () => [], type: Object as () => JobListing })
  private jobListing!: JobListing;
}
</script>

<style></style>
