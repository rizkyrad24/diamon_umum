<script setup>
import gagal from '@/assets/img/Dialogkirimgagal.png';
</script>

<template>
  <div :class="{'hidden': !isVisible}" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[999]">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[360px]">
      <div class="flex justify-center"><img :src="gagal" alt="Dialog Image" class="pt-3"></div>
      <div class="flex justify-center px-5">
        <h1 class="text-[#333333] text-xl text-center font-bold mt-2">{{ title }}</h1>
      </div>
      <div class="flex justify-center px-5 mt-3">
        <p class="text-[#333333] text-center font-semibold mt-2">{{ message }}</p>
      </div>
      <div class="flex justify-center mt-8 mb-4">
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
