<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
  isDisplay: {
    type: Boolean,
    required: true, // isDisplay wajib
  },
  data: {
    type: Object, // data bisa berupa string, objek, atau array
    default: null, // data opsional dengan default null
  },
});

const emit = defineEmits(['partnershipCandidate'])

const isDropdownOpen = ref(false);
const candidateInput = ref('');
const filterClickListener = ref(null);

watch(
  () => props.data, 
  (newData) => {
    candidateInput.value = newData?.partnershipCandidate || "";
  },
  { immediate: true }
);

onMounted(() => {
  filterClickListener.value = (e) => {
    if (!e.target.closest('.drop-container') 
    ){
        isDropdownOpen.value = false;
    }
  };
  document.addEventListener('click', filterClickListener.value);
})

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectOption(option) {
    candidateInput.value = option;
  emit('partnershipCandidate', option);
  isDropdownOpen.value = false;
}

</script>

<template>
    <div :class="!props.isDisplay? 'hidden': ''">
        <h1 class="text-xl text-[#333333] font-medium pl-4 py-6">Daftar Mitra Bisnis</h1>
        <div class="w-[1217px] h-auto flex justify-between">
            <!-- Calon Mitra Bisnis -->
            <div class="ml-4">
                <label class="text-[#4D5E80] font-medium">Calon Mitra Bisnis <span class="text-[#FF5656]">*</span></label> 
                <!-- <form action="" class="w-[1160px] h-[40px] px-4 py-2 mt-2 border-[1px] rounded-lg flex justify-between text-sm">
                    <input @input="changeCandidate($event.target.value)" :value="candidateInput" type="text" placeholder="Pilih Calon Mitra Bisnis" class="w-[400px] outline-none">
                    <svg width="16" height="16" class="cursor-pointer mt-1 ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z" fill="#2671D9"/>
                    </svg>
                </form> -->
                <div class="w-[560px] mt-2 drop-container">
                    <button @click="toggleDropdown" :class="{'rounded-t-lg': isDropdownOpen, 'rounded-lg text-[#7F7F80]': !isDropdownOpen}" class="w-[560px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
                    <span :class="{'text-black': candidateInput, 'text-[#9C9C9C]': !candidateInput}">{{ candidateInput || 'Pilih MoU/NDA' }}</span>
                            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z" fill="#2671D9"/>
                            </svg>
                    </button>
                    <div v-show="isDropdownOpen" class="w-[560px] border-[1px] rounded-b-lg z-10">
                        <ul class="text-sm">
                            <li @click="selectOption('Candidate 1')" :class="{'bg-[#2671D9] text-white': candidateInput === 'Candidate 1', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': candidateInput !== 'Candidate 1'}" class="cursor-pointer border-b-[1px] px-4 py-2">Candidate 1</li>
                            <li  @click="selectOption('Candidate 2')" :class="{'bg-[#2671D9] text-white rounded-b-lg': candidateInput === 'Candidate 2', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium ': candidateInput !== 'Candidate 2'}" class="cursor-pointer  px-4 py-2">Candidate 2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>