<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="!props.isDisplay ? 'hidden' : ''">
    <h1 class="text-xl font-medium pl-4 py-6">Dasar</h1>
    <div class="pl-4 w-[1155px] flex justify-between">

      <!-- Jenis Kemitraan -->
      <div>
        <label class="text-[#4D5E80] font-medium">Jenis Kemitraan <span class="text-[#FF5656]">*</span></label>
        <div class="relative w-[540px] mt-2 jenis-container">
          <button @click="jenisDropdown"
            :class="{ 'rounded-t-lg': isJenisOpen, 'rounded-lg text-[#7F7F80]': !isJenisOpen }"
            class="w-[540px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
            <span :class="{ 'text-black': jenissOption, 'text-[#9C9C9C]': !jenissOption }">{{ jenissOption?.label ||
              'Pilih Jenis Kemitraan' }}</span>
            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z"
                fill="#2671D9" />
            </svg>
          </button>
          <div v-show="isJenisOpen" class="w-[540px] border-[1px] rounded-b-lg z-10">
            <ul class="text-sm">
              <li @click="jenisOption({ value: 'JV', label: 'Joint Venture' })"
                :class="{ 'bg-[#2671D9] text-white': jenissOption?.value === 'JV', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': jenissOption?.value !== 'JV' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Joint Venture</li>
              <li @click="jenisOption({ value: 'K', label: 'Konsorsium' })"
                :class="{ 'bg-[#2671D9] text-white rounded-b-lg': jenissOption?.value === 'K', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': jenissOption?.value !== 'K' }"
                class="cursor-pointer px-4 py-2">Konsorsium</li>
              <li @click="jenisOption({ value: 'R', label: 'Resseler' })"
                :class="{ 'bg-[#2671D9] text-white': jenissOption?.value === 'R', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': jenissOption?.value !== 'R' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Resseler</li>
              <li @click="jenisOption({ value: 'B', label: 'Bundling Layanan' })"
                :class="{ 'bg-[#2671D9] text-white': jenissOption?.value === 'B', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': jenissOption?.value !== 'B' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Bundling Layanan</li>
              <li @click="jenisOption({ value: 'M', label: 'Marketer' })"
                :class="{ 'bg-[#2671D9] text-white rounded-b-lg': jenissOption?.value === 'M', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': jenissOption?.value !== 'M' }"
                class="cursor-pointer px-4 py-2">Marketer</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tanggal -->
      <div class="relative translate-x-4">
        <label for="dateInput" class="text-[#4D5E80] font-medium">Ekspektasi Tanggal Selesai<span class="text-[#FF5656]">*</span></label>
        <div class="w-[560px] py-[10px] px-4 mt-2 border-[1px] rounded-lg text-sm flex justify-between items-center">
          <span :class="{ 'text-black': selectedDate, 'text-[#9C9C9C]': !selectedDate }">{{ selectedDate || "Pilih Tanggal" }}</span>
          <svg ref="calendarIcon" width="14" height="14" class="mt-2 -translate-y-1" viewBox="0 0 14 14" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.5 0.5C3.77614 0.5 4 0.723858 4 1V2H10V1C10 0.723858 10.2239 0.5 10.5 0.5C10.7761 0.5 11 0.723858 11 1V2H11.5C12.6046 2 13.5 2.89543 13.5 4V11.5C13.5 12.6046 12.6046 13.5 11.5 13.5H2.5C1.39543 13.5 0.5 12.6046 0.5 11.5V4C0.5 2.89543 1.39543 2 2.5 2H3V1C3 0.723858 3.22386 0.5 3.5 0.5ZM2.5 3C1.94772 3 1.5 3.44772 1.5 4V4.76756C1.79417 4.59739 2.13571 4.5 2.5 4.5H11.5C11.8643 4.5 12.2058 4.59739 12.5 4.76756V4C12.5 3.44772 12.0523 3 11.5 3H2.5ZM12.5 6.5C12.5 5.94772 12.0523 5.5 11.5 5.5H2.5C1.94772 5.5 1.5 5.94772 1.5 6.5V11.5C1.5 12.0523 1.94772 12.5 2.5 12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V6.5Z"
              fill="#2671D9" />
          </svg>
          <input :min="minDate" ref="dateInput" id="dateInput" type="date" @input="changeDate($event.target.value)"
            :value="selectedDate" class="w-[510px] opacity-0 absolute">
        </div>
      </div>
    </div>

    <div class="pl-4 mt-7 w-[1155px] flex justify-between">
      <!-- Tipe Anggaran -->
      <div>
        <label class="text-[#4D5E80] font-medium">Tipe Anggaran <span class="text-[#FF5656]">*</span></label>
        <div class="relative w-[540px] mt-2 tipe-container">
          <button @click="tipeDropdown" :class="{ 'rounded-t-lg': isTipeOpen, 'rounded-lg text-[#7F7F80]': !isTipeOpen }"
            class="w-[540px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
            <span :class="{ 'text-black': tipeeOption, 'text-[#9C9C9C]': !tipeeOption }">{{ tipeeOption?.label || 'Pilih Tipe Anggaran' }}</span>
            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z"
                fill="#2671D9" />
            </svg>
          </button>
          <div v-show="isTipeOpen" class="w-[540px] border-[1px] rounded-b-lg z-10">
            <ul class="text-sm">
              <li @click="tipeOption({ value: 'C', label: 'Capex' })"
                :class="{ 'bg-[#2671D9] text-white': tipeeOption?.value === 'C', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': tipeeOption?.value !== 'C' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Capex</li>
              <li @click="tipeOption({ value: 'O', label: 'Opex' })"
                :class="{ 'bg-[#2671D9] text-white': tipeeOption?.value === 'O', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': tipeeOption?.value !== 'O' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Opex</li>
              <li @click="tipeOption({ value: 'OC', label: 'Capex & Apex' })"
                :class="{ 'bg-[#2671D9] text-white rounded-b-lg': tipeeOption?.value === 'OC', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': tipeeOption?.value !== 'OC' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Capex & Apex</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Nomor Anggaran -->
      <div class="translate-x-4">
        <label class="text-[#4D5E80] font-medium">Nomor Anggaran <span class="text-[#FF5656]">*</span></label>
        <form action="" class="w-[555px] py-[10px] px-4 mt-2 border-[1px] rounded-lg text-sm flex justify-between">
          <input @input="changenoBudget($event.target.value)" :value="noBudgetInput" type="text"
            placeholder="Masukkan Nomor Anggaran" class="w-full outline-none">
        </form>
      </div>
    </div>

    <div class="pl-4 mt-7 w-[1155px] flex justify-between">
      <!-- Metode Kemitraan -->
      <div>
        <label class="text-[#4D5E80] font-medium">Metode Kemitraan <span class="text-[#FF5656]">*</span></label>
        <div class="relative w-[540px] mt-2 metode-container">
          <button @click="metodeDropdown"
            :class="{ 'rounded-t-lg': isMetodeOpen, 'rounded-lg text-[#7F7F80]': !isMetodeOpen }"
            class="w-[540px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
            <span :class="{ 'text-black': metodeeOption, 'text-[#9C9C9C]': !metodeeOption }">{{ metodeeOption?.label ||
              'Pilih Metode Kemitraan' }}</span>
            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z"
                fill="#2671D9" />
            </svg>
          </button>
          <div v-show="isMetodeOpen" class="w-[540px] border-[1px] rounded-b-lg z-10">
            <ul class="text-sm">
              <li @click="metodeOption({ value: 'T1', label: 'Tunjuk Langsung' })"
                :class="{ 'bg-[#2671D9] text-white': metodeeOption?.value === 'T1', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': metodeeOption?.value !== 'T1' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Tunjuk Langsung</li>
              <li @click="metodeOption({ value: 'T2', label: 'Terbuka' })"
                :class="{ 'bg-[#2671D9] text-white rounded-b-lg': metodeeOption?.value === 'T2', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': metodeeOption?.value !== 'T2' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Terbuka</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Jenis Material -->
      <div>
        <label class="text-[#4D5E80] font-medium">Jenis Material <span class="text-[#FF5656]">*</span></label>
        <div class="relative w-[540px] mt-2 material-container">
          <button @click="materialDropdown"
            :class="{ 'rounded-t-lg': isMaterialOpen, 'rounded-lg text-[#7F7F80]': !isMaterialOpen }"
            class="w-[555px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
            <span :class="{ 'text-black': materiallOption, 'text-[#9C9C9C]': !materiallOption }">{{ materiallOption?.label
              || 'Pilih Jenis Material' }}</span>
            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z"
                fill="#2671D9" />
            </svg>
          </button>
          <div v-show="isMaterialOpen" class="w-[555px] border-[1px] rounded-b-lg z-10">
            <ul class="text-sm">
              <li @click="materialOption({ value: 'M', label: 'Material Only' })"
                :class="{ 'bg-[#2671D9] text-white': materiallOption?.value === 'M', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': materiallOption?.value !== 'M' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Material Only</li>
              <li @click="materialOption({ value: 'S', label: 'Service Only' })"
                :class="{ 'bg-[#2671D9] text-white': materiallOption?.value === 'S', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': materiallOption?.value !== 'S' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Service Only</li>
              <li @click="materialOption({ value: 'MS', label: 'Material and Service' })"
                :class="{ 'bg-[#2671D9] text-white rounded-b-lg': materiallOption?.value === 'MS', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': materiallOption?.value !== 'MS' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Material and Service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="pl-4 mt-7 w-[1155px] flex justify-between">
      <!-- Bisnis Type -->
      <div>
        <label class="text-[#4D5E80] font-medium">Tipe Bisnis <span class="text-[#FF5656]">*</span></label>
        <div class="relative w-[540px] mt-2 material-container">
          <button @click="BisnisTypeDropdown"
            :class="{ 'rounded-t-lg': isBisnisTypeOpen, 'rounded-lg text-[#7F7F80]': !isBisnisTypeOpen }"
            class="w-[555px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
            <span :class="{ 'text-black': bisnisTypeOption, 'text-[#9C9C9C]': !bisnisTypeOption }">{{ bisnisTypeOption?.label
              || 'Pilih Tipe Bisnis' }}</span>
            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z"
                fill="#2671D9" />
            </svg>
          </button>
          <div v-show="isBisnisTypeOpen" class="w-[555px] border-[1px] rounded-b-lg z-10">
            <ul class="text-sm">
              <li @click="BisnisTypeOption({ value: 'Infrastruktur', label: 'Infrastruktur' })"
                :class="{ 'bg-[#2671D9] text-white': bisnisTypeOption?.value === 'Infrastruktur', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': bisnisTypeOption?.value !== 'Infrastruktur' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Infrastruktur</li>
              <li @click="BisnisTypeOption({ value: 'Digital', label: 'Digital' })"
                :class="{ 'bg-[#2671D9] text-white': bisnisTypeOption?.value === 'Digital', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': bisnisTypeOption?.value !== 'Digital' }"
                class="cursor-pointer border-b-[1px] px-4 py-2">Digital</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Judul -->
    <div class="ml-4 mt-6">
      <label class="text-[#4D5E80] font-medium">Judul <span class="text-[#FF5656]">*</span></label>
      <form action="" class="w-[1150px] h-[88px] px-4 py-1 mt-2 border-[1px] rounded-lg text-sm">
        <input @input="changeTitle($event.target.value)" :value="titleInput" type="text" placeholder="Masukkan Judul"
          class="w-[1080px] outline-none">
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { partnershipTypeParsing, budgedTypeParsing, methodTypeParsing, materialTypeParsing } from '@/utils/helper';
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
const emit = defineEmits([
  'partnershipType', 'createdDate',
  'budgetType', 'budgetNumber',
  'partnershipMethod', 'materialType',
  'partnershipTitle', 'bisnisType'
])

// Jenis Kemitraan
const isJenisOpen = ref(false);
const jenissOption = ref(null);
function jenisDropdown() {
  isJenisOpen.value = !isJenisOpen.value;
  isTipeOpen.value = false;
  isMetodeOpen.value = false;
  isMaterialOpen.value = false;
  isBisnisTypeOpen.value = false;
}
function jenisOption(option) {
  jenissOption.value = option;
  emit('partnershipType', option.value);
  isJenisOpen.value = false;
}

// Tipe Anggaran
const isTipeOpen = ref(false);
const tipeeOption = ref(null);
function tipeDropdown() {
  isTipeOpen.value = !isTipeOpen.value;
  isJenisOpen.value = false;
  isMetodeOpen.value = false;
  isMaterialOpen.value = false;
  isBisnisTypeOpen.value = false;
}
function tipeOption(option) {
  tipeeOption.value = option;
  emit('budgetType', option.value);
  isTipeOpen.value = false;
}

// Metode Kemitraan
const isMetodeOpen = ref(false);
const metodeeOption = ref(null);
function metodeDropdown() {
  isMetodeOpen.value = !isMetodeOpen.value;
  isJenisOpen.value = false;
  isTipeOpen.value = false;
  isMaterialOpen.value = false;
  isBisnisTypeOpen.value = false;
}
function metodeOption(option) {
  metodeeOption.value = option;
  emit('partnershipMethod', option.value);
  isMetodeOpen.value = false;
}

// Jenis Material
const isMaterialOpen = ref(false);
const materiallOption = ref(null);
function materialDropdown() {
  isMaterialOpen.value = !isMaterialOpen.value;
  isJenisOpen.value = false;
  isTipeOpen.value = false;
  isMetodeOpen.value = false;
  isBisnisTypeOpen.value = false;
}
function materialOption(option) {
  materiallOption.value = option;
  emit('materialType', option.value);
  isMaterialOpen.value = false;
}

// Bisnis Type
const isBisnisTypeOpen = ref(false);
const bisnisTypeOption = ref(null);
function BisnisTypeDropdown() {
  isBisnisTypeOpen.value = !isBisnisTypeOpen.value;
  isJenisOpen.value = false;
  isTipeOpen.value = false;
  isMetodeOpen.value = false;
  isMaterialOpen.value = false;
}
function BisnisTypeOption(option) {
  bisnisTypeOption.value = option;
  emit('bisnisType', option.value);
  isBisnisTypeOpen.value = false;
}

// Judul
const titleInput = ref('');
function changeTitle(val) {
  titleInput.value = val;
  emit('partnershipTitle', val);
}

// No Anggaran
const noBudgetInput = ref('');
function changenoBudget(val) {
  noBudgetInput.value = val;
  emit('budgetNumber', val);
}

// Date
// const today = new Date()
const selectedDate = ref(null);
const minDate = ref("");
const filterClickListener = ref(null);

function changeDate(val) {
  selectedDate.value = val;
  emit('createdDate', val);
}

watch(
  () => props.data,
  (newData) => {
    titleInput.value = newData?.partnershipTitle || "";
    noBudgetInput.value = newData?.budgetNumber || "";
    materiallOption.value = newData ? materialTypeParsing(newData.materialType) : "";
    metodeeOption.value = newData ? methodTypeParsing(newData.partnershipMethod) : "";
    tipeeOption.value = newData ? budgedTypeParsing(newData.budgetType) : "";
    jenissOption.value = newData ? partnershipTypeParsing(newData.partnershipType) : "";
    bisnisTypeOption.value = newData? {value: newData.bisnisType, label: newData.bisnisType} : null;

    const sekarang = new Date();
    const empatPuluhHariKedepan = new Date();
    empatPuluhHariKedepan.setDate(sekarang.getDate() + 40);
    const expectedDate = new Date(newData?.expectedDate || empatPuluhHariKedepan.toISOString().split("T")[0]);
    changeDate(expectedDate.toISOString().split("T")[0]);
    const tigaPuluhHariKedepan = new Date(newData?.submissionDate || sekarang.toISOString().split("T")[0]);
    const createdDate = new Date();
    createdDate.setDate(tigaPuluhHariKedepan.getDate() + 30);
    minDate.value = createdDate.toISOString().split("T")[0];
  },
  { immediate: true }
);

onMounted(() => {
  filterClickListener.value = (e) => {
    if (!e.target.closest('.jenis-container')
      && !e.target.closest('.tipe-container')
      && !e.target.closest('.metode-container')
      && !e.target.closest('.material-container')) {
      isJenisOpen.value = false;
      isTipeOpen.value = false;
      isMetodeOpen.value = false;
      isMaterialOpen.value = false;
      isBisnisTypeOpen.value = false;
    }
  };
  document.addEventListener('click', filterClickListener.value);

  const sekarang = new Date();
  const tigaPuluhHariKedepan = new Date();
  tigaPuluhHariKedepan.setDate(sekarang.getDate() + 30);
  minDate.value = tigaPuluhHariKedepan.toISOString().split("T")[0];
  const empatPuluhHariKedepan = new Date();
  empatPuluhHariKedepan.setDate(sekarang.getDate() + 40);
  changeDate(empatPuluhHariKedepan.toISOString().split("T")[0]);
})
</script>