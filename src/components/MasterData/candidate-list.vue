<template>
  <div v-if="showFormPopup" class="fixed inset-0 flex items-center justify-center bg-[#1F2937] bg-opacity-50">
    <div class="w-[684.92px] rounded-lg shadow-lg bg-[#FFFFFF] border-collapse pb-12">
      <button @click="closePopup"
        class="text-[#2671D9] w-[14px] h-[14px] absolute mt-[25px] ml-[650px] text-[20px]">&times;</button>
      <h1 class="font-sans text-[30px] text-center text-[#333333] mt-6 ml-[5px] font-semibold">Form Candidate</h1>
      <div class="w-full overflow-y-auto px-10 pb-5">
        <div v-if="[1, 2].includes(formType)" class="mb-4">
          <label class="text-[#4D5E80] font-medium">Nama <span class="text-[#FF5656]">*</span></label>
          <form action="" class="w-full py-[10px] px-4 mt-2 border-[1px] rounded-lg text-sm flex justify-between">
            <input v-model="name" type="text" placeholder="Nama..." class="w-full outline-none">
          </form>
        </div>
        <div class="flex justify-center mt-8">
          <button v-if="formType == 1" :class="{
            'bg-[#2671D9] hover:bg-[#1E5BB7] text-[#FFFFFF]': isSendAvaible,
            'bg-[#cfd6df] text-[black]': !isSendAvaible
          }" :disabled="!isSendAvaible" @click="SendCreateCandidate"
            class="p-3 flex justify-center w-full rounded-lg border-[1px] text-[16px] text-center font-sans font-semibold">
            Buat Candidate
          </button>
          <button v-if="formType == 2" :class="{
            'bg-[#2671D9] hover:bg-[#1E5BB7] text-[#FFFFFF]': isSendEditAvaible,
            'bg-[#cfd6df] text-[black]': !isSendEditAvaible
          }" :disabled="!isSendEditAvaible" @click="SendEditCandidate"
            class="p-3 flex justify-center w-full rounded-lg border-[1px] text-[16px] text-center font-sans font-semibold">
            Edit Candidate
          </button>
        </div>
      </div>
    </div>
  </div>
  <Loading :isVisible="isLoading" />
  <ModalFailed :isVisible="modalFailed.isVisible" :title="modalFailed.title" :message="modalFailed.message"
    @close="closeModalFailed" />
  <ModalSuccess :isVisible="modalSuccess.isVisible" :title="modalSuccess.title" :message="modalSuccess.message"
    @close="modalSuccess.closeFunction" />
  <ModalDialog :isVisible="modalDialog.isVisible" :title="modalDialog.title" :message="modalDialog.message"
    @close="modalDialog.closeFunction" @ok="modalDialog.okFunction" />
  <div class="px-4 py-3">
    <div class="h-auto w-[1086px] rounded-lg bg-[#FFFFFF] border-collapse mx-auto">
      <div class="flex">
        <h1 class="mt-[20px] ms-8 text-[30px] font-sans text-[#4D5E80] font-bold">Master Candidate</h1>
      </div>
      <div>
        <div class="flex items-start">
          <div
            class="w-[320px] h-[40px] rounded-lg bg-[#FFFFFF] border border-[#E5E7E9] mt-6 ml-4 flex justify-between items-center">
            <input type="text" placeholder="Cari sesuatu disini ..." v-model="searchQuery"
              class="font-sans text-[14px] text-[#7F7F80] font-extralight ml-4 outline-none w-full" />
            <button class="bg-[#2671D9] w-[40px] h-full flex items-center justify-center rounded-r-lg">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.00016 1.66634C3.60693 1.66634 1.66683 3.60644 1.66683 5.99967C1.66683 8.39291 3.60693 10.333 6.00016 10.333C7.19696 10.333 8.27938 9.84871 9.06429 9.0638C9.8492 8.27889 10.3335 7.19648 10.3335 5.99967C10.3335 3.60644 8.3934 1.66634 6.00016 1.66634ZM0.333496 5.99967C0.333496 2.87006 2.87055 0.333008 6.00016 0.333008C9.12978 0.333008 11.6668 2.87006 11.6668 5.99967C11.6668 7.32398 11.2119 8.54294 10.4508 9.50751L13.4716 12.5283C13.7319 12.7886 13.7319 13.2107 13.4716 13.4711C13.2112 13.7314 12.7891 13.7314 12.5288 13.4711L9.508 10.4503C8.54343 11.2114 7.32447 11.6663 6.00016 11.6663C2.87055 11.6663 0.333496 9.12929 0.333496 5.99967Z"
                  fill="white" />
              </svg>
            </button>
          </div>
          <div class="filter-container" ref="filterContainer">
            <button @click="toggleDropdown" class="flex">
              <div
                class="flex items-center justify-center w-[90px] h-[40px] rounded-lg bg-[#FFFFFF] border border-[#E5E7E9] ml-2 mt-6 hover:bg-[#DBEAFE] cursor-pointer transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.6668 0.333252H2.3335C1.80306 0.333252 1.29436 0.543966 0.919283 0.919038C0.54421 1.29411 0.333496 1.80282 0.333496 2.33325V3.11325C0.333401 3.38855 0.39014 3.6609 0.500163 3.91325V3.95325C0.594349 4.16723 0.727758 4.36169 0.893496 4.52659L5.00016 8.60658V12.9999C4.99994 13.1132 5.02859 13.2247 5.08341 13.3238C5.13823 13.423 5.21742 13.5065 5.3135 13.5666C5.41959 13.6323 5.54201 13.667 5.66683 13.6666C5.77119 13.666 5.87395 13.6408 5.96683 13.5933L8.6335 12.2599C8.74344 12.2045 8.83589 12.1198 8.90061 12.015C8.96533 11.9103 8.99979 11.7897 9.00016 11.6666V8.60658L13.0802 4.52659C13.2459 4.36169 13.3793 4.16723 13.4735 3.95325V3.91325C13.5927 3.66287 13.6585 3.39044 13.6668 3.11325V2.33325C13.6668 1.80282 13.4561 1.29411 13.081 0.919038C12.706 0.543966 12.1973 0.333252 11.6668 0.333252ZM7.86016 7.85992C7.79838 7.92221 7.74949 7.99609 7.71632 8.07731C7.68314 8.15854 7.66632 8.24551 7.66683 8.33325V11.2533L6.3335 11.9199V8.33325C6.334 8.24551 6.31719 8.15854 6.28401 8.07731C6.25083 7.99609 6.20195 7.92221 6.14016 7.85992L2.60683 4.33325H11.3935L7.86016 7.85992ZM12.3335 2.99992H1.66683V2.33325C1.66683 2.15644 1.73707 1.98687 1.86209 1.86185C1.98712 1.73682 2.15669 1.66659 2.3335 1.66659H11.6668C11.8436 1.66659 12.0132 1.73682 12.1382 1.86185C12.2633 1.98687 12.3335 2.15644 12.3335 2.33325V2.99992Z"
                    fill="#2671D9" />
                </svg>
                <span class="text-[14px] font-sans font-medium text-[#333333] ml-2">Filter</span>
              </div>
            </button>
            <div v-if="showDropdown"
              class="dropdown-options bg-white mt-[1px] rounded-bl-lg rounded-br-lg ml-2 shadow-md absolute z-50">
              <div v-for="(option, index) in filterOptions" :key="index"
                class="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-[#DBEAFE]"
                @click="selectOption(option)">
                <span>{{ option.name }}</span>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.20711 5.29289C7.59763 5.68342 7.59763 6.31658 7.20711 6.70711L2.20711 11.7071C1.81658 12.0976 1.18342 12.0976 0.792892 11.7071C0.402369 11.3166 0.402369 10.6834 0.792892 10.2929L5.08579 6L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893C1.18342 -0.0976314 1.81658 -0.0976313 2.20711 0.292893L7.20711 5.29289Z"
                    fill="#2671D9" />
                </svg>
              </div>
              <div v-if="selectedOption && selectedOption.subOptions"
                class="sub-options bg-white mt-[1px] rounded-bl-lg rounded-br-lg ml-4 shadow-md absolute z-50">
                <div v-for="(subOption, index) in selectedOption.subOptions" :key="index"
                  class="sub-option-item flex items-center p-2 border-b cursor-pointer hover:bg-[#DBEAFE]">
                  <input type="checkbox" v-model="selectedSubOptions" :value="subOption" class="mr-2" />
                  <span>{{ subOption }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div v-if="selectedSubOptions.length" class="flex mt-2 ml-4 w-[1046px] h-[44px] border-[1px] rounded-lg">
            <div v-for="(subOption, index) in selectedSubOptions" :key="index"
              class="flex items-center w-relative h-[24px] bg-[#E9F1FB] border-[#BAD1F3] border-[1px] font-semibold text-[#2671D9] text-[12px] rounded-xl px-2 py-1 mt-[10px] ml-4">
              <span>{{ subOption }}</span>
              <button @click="removeSubOption(subOption)" class="ml-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 4.586L10.95 9.536 9.536 10.95 4.586 6 9.536 1.05 10.95 2.464 6 7.414 1.05 2.464 2.464 1.05 7.414 6 2.464 10.95 1.05 9.536 6 4.586Z"
                    fill="#2671D9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button @click="showFormCreate"
        class="bg-[#2671D9] hover:bg-[#1E5BB7] text-[#FFFFFF] py-2 px-4 me-6 flex justify-center justify-self-end rounded-lg border-[1px] text-[12px] text-center font-sans font-semibold">
        Tambah Candidate
      </button>
      <div class="flex">
        <div class="flex w-[1046px] rounded-lg bg-[#FFFFFF] border-[1px] border-[#E5E7E9] mt-4 ml-4 mr-4 overflow-auto">
          <table class="table-auto w-full text-left border-collapse border border-[#E5E7E9]">
            <thead>
              <tr class="bg-[#FFFFFF] text-[12px] font-sans text-[#4D5E80] font-semibold">
                <th class="p-2 border w-[50px] border-[#E5E7E9]">
                  <div class="flex items-center justify-between">
                    <span>No.</span>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.4252 0.144043C10.7073 0.144043 10.9359 0.364674 10.9359 0.636836L10.9359 8.3174L13.1282 6.20189C13.3276 6.00944 13.651 6.00944 13.8504 6.20189C14.0499 6.39434 14.0499 6.70636 13.8504 6.89881L10.7863 9.85556C10.6906 9.94798 10.5607 9.9999 10.4252 9.9999C10.2898 9.9999 10.1599 9.94798 10.0641 9.85556L7.00001 6.89881C6.80057 6.70636 6.80057 6.39434 7.00001 6.20189C7.19944 6.00944 7.52279 6.00944 7.72223 6.20189L9.91454 8.3174L9.91454 0.636836C9.91454 0.364674 10.1432 0.144043 10.4252 0.144043Z"
                        fill="#93B8EC" />
                      <path
                        d="M3.21369 0.144824C3.41312 -0.0476236 3.73647 -0.0476236 3.9359 0.144824L7.00001 3.10158C7.19945 3.29403 7.19945 3.60605 7.00001 3.79849C6.80058 3.99094 6.47723 3.99094 6.27779 3.79849L4.08548 1.68299V9.36355C4.08548 9.63571 3.85684 9.85634 3.57479 9.85634C3.29275 9.85634 3.06411 9.63571 3.06411 9.36355V1.68299L0.871794 3.79849C0.672359 3.99094 0.349011 3.99094 0.149576 3.79849C-0.0498587 3.60605 -0.0498587 3.29403 0.149576 3.10158L3.21369 0.144824Z"
                        fill="#93B8EC" />
                    </svg>
                  </div>
                </th>
                <th class="p-2 border w-auto border-[#E5E7E9]">
                  <div class="flex items-center justify-between">
                    <span>Nama Candidate</span>
                    <svg @click="sortTable('pic')" width="14" height="10" viewBox="0 0 14 10" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.4252 0.144043C10.7073 0.144043 10.9359 0.364674 10.9359 0.636836L10.9359 8.3174L13.1282 6.20189C13.3276 6.00944 13.651 6.00944 13.8504 6.20189C14.0499 6.39434 14.0499 6.70636 13.8504 6.89881L10.7863 9.85556C10.6906 9.94798 10.5607 9.9999 10.4252 9.9999C10.2898 9.9999 10.1599 9.94798 10.0641 9.85556L7.00001 6.89881C6.80057 6.70636 6.80057 6.39434 7.00001 6.20189C7.19944 6.00944 7.52279 6.00944 7.72223 6.20189L9.91454 8.3174L9.91454 0.636836C9.91454 0.364674 10.1432 0.144043 10.4252 0.144043Z"
                        fill="#93B8EC" />
                      <path
                        d="M3.21369 0.144824C3.41312 -0.0476236 3.73647 -0.0476236 3.9359 0.144824L7.00001 3.10158C7.19945 3.29403 7.19945 3.60605 7.00001 3.79849C6.80058 3.99094 6.47723 3.99094 6.27779 3.79849L4.08548 1.68299V9.36355C4.08548 9.63571 3.85684 9.85634 3.57479 9.85634C3.29275 9.85634 3.06411 9.63571 3.06411 9.36355V1.68299L0.871794 3.79849C0.672359 3.99094 0.349011 3.99094 0.149576 3.79849C-0.0498587 3.60605 -0.0498587 3.29403 0.149576 3.10158L3.21369 0.144824Z"
                        fill="#93B8EC" />
                    </svg>
                  </div>
                </th>
                <th class="p-2 border w-[50px] border-[#E5E7E9]"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredAndPaginatedData" :key="`${index}-${item.name}`"
                class="bg-[#FFFFFF] border border-[#E5E7E9] text-[12px] text-[#4D5E80] font-sans font-semibold">
                <td class="p-2 py-2 border border-[#E5E7E9]">{{ (currentPage - 1) * selectedValue +
                  index + 1 }}</td>
                <td class="p-2 py-2 border border-[#E5E7E9]">{{ item.name }}</td>
                <td class="p-2 py-2 border border-[#E5E7E9] relative">
                  <button @click.stop="toggleActionDropdown(index)"
                    class="flex items-center justify-center w-[24px] h-[24px] rounded-lg bg-[#E5E7E9]">
                    <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1.8125C0.91712 1.8125 0.837634 1.77958 0.779029 1.72097C0.720424 1.66237 0.6875 1.58288 0.6875 1.5C0.6875 1.41712 0.720424 1.33763 0.779029 1.27903C0.837634 1.22042 0.91712 1.1875 1 1.1875C1.08288 1.1875 1.16237 1.22042 1.22097 1.27903C1.27958 1.33763 1.3125 1.41712 1.3125 1.5C1.3125 1.58288 1.27958 1.66237 1.22097 1.72097C1.16237 1.77958 1.08288 1.8125 1 1.8125ZM1 4.3125C0.91712 4.3125 0.837634 4.27958 0.779029 4.22097C0.720424 4.16237 0.6875 4.08288 0.6875 4C0.6875 3.91712 0.720424 3.83763 0.779029 3.77903C0.837634 3.72042 0.91712 3.6875 1 3.6875C1.08288 3.6875 1.16237 3.72042 1.22097 3.77903C1.27958 3.83763 1.3125 3.91712 1.3125 4C1.3125 4.08288 1.27958 4.16237 1.22097 4.22097C1.16237 4.27958 1.08288 4.3125 1 4.3125ZM1 6.8125C0.91712 6.8125 0.837634 6.77958 0.779029 6.72097C0.720424 6.66237 0.6875 6.58288 0.6875 6.5C0.6875 6.41712 0.720424 6.33763 0.779029 6.27903C0.837634 6.22042 0.91712 6.1875 1 6.1875C1.08288 6.1875 1.16237 6.22042 1.22097 6.27903C1.27958 6.33763 1.3125 6.41712 1.3125 6.5C1.3125 6.58288 1.27958 6.66237 1.22097 6.72097C1.16237 6.77958 1.08288 6.8125 1 6.8125Z"
                        stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <div v-if="actionDropdownIndex === index"
                    class="absolute right-0 mt-2 w-[160px] rounded-lg bg-[#FFFFFF] border border-[#E5E7E9] shadow-lg z-10">
                    <button @click="showFormEdit(item)"
                      class="block w-full flex-grow px-4 py-2 text-[14px] font-sans font-normal text-[#333333] text-left hover:bg-[#DBEAFE]">Edit</button>
                    <button @click="SendDeleteCandidate(item.id)"
                      class="block w-full flex-grow px-4 py-2 text-[14px] font-sans font-normal text-[#333333] text-left hover:bg-[#DBEAFE]">Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center text-[14px] font-sans font-normal">
          <span>Menampilkan</span>
          <select class="ml-2 p-1 border border-[#E5E7E9] rounded-md" v-model="selectedValue">
            <option v-for="value in displayOptions" :key="value" :value="value">{{ value }}</option>
          </select>
          <span class="ml-2">dari <b>{{ totalData }}</b> Data</span>
        </div>
        <div class="flex items-center rounded-lg border-transparent text-[14px] font-sans font-normal border-[#FFFFFF]">
          <button class="pagination-btn" :disabled="currentPage === 1" @click="prevPage">‹</button>
          <button v-for="page in pages" :key="page" :class="['pagination-btn', { active: currentPage === page }]"
            @click="setPage(page)">
            {{ page }}
          </button>
          <button class="pagination-btn" :disabled="currentPage === totalPages" @click="nextPage">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGet, fetchPostForm, fetchPutForm, fetchDelete } from '@/api/apiFunction';
import Loading from '../loading.vue';
import ModalFailed from '../modalfailed.vue';
import ModalSuccess from '../modalsuccess.vue';
import ModalDialog from '../modaldialog.vue';

export default {
  name: "CandidateData",
  components: {
    Loading,
    ModalFailed,
    ModalSuccess,
    ModalDialog
  },
  data() {
    return {

      showDropdown: false,
      selectedOption: null,
      selectedSubOptions: [],
      filterOptions: [],
      // filterOptions: [
      //   { name: "Role", subOptions: ["Staff", "Manager", "VP", "Admin", "PartnershipStaff", "PartnershipManager", "PartnershipVP", "PartnershipDirector"] },
      //   { name: "Aktif", subOptions: ["Aktif", "Tidak Aktif"] },
      // ],

      selectedValue: 8,
      currentPage: 1,
      displayOptions: [8, 16, 25],
      actionDropdownIndex: null,
      searchQuery: "",

      modalFailed: {
        isVisible: false,
        title: '',
        message: ''
      },
      modalSuccess: {
        isVisible: false,
        title: '',
        message: '',
        closeFunction: () => null
      },
      modalDialog: {
        isVisible: false,
        title: '',
        message: '',
        okFunction: () => null,
        closeFunction: () => null
      },

      isLoading: false,
      summaryData: null,
      totalDataPengajuan: 0,
      showFormPopup: false,

      CandidateId: null,
      name: "",
      formType: null, // 1 = create, 2 = edit, 3 = reset password

      tableData: [],
      sortOrder: "asc",
    };
  },
  computed: {
    totalData() {
      return this.tableData.length;
    },
    totalPages() {
      return Math.ceil(this.totalData / this.selectedValue);
    },
    pages() {
      let pagesArray = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.selectedValue; // Calculate starting index
      const end = start + this.selectedValue; // Calculate ending index
      return this.filteredTableData.slice(start, end); // Slice the filtered data based on the current page
    },
    filteredAndPaginatedData() {
      let filteredData = this.tableData;
      // Filter berdasarkan opsi terpilih (selectedSubOptions)
      if (this.selectedSubOptions.length) {
        filteredData = filteredData.filter((item) => {
          return this.selectedSubOptions.some((option) => {
            // Filter untuk role
            if (this.filterOptions[0].subOptions.includes(option)) {
              return item.name == option;
            }
            // // Filter untuk aktif
            // if (option === "Aktif") {
            //   return item.is_active;
            // } else if (option === "Tidak Aktif") {
            //   return !item.is_active;
            // }
          });
        });
      }
      // Filter berdasarkan input pencarian (searchQuery)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredData = filteredData.filter((item) => {
          return (
            item.name.toLowerCase().includes(query)
          );
        });
      }
      const start = (this.currentPage - 1) * this.selectedValue; // Calculate starting index
      const end = start + this.selectedValue; // Calculate ending index
      return filteredData.slice(start, end);
    },
    isSendAvaible() {
      return (
        this.name != ""
      )
    },
    isSendEditAvaible() {
      return (
        this.name != "" && this.CandidateId
      )
    },
  },
  methods: {
    closeModalFailed() {
      this.modalFailed = {
        isVisible: false,
        title: '',
        message: ''
      }
    },
    closeModalSuccess() {
      this.modalSuccess = {
        isVisible: false,
        title: '',
        message: '',
        closeFunction: () => null
      }
    },
    closeModalDialog() {
      this.modalDialog = {
        isVisible: false,
        title: '',
        message: '',
        okFunction: () => null,
        closeFunction: () => null
      }
    },
    clearFormData() {
      this.CandidateId = null;
      this.name = "";
      this.formType = null;
    },
    closePopup() {
      this.showFormPopup = false;
      this.clearFormData();
    },
    showFormCreate() {
      this.clearFormData();
      this.formType = 1;
      this.showFormPopup = true;
    },
    showFormEdit(data) {
      this.CandidateId = data.id;
      this.name = data.name;
      this.formType = 2;
      this.showFormPopup = true;
    },
    sortTable(columnName) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";

      this.tableData.sort((a, b) => {
        const aValue = a[columnName] != null ? a[columnName] : "";
        const bValue = b[columnName] != null ? b[columnName] : "";

        // Jika keduanya adalah angka, lakukan sorting numerik
        if (!isNaN(aValue) && !isNaN(bValue)) {
          if (this.sortOrder === "asc") {
            return aValue - bValue; // Urutkan dari kecil ke besar
          } else {
            return bValue - aValue; // Urutkan dari besar ke kecil
          }
        }

        // Jika bukan angka, lakukan sorting string
        const aStr = aValue.toString().toLowerCase();
        const bStr = bValue.toString().toLowerCase();

        if (this.sortOrder === "asc") {
          return aStr.localeCompare(bStr); // Urutkan A-Z
        } else {
          return bStr.localeCompare(aStr); // Urutkan Z-A
        }
      });
    },
    closeDuedatePopUp() {
      this.DuedatePopUp = false;
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
      if (this.showDatePicker) {
        this.$nextTick(() => {
          this.$refs.datePickerInput.focus();
        });
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    updateDate(event) {
      this.selectedDate = event.target.value;
      this.hideDatePicker();
    },
    hideDatePicker() {
      this.showDatePicker = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    selectOption(option) {
      if (this.selectedOption === option) {
        this.selectedOption = null;
      } else {
        this.selectedOption = option;
      }
    },
    removeSubOption(subOption) {
      this.selectedSubOptions = this.selectedSubOptions.filter((item) => item !== subOption);
    },
    setPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    handleClickOutside(event) {
      const datePickerContainer = this.$refs.datePickerContainer;
      const datePickerButton = this.$refs.datePickerButton;
      const datePickerInput = this.$refs.datePickerInput;
      const filterContainer = this.$refs.filterContainer;

      if (datePickerContainer && !datePickerContainer.contains(event.target)) {
        this.hideDatePicker();
      }

      if (datePickerButton && !datePickerButton.contains(event.target) && datePickerInput && !datePickerInput.contains(event.target)) {
        this.hideDatePicker();
      }

      if (filterContainer && !filterContainer.contains(event.target)) {
        this.showDropdown = false;
        this.selectedOption = null;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    toggleActionDropdown(index) {
      if (this.actionDropdownIndex === index) {
        this.actionDropdownIndex = null; // Menutup dropdown jika sudah dibuka
      } else {
        this.actionDropdownIndex = index; // Membuka dropdown secara spesifik
      }
      this.$nextTick(() => {
        document.addEventListener('click', this.closeDropdown);
      });
    },

    // Popup Create
    SendCreateCandidate() {
      this.modalDialog = {
        isVisible: true,
        title: 'Buat Candidate Baru',
        message: 'Apakan anda yakin dengan data yang anda masukan',
        okFunction: this.openCreateCandidate,
        closeFunction: this.closeCreateCandidate
      }
    },
    openCreateCandidate() {
      this.closeModalDialog();
      this.postCreateCandidate(this.successCreateCandidate, this.failCreateCandidate);
    },
    closeCreateCandidate() {
      this.closeModalDialog()
    },
    successCreateCandidate() {
      this.modalSuccess = {
        isVisible: true,
        title: 'Success',
        message: 'Berhasil membuat Candidate baru',
        closeFunction: this.closeSelesaiCreateCandidate
      }
    },
    failCreateCandidate(data) {
      this.modalFailed = {
        isVisible: true,
        title: 'Gagal',
        message: data?.message ? data.message : "Silahkan hubungi admin"
      }
    },
    closeSelesaiCreateCandidate() {
      this.showFormPopup = false;
      this.clearFormData();
      this.closeModalSuccess();
      this.getDataApi()
    },

    // Popup Edit
    SendEditCandidate() {
      this.modalDialog = {
        isVisible: true,
        title: 'Edit Candidate',
        message: 'Apakan anda yakin dengan data yang anda masukan',
        okFunction: this.openEditCandidate,
        closeFunction: this.closeEditCandidate
      }
    },
    openEditCandidate() {
      this.closeModalDialog();
      this.postEditCandidate(this.successEditCandidate, this.failEditCandidate);
    },
    closeEditCandidate() {
      this.closeModalDialog()
    },
    successEditCandidate() {
      this.modalSuccess = {
        isVisible: true,
        title: 'Success',
        message: 'Berhasil mengedit Candidate',
        closeFunction: this.closeSelesaiEditCandidate
      }
    },
    failEditCandidate(data) {
      this.modalFailed = {
        isVisible: true,
        title: 'Gagal',
        message: data?.message ? data.message : "Silahkan hubungi admin"
      }
    },
    closeSelesaiEditCandidate() {
      this.showFormPopup = false;
      this.clearFormData();
      this.closeModalSuccess();
      this.getDataApi()
    },

    // Popup Delete Candidate
    SendDeleteCandidate(id) {
      this.CandidateId = id
      this.modalDialog = {
        isVisible: true,
        title: 'Hapus Candidate',
        message: 'Apakan anda yakin menghapus Candidate ini',
        okFunction: this.openDeleteCandidate,
        closeFunction: this.closeDeleteCandidate
      }
    },
    openDeleteCandidate() {
      this.closeModalDialog();
      this.postDeleteCandidate(this.successDeleteCandidate, this.failDeleteCandidate);
    },
    closeDeleteCandidate() {
      this.closeModalDialog()
    },
    successDeleteCandidate() {
      this.modalSuccess = {
        isVisible: true,
        title: 'Success',
        message: 'Berhasil menghapus Candidate',
        closeFunction: this.closeSelesaiDeleteCandidate
      }
    },
    failDeleteCandidate(data) {
      this.modalFailed = {
        isVisible: true,
        title: 'Gagal',
        message: data?.message ? data.message : "Silahkan hubungi admin"
      }
    },
    closeSelesaiDeleteCandidate() {
      this.clearFormData();
      this.closeModalSuccess();
      this.getDataApi();
    },

    // api
    async getDataApi() {
      this.isLoading = true;
      let url = 'candidate';
      let params = null;
      const res = await fetchGet(url, params, this.$router);
      if (res.status == 200) {
        const cleanData = res.data.map((item) => ({
          id: item.id,
          name: item.name,
        }))
        this.tableData = cleanData;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.modalFailed = {
          isVisible: true,
          title: 'Gagal Ambil Data',
          message: res.data.message ? res.data.message : "Silahkan hubungi admin"
        }
      }
    },
    async postCreateCandidate(successFunction, failFunction) {
      this.isLoading = true;
      const form = new FormData()
      form.append('name', this.name);
      // Display the values
      // for (var pair of form.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      const res = await fetchPostForm('candidate', null, form, this.$router);
      if (res.status == 201) {
        this.isLoading = false;
        successFunction();
      } else {
        this.isLoading = false;
        failFunction();
      }
    },
    async postEditCandidate(successFunction, failFunction) {
      this.isLoading = true;
      const form = new FormData()
      form.append('name', this.name);
      // Display the values
      // for (var pair of form.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      const res = await fetchPutForm(`candidate/${this.CandidateId}`, null, form, this.$router);
      if (res.status == 201) {
        this.isLoading = false;
        successFunction();
      } else {
        this.isLoading = false;
        failFunction();
      }
    },
    async postDeleteCandidate(successFunction, failFunction) {
      this.isLoading = true;
      const res = await fetchDelete(`candidate/${this.CandidateId}`, null, this.$router);
      if (res.status == 200) {
        this.isLoading = false;
        successFunction();
      } else {
        this.isLoading = false;
        failFunction();
      }
    },
  },
  mounted() {
    this.getDataApi();
  }
};
</script>

<style>
.background-container {
  width: 100vw;
  /* Full screen width */
  height: 100vh;
  /* Full screen height */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none"><g opacity="0.5"><circle cx="26" cy="26" r="42" fill="#FFA229" /><path fill-rule="evenodd" clip-rule="evenodd" d="M28.5257 10.5491C27.4033 8.60363 24.5954 8.60363 23.473 10.5491L6.31289 40.2933C5.1911 42.2378 6.59443 44.6675 8.83927 44.6675H43.1595C45.4043 44.6675 46.8076 42.2378 45.6858 40.2933L28.5257 10.5491ZM19.4308 8.21711C22.3491 3.15875 29.6497 3.15875 32.5679 8.21711L49.728 37.9613C52.6447 43.0168 48.996 49.3342 43.1595 49.3342H8.83927C3.00269 49.3342 -0.645972 43.0168 2.27069 37.9613L19.4308 8.21711ZM25.9994 20.1675C27.288 20.1675 28.3327 21.2122 28.3327 22.5008V31.2508C28.3327 32.5395 27.288 33.5842 25.9994 33.5842C24.7107 33.5842 23.666 32.5395 23.666 31.2508V22.5008C23.666 21.2122 24.7107 20.1675 25.9994 20.1675ZM23.666 38.2508C23.666 36.9622 24.7107 35.9175 25.9994 35.9175H26.0169C27.3055 35.9175 28.3502 36.9622 28.3502 38.2508V38.2683C28.3502 39.557 27.3055 40.6017 26.0169 40.6017H25.9994C24.7107 40.6017 23.666 39.557 23.666 38.2683V38.2508Z" fill="white"/></g></svg>');
  background-size: cover;
  /* Adjust background size */
  background-position: center;
  /* Center the background */
  background-repeat: no-repeat;
  /* Do not repeat the background */
}

.doughnut-chart {
  width: 70px !important;
  height: 60px !important;
  margin-left: 10px;
}

.chart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 10px;
}

.chart-circle {
  position: relative;
  width: 70px;
  height: 70px;
  font-family: sans-serif;
}

.chart-circle svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.chart-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.chart-text .value {
  font-size: 10px;
  font-weight: bold;
  color: #000000 !important;
}

.chart-text .total {
  font-size: 8px;
  font-weight: normal;
  color: #7f7f80 !important;
  margin-left: 1px;
}

.circle-bg {
  transition: stroke-width 0.35s;
}

.progress-circle {
  transition: stroke-dashoffset 1s ease-out, transform 0.3s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-linecap: round;
}

.chart-container {
  width: 628px;
  height: 236px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

.blue-box {
  background-color: #2671d9;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.bg-wave {
  width: 346px;
  height: 416px;
  gap: 0px;
  background-image: url("/src/assets/image/Wave.png ");
  background-repeat: no-repeat;
  /* Agar gambar tidak berulang */
  background-position: top;
  /* Memusatkan gambar pada elemen */
}

.custom-date-picker {
  appearance: none;
  /* Remove default styling */
  -webkit-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50016 0.333496C3.86835 0.333496 4.16683 0.631973 4.16683 1.00016V1.8335H9.8335V1.00016C9.8335 0.631973 10.132 0.333496 10.5002 0.333496C10.8684 0.333496 11.1668 0.631973 11.1668 1.00016V1.8335H11.5002C12.6968 1.8335 13.6668 2.80355 13.6668 4.00016V11.5002C13.6668 12.6968 12.6968 13.6668 11.5002 13.6668H2.50016C1.30355 13.6668 0.333496 12.6968 0.333496 11.5002V4.00016C0.333496 2.80355 1.30355 1.8335 2.50016 1.8335H2.8335V1.00016C2.8335 0.631973 3.13197 0.333496 3.50016 0.333496ZM2.50016 3.16683C2.03993 3.16683 1.66683 3.53993 1.66683 4.00016V4.49955C1.92336 4.39257 2.20486 4.3335 2.50016 4.3335H11.5002C11.7955 4.3335 12.077 4.39257 12.3335 4.49955V4.00016C12.3335 3.53993 11.9604 3.16683 11.5002 3.16683H2.50016ZM12.3335 6.50016C12.3335 6.03993 11.9604 5.66683 11.5002 5.66683H2.50016C2.03993 5.66683 1.66683 6.03993 1.66683 6.50016V11.5002C1.66683 11.9604 2.03993 12.3335 2.50016 12.3335H11.5002C11.9604 12.3335 12.3335 11.9604 12.3335 11.5002V6.50016Z" fill="%232671D9"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
}

.custom-date-picker::-webkit-calendar-picker-indicator {
  opacity: 0;
  /* Hide the default calendar icon */
}

.filter-button {
  position: relative;
}

.dropdown-options {
  position: absolute;
  z-index: 10;
  /* Ensure dropdown is above other content */
}

.table-container {
  margin: 20px;
}

th,
td {
  text-align: left;
  border-left: none;
  /* Menghapus garis vertikal di sebelah kiri */
  border-right: none;
  /* Menghapus garis vertikal di sebelah kanan */
}

th img {
  display: inline-block;
}

th,
td {
  border-left: none;
  /* Menghapus garis vertikal di sebelah kiri */
  border-right: none;
  /* Menghapus garis vertikal di sebelah kanan */
  border-bottom: 1px solid #e5e7e9;
  /* Hanya menyisakan garis horizontal bawah */
}

.pagination-btn {
  display: flex;
  /* Menggunakan flexbox */
  align-items: center;
  /* Vertikal tengah */
  justify-content: center;
  /* Horizontal tengah */
  padding: 8px 6px 8px 6px;
  width: 32px;
  height: 32px;
  border: transparent;
  border-radius: 8px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
}

.pagination-btn.active {
  background-color: #2671d9;
  color: #fff;
}

.pagination-btn:disabled {
  background-color: #fff;
  cursor: not-allowed;
}

.filter-container {
  position: relative;
}

.dropdown-options {
  width: 200px;
}

.option-item {
  position: relative;
}

.sub-options {
  width: 220px;
  top: 0;
  left: 200px;
}
</style>