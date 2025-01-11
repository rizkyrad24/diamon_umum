<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="!props.isDisplay? 'hidden': ''">
    <h1 class="text-xl text-[#333333] font-medium pl-4 py-4">Lingkup Pekerjaan</h1>
    <div class="w-[1220px] h-auto"> 
        <!-- Start Lingkup -->
        <div class="container">
            <div class="template" id="template-1">
                <div v-for="(row, index) in listData" :key="index + 1" class="py-2 flex ml-1">
                    <div class="w-[20px] h-[50] bg-[#2671D9] text-white py-3 px-3 rounded-s-lg text-xs font-semibold">{{ index + 1 }}</div>
                    <div class="w-[1070px] h-[48px] border-[1px] rounded-e-lg py-2 px-3">
                        <input :value="row.scopeName" @input="onLingkupChange(row.key, $event.target.value)" class="mt-1 w-full outline-none input-pos-2" type="text" :placeholder="'Lingkup Pekerjaan ' +  (index+1)">    
                    </div> 
                        <svg @click="deleteLingkup(row.key)" width="14" height="18" class="ml-[26px] mt-[15px] cursor-pointer delete-icon" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.4375C6.59126 2.4375 6.18408 2.44404 5.77854 2.45701C5.35446 2.47058 4.99738 2.8011 4.9443 3.24405C5.62483 3.20651 6.31024 3.1875 7 3.1875C7.68977 3.1875 8.37517 3.20651 9.0557 3.24405C9.00262 2.8011 8.64554 2.47058 8.22146 2.45701C7.81593 2.44404 7.40874 2.4375 7 2.4375ZM10.5625 3.35801C10.5622 2.08865 9.57742 0.999618 8.26942 0.957776C7.84791 0.944292 7.42473 0.9375 7 0.9375C6.57527 0.9375 6.15209 0.944292 5.73058 0.957776C4.42258 0.999618 3.43783 2.08865 3.4375 3.35801C2.77551 3.42171 2.11861 3.50297 1.46727 3.60134C1.20543 3.64088 0.944495 3.68318 0.68449 3.72822C0.276354 3.79892 0.00280748 4.18709 0.0735059 4.59523C0.141511 4.98781 0.503257 5.25587 0.893962 5.21281L1.63236 14.8119C1.73004 16.0819 2.789 17.0625 4.06268 17.0625H9.93732C11.211 17.0625 12.27 16.0819 12.3676 14.8119L13.106 5.21281C13.4967 5.25587 13.8585 4.98781 13.9265 4.59523C13.9972 4.18709 13.7236 3.79892 13.3155 3.72822C13.0555 3.68318 12.7946 3.64088 12.5327 3.60134C11.8814 3.50297 11.2245 3.42171 10.5625 3.35801ZM11.619 4.98731C11.0025 4.90665 10.3809 4.8419 9.75472 4.79351C8.84584 4.72328 7.92717 4.6875 7 4.6875C6.07283 4.6875 5.15416 4.72328 4.24528  4.79351C3.6191 4.8419 2.99755 4.90665 2.38105 4.98731L3.12794 14.6969C3.16551 15.1853 3.5728 15.5625 4.06268 15.5625H9.93732C10.4272 15.5625 10.8345 15.1853 10.8721 14.6969L11.619 4.98731ZM4.91589 6.00055C5.32979 5.98463 5.67824 6.30727 5.69416 6.72118L5.95377 13.4712C5.96969 13.8851 5.64706 14.2335 5.23315 14.2494C4.81924 14.2654 4.4708 13.9427 4.45488 13.5288L4.19527 6.77882C4.17935 6.36492 4.50198 6.01647 4.91589 6.00055ZM9.08411 6.00055C9.49802 6.01647 9.82065 6.36492 9.80474 6.77882L9.54512 13.5288C9.5292 13.9427 9.18076 14.2654 8.76685 14.2494C8.35294 14.2335 8.03031 13.8851 8.04623 13.4712L8.30584 6.72118C8.32176 6.30727 8.67021 5.98463 9.08411 6.00055Z" fill="#FF5656"/>
                        </svg>
                </div>
            </div>
        </div>
    </div>
    <!-- End lingkup -->
    
    <button @click="addLingkup" id="add-button" class="w-[235px] flex mt-3 ml-4 pl-4 border-[1px] border-[#2671D9] py-3 rounded-lg cursor-pointer hover:bg-[#E9F1FB] hover:border-none">
        <svg width="14" height="14" class="mt-1" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0.875C7.48325 0.875 7.875 1.26675 7.875 1.75V6.125H12.25C12.7332 6.125 13.125 6.51675 13.125 7C13.125 7.48325 12.7332 7.875 12.25 7.875H7.875V12.25C7.875 12.7332 7.48325 13.125 7 13.125C6.51675 13.125 6.125 12.7332 6.125 12.25V7.875H1.75C1.26675 7.875 0.875 7.48325 0.875 7C0.875 6.51675 1.26675 6.125 1.75 6.125H6.125V1.75C6.125 1.26675 6.51675 0.875 7 0.875Z" fill="#2671D9"/>
        </svg>
        <span class="text-sm font-medium text-[#2671D9] ml-3">Tambah Lingkup Pekerjaan</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getNewKey } from '@/utils/helper';
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
const emit = defineEmits(['mainList', 'listDeleted'])
const listData = ref([]);
const listDelete = ref([]);

function onLingkupChange (key, newData) {
    const index = listData.value.findIndex(row => row.key === key);
  if (index !== -1) {
    // Merge existing object with new data
    listData.value[index] = { ...listData.value[index], scopeName: newData };
    emit("mainList", listData.value)
  } else {
    console.error(`Data with ID ${key} not found.`);
  }
}

function addLingkup () {
  listData.value = [...listData.value, {
    id: null,
    scopeName: '',
    key: getNewKey(listData.value)
  }];
  console.log(listData.value)
}

function deleteLingkup (key) {
  const index = listData.value.findIndex(row => row.key === key);
  if (index !== -1) {
    const newList = [...listDelete.value, listData.value[index].id];
    listDelete.value = newList;
    emit('listDeleted', newList)
    listData.value.splice(index, 1); // Remove the item at the found index
    emit('mainList', listData.value);
  } else {
    console.error(`Data with key ${key} not found.`);
  }
}

watch(
  () => props.data, 
  (newData) => {
    listData.value = newData?.scopesMou?.map((item, index) => ({...item, key: index})) || [];
  },
  { immediate: true }
);
</script>