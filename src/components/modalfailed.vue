<script setup>
import gagal from '@/assets/img/Dialogkirimgagal.png';
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[999]">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[360px] h-[452px]">
      <div class="flex justify-center"><img :src="gagal" alt="Dialog Image" class="pt-6"></div>
      <div class="flex justify-center">
        <h1 class="text-[#333333] text-xl font-semibold mt-2">{{ title }}</h1>
      </div>
      <div class="ml-8 mt-3 w-[240px]">
        <p>{{ message }}</p>
      </div>
      <div class="flex justify-center mt-8">
        <button @click="closeModal"
          class="w-[296px] h-[40px] bg-[#2671D9] text-white text-sm font-semibold rounded-lg">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalFailed",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Notification",
    },
    message: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
