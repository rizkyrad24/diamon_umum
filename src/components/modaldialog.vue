<script setup>
import dialog from '@/assets/img/Dialog.png';
</script>

<template>
  <div :class="{'hidden': !isVisible}" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[999]">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[360px]">
      <div class="flex justify-center"><img :src="dialog" alt="Dialog Image" class="pt-1"></div>
      <div class="flex justify-center px-5">
        <h1 class="text-[#333333] text-xl text-center font-bold mt-2">{{ title }}</h1>
      </div>
      <div class="flex justify-center px-5 mt-1">
        <p class="text-[#333333] text-center font-semibold mt-2">{{ message }}</p>
      </div>
      <div class="flex justify-center mt-5">
        <button @click="okFunction"
          class="w-[296px] h-[40px] bg-[#2671D9] text-white text-sm font-semibold rounded-lg">Ok</button>
      </div>
      <div class="flex justify-center mt-3 mb-2">
        <button @click="closeModal"
          class="w-[296px] h-[40px] bg-[red] text-white text-sm font-semibold rounded-lg">Batal</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalSuccess",
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
  emits: ["close", "ok"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    okFunction() {
      this.$emit("ok")
    }
  },
};
</script>
