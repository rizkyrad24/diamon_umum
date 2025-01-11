<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  isDisplay: {
    type: Boolean,
    required: true, // isDisplay wajib
  },
  data: {
    type: [String, Object, Array], // data bisa berupa string, objek, atau array
    default: null, // data opsional dengan default null
  },
});

const emit = defineEmits(['background', 'note'])

const backgroundInput = ref('');
const noteInput = ref('');

watch(
  () => props.data, 
  (newData) => {
    backgroundInput.value = newData?.background || "";
    noteInput.value = newData?.note || "";
  },
  { immediate: true }
);

function changeBackground(val) {
  backgroundInput.value = val;
  emit('background', val);
}

function changeNote(val) {
  noteInput.value = val;
  emit('note', val);
}
</script>

<template>
    <div :class="!props.isDisplay? 'hidden': ''">
        <h1 class="text-xl text-[#333333] font-medium pl-4 py-6">Lainnya</h1>
        <div class="w-[1160px] h-auto flex justify-between">

            <!-- Latar Belakang -->
            <div class="ml-4">
                <label class="text-[#4D5E80] font-medium">Latar Belakang <span class="text-[#FF5656]">*</span></label> 
                <form action="" class="w-[550px] h-[88px] px-4 py-1 mt-2 border-[1px] rounded-lg text-sm">
                    <input @input="changeBackground($event.target.value)" :value="backgroundInput" type="text" placeholder="Masukkan Latar Belakang" class="w-[400px] outline-none">
                </form>
            </div>

            <!-- Catatan -->
            <div class="ml-4">
                <label class="text-[#4D5E80] font-medium text-base">Catatan <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label> 
                <form action="" class="w-[550px] h-[88px] px-4 py-1 mt-2 border-[1px] rounded-lg text-sm">
                    <input @input="changeNote($event.target.value)" :value="noteInput" type="text" placeholder="Masukkan Catatan" class="w-[400px] outline-none">
                </form>
            </div>
        </div>
    </div>
</template>