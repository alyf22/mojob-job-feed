<template>
  <div class="job-feed my-4">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" align-self="center">
            <Treeselect
              v-model="positions"
              :flat="true"
              :multiple="true"
              :options="positionFunctions"
              :normalizer="normalizer"
              placeholder="FILTER BY POSITION"
              class="float-left d-inline-flex"
              @input="onPositionsChange()"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              :items="sortItems"
              v-model="sort"
              class="d-inline-flex float-right mr-5"
              @change="sortResults"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <JobListingComponent
      v-for="jobListing in jobListings"
      :key="jobListing.id"
      :jobListing="jobListing"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { JobListing, PositionFunction } from "@/models/models";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import JobListingComponent from "./JobListing.vue";

@Component({
  components: {
    Treeselect,
    JobListingComponent,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private sortItems: String[] = ["5 Per Page", "25 Per Page", "Display all"];
  private sort: String = "5 Per Page";

  private positions: Array<String> = [];

  public normalizer(node: Object) {
    return {
      id: node.id,
      label: node.name,
      children: node.children,
    };
  }

  public sortResults() {
    const index = this.sortItems.indexOf(this.sort);
    if (index == 0) this.$emit("PageSizeChanged", 5);
    else if (index == 1) this.$emit("PageSizeChanged", 25);
    else this.$emit("PageSizeChanged", -1);
    this.$router.push({
      path: this.$route.path,
      query: { sort: index },
    });
  }

  private mounted() {
    if ("sort" in this.$route.query && this.$route.query.sort != null) {
      const index =
        Number(this.$route.query.sort) > 2 ? 2 : this.$route.query.sort;
      this.sort = this.sortItems[index];
      this.sortResults();
    }
  }

  @Watch("jobListings")
  onJobListingsChange(newVal: JobListing[], oldVal: JobListing[]) {
    if (newVal.length != oldVal.length) this.sortResults();
  }

  public onPositionsChange() {
    this.$emit("PositionFunctionChanged", this.positions);
  }
}
</script>

<style>
.v-select__selections,
.v-input__slot,
.v-select__selections {
  min-width: fit-content !important;
  max-width: fit-content !important;
}
.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  content: none !important;
}
.vue-treeselect__control {
  max-width: 80%;
  border: none;
}
.vue-treeselect svg {
  fill: black;
}
.vue-treeselect__menu-container {
  max-width: 80%;
}
.vue-treeselect__placeholder {
  color: black;
}
</style>
