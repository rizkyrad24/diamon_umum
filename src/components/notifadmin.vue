<!-- eslint-disable vue/multi-word-component-names -->

<template>
        <div class="w-[656px] h-auto absolute rounded-b-lg -translate-x-[620px] mt-8 bg-white">
            <LoadingComponent :isVisible="isLoading" />
            <ModalFailed
            :isVisible="modalFailed.isVisible"
            :title="modalFailed.title"
            :message="modalFailed.message"
            @close="closeModalFailed"
            />
            <div class="w-[656px] h-[76px] rounded-t-lg bg-[#E9F1FB] flex justify-between">
                <span class="text-xl font-semibold py-6 px-6">Notifikasi</span>
                <!-- <svg width="16" height="16" class="mt-[30px] mr-[30px] cursor-pointer" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L8 6.58579L12.2929 2.29289C12.6834 1.90237 13.3166 1.90237 13.7071 2.29289C14.0976 2.68342 14.0976 3.31658 13.7071 3.70711L9.41421 8L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L8 9.41421L3.70711 13.7071C3.31658 14.0976 2.68342 14.0976 2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929L6.58579 8L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill="#CCCCCC"/>
                </svg> -->
            </div>
            <div class="w-[656px] max-h-[300px] overflow-y-auto overflow-x-hidden border-[1px] rounded-b-lg p-4">
                <div v-for="(row, index) in notifList" :key="index" class="w-[608px] h-[90px] flex">
                    <div class="w-[170px] border-e-[3px] border-[#2671D9]">
                        <h1 class="text-[#667085] w-[90px] font-medium">{{ convertDatetime(row.dateOfUpdate) }}</h1>
                        <!-- <h1 class="text-[#667085] font-medium mt-2">10.24</h1> -->
                    </div>
                    <div class="px-7 w-[430px]">
                        <h1 class="text-[#2671D9] text-lg font-medium">{{ row.base }} {{ row.partnershipTitle }}</h1>
                        <p class="text-[#333333]">{{ row.content }}</p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchGet } from '@/api/apiFunction';
import { useRouter } from 'vue-router';
import LoadingComponent from './loading.vue';
import ModalFailed from '@/components/modalfailed.vue';
import { convertDatetime } from '@/utils/helper';

const router = useRouter();

const notifList = ref([]);
const isLoading = ref(false);
const modalFailed = ref({
  isVisible: false,
  title: '',
  message: ''
});

function closeModalFailed() {
  modalFailed.value = {
    isVisible: false,
    title: '',
    message: ''
  }
}

// api
async function getDataApi() {
    isLoading.value = true;
    const res = await fetchGet("history", null, router);
    if (res.status == 200) {
        console.log(res.data)
        notifList.value = res.data;
        isLoading.value = false;
    } else {
        isLoading.value = false;
        modalFailed.value = {
          isVisible: true,
          title: 'Gagal Ambil Data',
          message: res.data.message ? res.data.message : "Silahkan hubungi admin"
        }
    }
}

onMounted(() => {
    getDataApi();
})
</script>
