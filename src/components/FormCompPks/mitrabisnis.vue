<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import ModalFailed from '../modalfailed.vue';
import { fetchGet } from '@/api/apiFunction';
import SelectSearch from '../SelectSearch.vue';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

const candidateInput = ref('');
const selectedCandidate = ref(null);
const candidateList = ref([]);
const modalFailed = ref({
  isVisible: false,
  title: '',
  message: ''
});

watch(
  () => props.data,
  (newData) => {
    candidateInput.value = newData?.partnershipCandidate || "";
    selectedCandidate.value = { label: newData?.partnershipCandidate || "", value: newData?.partnershipCandidate || ""}
  },
  { immediate: true }
);

const closeModalFailed = () => {
  modalFailed.value = {
    isVisible: false,
    title: '',
    message: ''
  }
};

function handleChangeCandidate(option) {
  selectedCandidate.value = option;
  candidateInput.value = option.value;
  emit('partnershipCandidate', option.value);
}

// api
async function getDataCandidateApi() {
  let url = 'candidate';
  let params = null;
  const res = await fetchGet(url, params, router);
  if (res.status == 200) {
    console.log(res.data)
    const cleanData = res.data.map((item) => ({
      value: item.name,
      label: item.name,
    }))
    candidateList.value = cleanData;
  } else {
    modalFailed.value = {
      isVisible: true,
      title: 'Gagal Ambil Data',
      message: res.data.message ? res.data.message : "Silahkan hubungi admin"
    }
  }
}

onMounted(() => {
  getDataCandidateApi();
})

</script>

<template>
  <ModalFailed :isVisible="modalFailed.isVisible" :title="modalFailed.title" :message="modalFailed.message"
    @close="closeModalFailed" />
  <div :class="!props.isDisplay ? 'hidden' : ''">
    <h1 class="text-xl text-[#333333] font-medium pl-4 py-6">Daftar Mitra Bisnis</h1>
    <div class="w-[1217px] h-auto flex justify-between">
      <!-- Calon Mitra Bisnis -->
      <div class="ml-4">
        <label class="text-[#4D5E80] font-medium">Calon Mitra Bisnis <span class="text-[#FF5656]">*</span></label>
        <div class="w-[560px] mt-2 drop-container">
          <SelectSearch
            :options="candidateList"
            placeholder="Pilih candidate..."
            :initialValue="selectedCandidate"
            @change="handleChangeCandidate"
          />
        </div>
      </div>
    </div>
  </div>
</template>