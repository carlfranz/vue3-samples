<script setup lang="ts">
import { reactive, computed } from "vue";
import { requireNotNull } from "../ValidatorUtils";
import { TempConvState } from "./types";

import { cloneDeep } from "lodash";

const defaultState: TempConvState = {
  status: "UPDATE_C",
  celsius: 31,
  fahrenheit: 12,
};

const emit = defineEmits({
  state_update: (payload: TempConvState) => {
    requireNotNull(payload.fahrenheit);
    requireNotNull(payload.status);
    requireNotNull(payload.celsius);
    return true;
  },
});

const state = reactive(defaultState);

function updateCelsius(evt: any) {
  const temp = Number(evt.target.value);
  if (Number.isFinite(temp)) {
    state.status = "UPDATE_C";
    state.celsius = temp;
  }
  emit("state_update", cloneDeep(state));
}

function updateFahrenheit(evt: any) {
  const temp = Number(evt.target.value);
  if (Number.isFinite(temp)) {
    state.status = "UPDATE_F";
    state.fahrenheit = temp;
  }
  emit("state_update", state);
}

const temps = computed(() => {
  if (state.status === "UPDATE_C") {
    const f = state.celsius * (9 / 5) + 32;
    return {
      celsius: state.celsius,
      fahrenheit: Math.trunc(f),
    };
  } else {
    const c = ((Number(state.fahrenheit) - 32) * 5) / 9;
    return {
      celsius: Math.trunc(c),
      fahrenheit: state.fahrenheit,
    };
  }
});
</script>

<template>
  <h3>Temperature Converter</h3>
  <div class="shadow-md rounded-md p-2 flex flex-row items-center">
    <input
      class="basis-1/4"
      :value="temps.celsius"
      type="text"
      id="celsius"
      @input="updateCelsius"
    />
    <span class="basis-1/4"> Celsius = </span>
    <input
      class="basis-1/4"
      :value="temps.fahrenheit"
      type="text"
      id="fahrenheit"
      @input="updateFahrenheit"
    />
    <span class="basis-1/4"> Fahrenheit </span>
  </div>
</template>

<style scoped></style>
