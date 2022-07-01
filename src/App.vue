<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onErrorCaptured, ref } from "vue";
import Counter from "./components/Counter.vue";
import TemperatureConverter from "./components/TemperatureConverter.vue";

const error = ref(false);

function setError(v = false) {
  error.value = v;
}

onErrorCaptured(function (err, instance, info) {
  console.error("[errorCaptured]", err, instance, info);
  setError(true);
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-row justify-center">
      <div v-if="!error" class="basis-full md:basis-1/2">
        <Counter />
        <TemperatureConverter />
      </div>
      <div v-else>
        <h1>An error occurred</h1>
      </div>
    </div>
  </div>
</template>

<style></style>
