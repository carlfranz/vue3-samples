<script setup lang="ts">
import { ref } from "vue";
import { requireNotNull } from "../ValidatorUtils";

const emit = defineEmits({
  increment: (payload: { count: number }) => {
    requireNotNull(payload);
    requireNotNull(payload.count);
    return true;
  },
});

const count = ref(0);

function increment() {
  count.value++;
  emit("increment", { count: 1 });
}
</script>

<template>
  <h3>Temperature Converter</h3>
  <div class="shadow-md rounded-md p-2 flex flex-row items-center">
    <span class="basis-1/2 text-center"> {{ count }} </span>
    <button
      class="basis-1/2 btn-primary"
      type="button"
      @click="increment"
      id="button-increment"
    >
      increment
    </button>
  </div>
</template>

<style scoped></style>
