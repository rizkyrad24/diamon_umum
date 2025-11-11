<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref, watch } from 'vue';
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
const emit = defineEmits(['base', 'partnershipTitle', 'createdDate', 'bisnisType']);

const isDropdownOpen = ref(false);
const selectedOption = ref('');
const titleInput = ref('');

// Bisnis Type
const isBisnisTypeOpen = ref(false);
const bisnisTypeOption = ref(null);
function BisnisTypeDropdown() {
  isBisnisTypeOpen.value = !isBisnisTypeOpen.value;
  isDropdownOpen.value = false;
}
function BisnisTypeOption(option) {
  bisnisTypeOption.value = option;
  emit('bisnisType', option.value);
  isBisnisTypeOpen.value = false;
}

// const showDatePicker = ref(false);
// const today = new Date()
const selectedDate = ref("");
const minDate = ref("");
const filterClickListener = ref(null);

onMounted(() => {
  // changeDate(today.toISOString().split('T')[0]);
  filterClickListener.value = (e) => {
    if (!e.target.closest('.drop-container') 
    ){
        isDropdownOpen.value = false;
    }
  };
  document.addEventListener('click', filterClickListener.value);
  if (props.data) {
    titleInput.value = props.data.partnershipTitle;
    selectedOption.value = props.data.base;
    const expectedDate = new Date(props.data.expectedDate);
    changeDate(expectedDate.toISOString().split("T")[0]);
    const createdDate = new Date(props.data.submissionDate);
    minDate.value = createdDate.toISOString().split("T")[0];
  }
  const sekarang = new Date();
  const tigaPuluhHariKedepan = new Date();
  tigaPuluhHariKedepan.setDate(sekarang.getDate() + 30);
  minDate.value = tigaPuluhHariKedepan.toISOString().split("T")[0];
  const empatPuluhHariKedepan = new Date();
  empatPuluhHariKedepan.setDate(sekarang.getDate() + 40);
  changeDate(empatPuluhHariKedepan.toISOString().split("T")[0]);
})

watch(
  () => props.data, 
  (newData) => {
    titleInput.value = newData?.partnershipTitle || "";
    selectedOption.value = newData?.base || "";
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

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  isBisnisTypeOpen.value = false;
}

function selectOption(option) {
  selectedOption.value = option;
  emit('base', option);
  isDropdownOpen.value = false;
}

function changeTitle(val) {
  titleInput.value = val;
  emit('partnershipTitle', val);
}

function changeDate(val) {
  selectedDate.value = val;
  emit('createdDate', val)
}

</script>

<template>
    <div :class="!props.isDisplay? 'hidden': ''">
        <h1 class="text-xl font-medium pl-4 py-6">Dasar</h1>
        <div class="pl-4 w-[1160px] flex justify-between">
            <!-- MOU/NDA -->
            <div>
                <label class="text-[#4D5E80] font-medium">MOU / NDA <span class="text-[#FF5656]">*</span></label>
                <div class="w-[560px] mt-2 drop-container">
                    <button @click="toggleDropdown" :class="{'rounded-t-lg': isDropdownOpen, 'rounded-lg text-[#7F7F80]': !isDropdownOpen}" class="w-[560px] py-[10px] px-4 border-[1px] text-sm flex justify-between items-center">
                    <span :class="{'text-black': selectedOption, 'text-[#9C9C9C]': !selectedOption}">{{ selectedOption || 'Pilih MOU/NDA' }}</span>
                            <svg width="16" height="16" class="ml-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z" fill="#2671D9"/>
                            </svg>
                    </button>
                    <div v-show="isDropdownOpen" class="w-[560px] border-[1px] rounded-b-lg z-10">
                        <ul class="text-sm">
                            <li @click="selectOption('MOU')" :class="{'bg-[#2671D9] text-white': selectedOption === 'MOU', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium': selectedOption !== 'MOU'}" class="cursor-pointer border-b-[1px] px-4 py-2">MOU</li>
                            <li  @click="selectOption('NDA')" :class="{'bg-[#2671D9] text-white rounded-b-lg': selectedOption === 'NDA', 'hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium ': selectedOption !== 'NDA'}" class="cursor-pointer  px-4 py-2">NDA</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Tanggal -->
            <div class="">
                <label for="dateInput" class="text-[#4D5E80] font-medium">Ekspektasi Tanggal Selesai<span class="text-[#FF5656]">*</span></label>
                <div class="w-[560px] py-[10px] px-4 mt-2 border-[1px] rounded-lg text-sm flex justify-between items-center">
                <span :class="{'text-black': selectedDate, 'text-[#9C9C9C]': !selectedDate}">{{ selectedDate || "Pilih Tanggal" }}</span>
                <svg ref="calendarIcon" width="14" height="14" class="mt-2 -translate-y-1" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 0.5C3.77614 0.5 4 0.723858 4 1V2H10V1C10 0.723858 10.2239 0.5 10.5 0.5C10.7761 0.5 11 0.723858 11 1V2H11.5C12.6046 2 13.5 2.89543 13.5 4V11.5C13.5 12.6046 12.6046 13.5 11.5 13.5H2.5C1.39543 13.5 0.5 12.6046 0.5 11.5V4C0.5 2.89543 1.39543 2 2.5 2H3V1C3 0.723858 3.22386 0.5 3.5 0.5ZM2.5 3C1.94772 3 1.5 3.44772 1.5 4V4.76756C1.79417 4.59739 2.13571 4.5 2.5 4.5H11.5C11.8643 4.5 12.2058 4.59739 12.5 4.76756V4C12.5 3.44772 12.0523 3 11.5 3H2.5ZM12.5 6.5C12.5 5.94772 12.0523 5.5 11.5 5.5H2.5C1.94772 5.5 1.5 5.94772 1.5 6.5V11.5C1.5 12.0523 1.94772 12.5 2.5 12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V6.5Z" fill="#2671D9"/>
                </svg>      
                <input :min="minDate" ref="dateInput" id="dateInput" type="date" @input="changeDate($event.target.value)" :value="selectedDate" class="w-[510px] opacity-0 absolute">
                </div>
            </div>
        </div>

        <div class="pl-4 w-[1160px] flex justify-between mt-4">
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

        <!-- Judul Kemitraan -->
        <div class="ml-4 mt-6">
            <label class="text-[#4D5E80] font-medium">Judul Kemitraan <span class="text-[#FF5656]">*</span></label> 
            <form action="" class="w-[1150px] h-[88px] px-4 py-1 mt-2 border-[1px] rounded-lg text-sm">
                <input @input="changeTitle($event.target.value)" :value="titleInput" type="text" placeholder="Masukkan Judul Kemitraan" class="w-[1080px] outline-none">
            </form>
        </div>
    </div>
</template>

<!-- <script>
// Select MOU & NDA

// Date
export default {
  data() {
    return {
      showDatePicker: false,
      selectedDate: '',
      filterClickListener: null,
    };
  },
  MOUnted() {
    this.filterClickListener = (e) => {
        if (!e.target.closest('.drop-container') 
        ){
            isDropdownOpen.value = false;
        }
    };
    document.addEventListener('click', this.filterClickListener);
    }
};
</script> -->