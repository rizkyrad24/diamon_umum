<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import sidebar from "../components/sidebar.vue";
import navbar from "../components/navbar.vue";
import LoadingComponent from '../components/loading.vue';
import ModalSuccess from "@/components/modalsuccess.vue";
import ModalFailed from "@/components/modalfailed.vue";
import ModalDialog from '@/components/modaldialog.vue';
import { fetchGet, fetchPost } from "@/api/apiFunction";
import { parseStatusAproval } from "@/utils/helper";
import { dateParsing } from "@/utils/helper";
</script>

<template>
  <div class="flex">
    <sidebar />
    <div class="flex-grow">
      <navbar />
      <div class="h-[54px] flex">
        <router-link to="/Draft">
          <h1 class="text-[#2671D9] text-sm ml-6 mt-3">Draft</h1>
        </router-link>
        <svg width="16" height="16" viewBox="0 0 16 16" class="mt-[19px] ml-1" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M11.2071 7.29289C11.5976 7.68342 11.5976 8.31658 11.2071 8.70711L6.20711 13.7071C5.81658 14.0976 5.18342 14.0976 4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929L9.08579 8L4.79289 3.70711C4.40237 3.31658 4.40237 2.68342 4.79289 2.29289C5.18342 1.90237 5.81658 1.90237 6.20711 2.29289L11.2071 7.29289Z"
            fill="#7F7F80" />
        </svg>
        <h1 class="text-sm text-[#7F7F80] mt-3 ml-1">Detail Pengajuan</h1>
      </div>
      <div class="h-auto py-3 px-4 bg-slate-100">
        <LoadingComponent :isVisible="isLoading" />
        <ModalFailed :isVisible="modalFailed.isVisible" :title="modalFailed.title" :message="modalFailed.message"
          @close="closeModalFailed" />
        <ModalSuccess :isVisible="modalSuccess.isVisible" :title="modalSuccess.title" :message="modalSuccess.message"
          @close="modalSuccess.closeFunction" />
        <ModalDialog :isVisible="modalDialog.isVisible" :title="modalDialog.title" :message="modalDialog.message"
          @close="modalDialog.closeFunction" @ok="modalDialog.okFunction" />

        <!-- Start Content -->
        <div class="w-[1217px] h-auto p-1 rounded-lg bg-white min-h-screen mx-auto">
          <div class="w-[1170px] h-[56px] ml-4 mt-4 flex justify-between">
            <div>
              <div class="flex">
                <div class="w-[6px] h-7 bg-[#2671D9]"></div>
                <h1 class="text-xl font-medium ml-[6px]">Detail Pengajuan {{ base }}</h1>
              </div>
              <span class="text-base text-[#9C9C9C] pl-4">{{
                dataBerkas?.submissionNumber
              }}</span>
            </div>
            <!-- <button class="w-[52px] h-[42px] border-[1px] border-[#2671D9] text-[#2671D9] hover:bg-[#2671D9] hover:text-white font-semibold rounded-lg mt-2">Edit</button>    -->
          </div>

          <!-- Status Approval Approve Manager -->
          <div class="w-[1170px] h-[58px] bg-[#E2FCF3] border-[#0EA976] border-[1px] rounded-lg ml-4 mt-4 flex p-3">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M16.8849 4.62468C17.3258 4.06756 18.1523 3.96002 18.731 4.3845C19.3097 4.80898 19.4214 5.60472 18.9805 6.16185L10.1066 17.3754C9.87619 17.6665 9.52645 17.8476 9.1472 17.8721C8.76794 17.8967 8.39616 17.7623 8.12738 17.5035L3.13581 12.6978C2.6214 12.2025 2.6214 11.3995 3.13581 10.9042C3.65021 10.409 4.48423 10.409 4.99864 10.9042L8.92446 14.684L16.8849 4.62468Z"
                fill="#0EA976" />
            </svg>
            <h1 class="text-base font-semibold ml-2">
              Status Approval :
              <span class="text-[#0EA976]">
                {{
                  parseStatusAproval(
                    dataBerkas?.positionLevel,
                    dataBerkas?.status
                  )
                }}</span>
            </h1>
          </div>

          <!-- Status Approval Revisi -->
          <!-- <div class="w-[1170px] h-[58px] bg-[#FEF6EC] border-[#F08800] border-[1px] rounded-lg ml-4 mt-3 flex p-3">
                    <svg width="20" height="20" class="mt-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99992 2.66634C5.94983 2.66634 2.66659 5.94959 2.66659 9.99967C2.66659 14.0498 5.94983 17.333 9.99992 17.333C14.05 17.333 17.3333 14.0498 17.3333 9.99967C17.3333 5.94959 14.05 2.66634 9.99992 2.66634ZM0.833252 9.99967C0.833252 4.93706 4.93731 0.833008 9.99992 0.833008C15.0625 0.833008 19.1666 4.93706 19.1666 9.99967C19.1666 15.0623 15.0625 19.1663 9.99992 19.1663C4.93731 19.1663 0.833252 15.0623 0.833252 9.99967ZM9.99992 6.33301C10.5062 6.33301 10.9166 6.74341 10.9166 7.24967V10.6872C10.9166 11.1934 10.5062 11.6038 9.99992 11.6038C9.49366 11.6038 9.08325 11.1934 9.08325 10.6872V7.24967C9.08325 6.74341 9.49366 6.33301 9.99992 6.33301ZM9.08325 13.4372C9.08325 12.9309 9.49366 12.5205 9.99992 12.5205H10.0068C10.5131 12.5205 10.9235 12.9309 10.9235 13.4372V13.444C10.9235 13.9503 10.5131 14.3607 10.0068 14.3607H9.99992C9.49366 14.3607 9.08325 13.9503 9.08325 13.444V13.4372Z" fill="#F08800"/>
                    </svg>
                    <h1 class="text-base font-semibold ml-2">Status Approval : <span class="text-[#F08800]">Revisi</span></h1>
                </div> -->

          <!-- Informasi Umum -->
          <div class="mt-3">
            <div class="w-[1170px] h-auto border-[1px] rounded-lg ml-4">
              <button @click="informasiDropdown" class="flex w-[1170px] h-[48px] rounded-lg border-b-[1px]">
                <div class="w-[30px] h-[49px] bg-[#4791F2] -translate-y-[1px] rounded-s-lg"></div>
                <h1 class="text-base font-semibold ml-[10px] mt-[12px]">
                  Informasi Umum
                </h1>
                <svg width="12" height="8" class="mt-[22px] translate-x-[967px]" viewBox="0 0 12 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" :d="dropdownInformasi
                    ? 'M6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976316 1.81658 -0.0976317 1.18342 0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711Z'
                    : 'M5.29289 0.792893C5.68342 0.402369 6.31658 0.402369 6.70711 0.792893L11.7071 5.79289C12.0976 6.18342 12.0976 6.81658 11.7071 7.20711C11.3166 7.59763 10.6834 7.59763 10.2929 7.20711L6 2.91421L1.70711 7.20711C1.31658 7.59763 0.683417 7.59763 0.292893 7.20711C-0.0976317 6.81658 -0.0976316 6.18342 0.292893 5.79289L5.29289 0.792893Z'
                    " fill="#2671D9" />
                </svg>
              </button>
              <div v-if="dropdownInformasi" class="px-6 mt-6">
                <div class="flex mt-6">
                  <div class="ml-6">
                    <div class="w-[541px] flex text-[#333333]">
                      <h1 class="w-[150px]">No. Permintaan</h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.submissionNumber ||'-'
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Judul <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.partnershipTitle
                      }}</span>
                    </div>
                    <div v-if="base == 'PKS'" class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Nomor Anggaran <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.budgetNumber || '-'
                      }}</span>
                    </div>
                    <div v-if="base == 'PKS'" class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Tipe Anggaran <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.budgetType || '-'
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Calon Mitra Bisnis <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.partnershipCandidate || '-'
                      }}</span>
                    </div>
                  </div>
                  <div>
                    <div v-if="base == 'PKS'" class="w-[541px] flex text-[#333333]">
                      <h1 class="w-[150px]">Metode Kemitraan <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.partnershipMethod || '-'
                      }}</span>
                    </div>
                    <div v-if="base == 'PKS'" class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Jenis Material <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.materialType || '-'
                      }}</span>
                    </div>
                    <div v-if="base == 'PKS'" class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Jenis Kemitraan <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{ dataBerkas?.partnershipType || '-' }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Pelaksana</h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.disposedStaff || '-'
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Tipe Bisnis <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.bisnisType || '-'
                      }}</span>
                    </div>
                  </div>
                </div>
                <svg width="1170" height="1" class="mt-6 -translate-x-6" viewBox="0 0 1200 1" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="1200" height="0" transform="translate(0 1)" fill="white" />
                  <line y1="0.5" x2="1200" y2="0.5" stroke="#E5E7E9" />
                </svg>
                <div class="flex py-4">
                  <div class="ml-6">
                    <div class="w-[541px] flex text-[#333333]">
                      <h1 class="w-[150px]">Latar Belakang <span class="text-[#FF5656] text-xs">*</span></h1>
                      <span class="w-[317px] text-[#7F7F80]">{{
                        dataBerkas?.background
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Tanggal Dibuat</h1>
                      <span class="text-[#7F7F80]">{{
                        dateParsing(dataBerkas?.submissionDate)
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Dibuat Oleh</h1>
                      <span class="text-[#7F7F80]">{{
                        dataBerkas?.user
                      }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="w-[541px] flex text-[#333333]">
                      <h1 class="w-[150px]">Catatan</h1>
                      <span class="w-[317px] text-[#7F7F80]">{{
                        dataBerkas?.note
                      }}</span>
                    </div>
                    <div class="w-[541px] flex mt-6 text-[#333333]">
                      <h1 class="w-[150px]">Tanggal Target Selesai</h1>
                      <span class="text-[#7F7F80]">{{
                        dateParsing(dataBerkas?.expectedDate)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lingkup Pekerjaan -->
            <div class="w-[1170px] h-auto border-[1px] rounded-lg mt-4 ml-4">
              <button @click="pekerjaanDropdown" class="flex w-[1170px] h-[48px] rounded-lg border-b-[1px]">
                <div class="w-[30px] h-[49px] bg-[#FFA229] -translate-y-[1px] rounded-s-lg"></div>
                <h1 class="text-base font-semibold ml-[10px] mt-[12px]">
                  Lingkup Pekerjaan <span class="text-[#FF5656] text-xs">*</span>
                </h1>
                <svg width="12" height="8" class="mt-[22px] translate-x-[956px]" viewBox="0 0 12 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" :d="dropdownPekerjaan
                    ? 'M6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976316 1.81658 -0.0976317 1.18342 0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711Z'
                    : 'M5.29289 0.792893C5.68342 0.402369 6.31658 0.402369 6.70711 0.792893L11.7071 5.79289C12.0976 6.18342 12.0976 6.81658 11.7071 7.20711C11.3166 7.59763 10.6834 7.59763 10.2929 7.20711L6 2.91421L1.70711 7.20711C1.31658 7.59763 0.683417 7.59763 0.292893 7.20711C-0.0976317 6.81658 -0.0976316 6.18342 0.292893 5.79289L5.29289 0.792893Z'
                    " fill="#2671D9" />
                </svg>
              </button>
              <div v-if="dropdownPekerjaan" class="px-6 mt-6">
                <h1 class="text-[#333333]">
                  {{ dataBerkas?.partnershipCandidate }}
                </h1>
                <span class="text-[#7F7F80]">-</span>
                <div class="w-[1120px] overflow-auto rounded-lg border-[1px] mb-3 mt-3">
                  <table class="table-auto w-full text-left">
                    <!-- Kolom -->
                    <thead class="text-xs h-[48px] text-[#4D5E80] rounded-lg">
                      <tr class="bg-none border-b-2">
                        <th class="w-[74px] px-3 py-[18px]">
                          <div class="flex justify-between">
                            No.
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                        <th class="w-[924px] px-3">
                          <div class="flex justify-between">
                            Judul
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <!-- Baris -->
                    <tbody v-if="base === 'PKS'" class="">
                      <tr v-for="(item, index) in dataBerkas?.scopesPks" :key="index"
                        class="bg-white border-b text-sm text-[#333333]">
                        <td class="px-3 py-[18px]">{{ index + 1 }}</td>
                        <td class="px-3">{{ item.scopeName }}</td>
                      </tr>
                      <!-- tambahkan baris tabel lainnya disini -->
                    </tbody>
                    <tbody v-else class="">
                      <tr v-for="(item, index) in dataBerkas?.scopesMou" :key="index"
                        class="bg-white border-b text-sm text-[#333333]">
                        <td class="px-3 py-[18px]">{{ index + 1 }}</td>
                        <td class="px-3">{{ item.scopeName }}</td>
                      </tr>
                      <!-- tambahkan baris tabel lainnya disini -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Informasi RAB -->
            <div v-if="base === 'PKS'" class="w-[1170px] h-auto border-[1px] rounded-lg mt-4 ml-4">
              <button @click="rabDropdown" class="flex w-[1170px] h-[48px] rounded-lg border-b-[1px]">
                <div class="w-[30px] h-[49px] bg-[#0FB37D] -translate-y-[1px] rounded-s-lg"></div>
                <h1 class="text-base font-semibold ml-[10px] mt-[12px]">
                  Informasi RAB <span class="text-[#FF5656] text-xs">*</span>
                </h1>
                <svg width="12" height="8" class="mt-[22px] translate-x-[986px]" viewBox="0 0 12 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" :d="dropdownRab
                    ? 'M6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976316 1.81658 -0.0976317 1.18342 0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711Z'
                    : 'M5.29289 0.792893C5.68342 0.402369 6.31658 0.402369 6.70711 0.792893L11.7071 5.79289C12.0976 6.18342 12.0976 6.81658 11.7071 7.20711C11.3166 7.59763 10.6834 7.59763 10.2929 7.20711L6 2.91421L1.70711 7.20711C1.31658 7.59763 0.683417 7.59763 0.292893 7.20711C-0.0976317 6.81658 -0.0976316 6.18342 0.292893 5.79289L5.29289 0.792893Z'
                    " fill="#2671D9" />
                </svg>
              </button>
              <div v-if="dropdownRab" class="px-6 mt-6">
                <div class="w-[1120px] overflow-auto rounded-lg border-[1px] mb-3 mt-3">
                  <table class="table-auto w-full text-left">
                    <!-- Kolom -->
                    <thead class="text-xs h-[48px] text-[#4D5E80] rounded-lg">
                      <tr class="bg-none border-b-2">
                        <th class="w-[74px] px-3 py-[18px]">
                          <div class="flex justify-between">
                            No.
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                        <th class="w-[231px] px-3">
                          <div class="flex justify-between">
                            Aksi
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                        <th class="w-[231px] px-3">
                          <div class="flex justify-between">
                            Deskripsi
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                        <th class="w-[300px] px-3">
                          <div class="flex justify-between">
                            Pelanggan
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                        <th class="w-[200px] px-3">
                          <div class="flex justify-between">
                            PLN/Non PLN
                            <svg width="16" height="16" class="cursor-pointer" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4252 3.14404C11.7073 3.14404 11.9359 3.36467 11.9359 3.63684L11.9359 11.3174L14.1282 9.20189C14.3276 9.00944 14.651 9.00944 14.8504 9.20189C15.0499 9.39434 15.0499 9.70636 14.8504 9.89881L11.7863 12.8556C11.6906 12.948 11.5607 12.9999 11.4252 12.9999C11.2898 12.9999 11.1599 12.948 11.0641 12.8556L8.00001 9.89881C7.80057 9.70636 7.80057 9.39434 8.00001 9.20189C8.19944 9.00944 8.52279 9.00944 8.72223 9.20189L10.9145 11.3174L10.9145 3.63684C10.9145 3.36467 11.1432 3.14404 11.4252 3.14404Z"
                                fill="#93B8EC" />
                              <path
                                d="M4.21369 3.14482C4.41312 2.95238 4.73647 2.95238 4.9359 3.14482L8.00001 6.10158C8.19945 6.29403 8.19945 6.60605 8.00001 6.79849C7.80058 6.99094 7.47723 6.99094 7.27779 6.79849L5.08548 4.68299V12.3635C5.08548 12.6357 4.85684 12.8563 4.57479 12.8563C4.29275 12.8563 4.06411 12.6357 4.06411 12.3635V4.68299L1.87179 6.79849C1.67236 6.99094 1.34901 6.99094 1.14958 6.79849C0.950141 6.60605 0.950141 6.29403 1.14958 6.10158L4.21369 3.14482Z"
                                fill="#93B8EC" />
                            </svg>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <!-- Baris -->
                    <tbody class="">
                      <tr v-for="(item, index) in dataBerkas?.rab" :key="index"
                        class="bg-white border-b text-sm text-[#333333]">
                        <td class="px-3 py-[18px]">{{ index + 1 }}</td>
                        <td class="px-3">{{ item.product }}</td>
                        <td class="px-3">{{ item.costDesc }}</td>
                        <td class="px-3">{{ item.customer }}</td>
                        <td class="px-3">
                          {{ item.isPln ? "PLN" : "Non PLN" }}
                        </td>
                      </tr>
                      <!-- tambahkan baris tabel lainnya disini -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Berkas Lampiran -->
            <div class="w-[1170px] h-auto border-[1px] rounded-lg mt-4 ml-4">
              <button @click="berkasDropdown" class="flex w-[1170px] h-[48px] rounded-lg border-b-[1px]">
                <div class="w-[30px] h-[49px] bg-[#F42495] -translate-y-[1px] rounded-s-lg"></div>
                <h1 class="text-base font-semibold ml-[10px] mt-[12px]">
                  Berkas Lampiran
                </h1>
                <svg width="12" height="8" class="mt-[22px] translate-x-[968px]" viewBox="0 0 12 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" :d="dropdownBerkas
                    ? 'M6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976316 1.81658 -0.0976317 1.18342 0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711Z'
                    : 'M5.29289 0.792893C5.68342 0.402369 6.31658 0.402369 6.70711 0.792893L11.7071 5.79289C12.0976 6.18342 12.0976 6.81658 11.7071 7.20711C11.3166 7.59763 10.6834 7.59763 10.2929 7.20711L6 2.91421L1.70711 7.20711C1.31658 7.59763 0.683417 7.59763 0.292893 7.20711C-0.0976317 6.81658 -0.0976316 6.18342 0.292893 5.79289L5.29289 0.792893Z'
                    " fill="#2671D9" />
                </svg>
              </button>
              <div v-if="dropdownBerkas">
                <div v-if="base === 'PKS'">
                  <div class="px-6 mt-6 mb-4 flex justify-between">
                    <div>
                      <label class="text-[#4D5E80] font-semibold">KKB <span
                          class="text-[#FF5656] text-xs">*</span></label>
                      <a :href="linkDownloadKKB" v-if="fileNameKKB" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow truncate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNameKKB }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizeKKB }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">KKR <span
                          class="text-[#FF5656] text-xs">*</span></label>
                      <a :href="linkDownloadKKR" v-if="fileNameKKR" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-growt truncate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNameKKR }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizeKKR }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">KKF <span
                          class="text-[#FF5656] text-xs">*</span></label>
                      <a :href="linkDownloadKKF" v-if="fileNameKKF" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow truncate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNameKKF }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizeKKF }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                  </div>
                  <div class="px-6 mt-6 mb-4 flex justify-between">
                    <div>
                      <label class="text-[#4D5E80] font-semibold">KKO <span
                          class="text-[#FF5656] text-xs">*</span></label>
                      <a :href="linkDownloadKKO" v-if="fileNameKKO" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow truncate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNameKKO }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizeKKO }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">Proposal Mitra
                        <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label>
                      <a :href="linkDownloadmitra" v-if="fileNamemitra" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow runcate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNamemitra }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizemitra }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">Dokumen Surat Menyurat
                        <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label>
                      <a :href="linkDownloadsurat" v-if="fileNamesurat" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow runcate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNamesurat }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizesurat }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                  </div>
                  <div class="px-6 mt-6 mb-4">
                    <label class="text-[#4D5E80] font-semibold">Dokumen Lainnya
                      <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label>
                    <a :href="linkDownloadlainnya" v-if="fileNamelainnya" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                      <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                        <path
                          d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                          fill="#2671D9" />
                      </svg>
                      <div class="py-2 w-[200px] flex-grow runcate me-4">
                        <span class="text-[#333333] text-sm font-semibold">{{ fileNamelainnya }}</span>
                        <p class="text-[#9E9E9E] text-xs">{{ fileSizelainnya }}</p>
                      </div>
                    </a>
                    <div v-else class="w-[333px] h-auto">
                      <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="px-6 mt-6 mb-4 flex justify-between">
                    <div>
                      <label class="text-[#4D5E80] font-semibold">Proposal Mitra
                        <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label>
                      <a :href="linkDownloadmitra" v-if="fileNamemitra" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow runcate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNamemitra }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizemitra }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">
                        Dokumen Surat Menyurat
                        <span class="text-[#FF5656] text-xs">*</span>
                      </label>
                      <a :href="linkDownloadsurat" v-if="fileNamesurat" class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow runcate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNamesurat }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizesurat }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                    <div>
                      <label class="text-[#4D5E80] font-semibold">Dokumen Lainnya
                        <span class="text-[#B3B3B3] text-xs">(Opsional)</span></label>
                      <a :href="linkDownloadlainnya" v-if="fileNamelainnya"
                        class="w-[333px] h-auto border-[1px] flex rounded-lg mt-2 items-center">
                        <svg width="45" height="46" class="mx-4 my-2" viewBox="0 0 45 46" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="22.5" cy="23" r="22.5" fill="#E9F1FB" />
                          <path
                            d="M30 20.1312C29.9902 20.0451 29.9714 19.9603 29.9437 19.8781V19.7937C29.8987 19.6974 29.8385 19.6087 29.7656 19.5313L24.1406 13.9062C24.0631 13.8333 23.9745 13.7732 23.8781 13.7281H23.7937C23.6985 13.6735 23.5933 13.6384 23.4844 13.625H17.8125C17.0666 13.625 16.3512 13.9213 15.8238 14.4488C15.2963 14.9762 15 15.6916 15 16.4375V29.5625C15 30.3084 15.2963 31.0238 15.8238 31.5512C16.3512 32.0787 17.0666 32.375 17.8125 32.375H27.1875C27.9334 32.375 28.6488 32.0787 29.1762 31.5512C29.7037 31.0238 30 30.3084 30 29.5625V20.1875V20.1312ZM24.375 16.8219L26.8031 19.25H25.3125C25.0639 19.25 24.8254 19.1512 24.6496 18.9754C24.4738 18.7996 24.375 18.5611 24.375 18.3125V16.8219ZM28.125 29.5625C28.125 29.8111 28.0262 30.0496 27.8504 30.2254C27.6746 30.4012 27.4361 30.5 27.1875 30.5H17.8125C17.5639 30.5 17.3254 30.4012 17.1496 30.2254C16.9738 30.0496 16.875 29.8111 16.875 29.5625V16.4375C16.875 16.1889 16.9738 15.9504 17.1496 15.7746C17.3254 15.5988 17.5639 15.5 17.8125 15.5H22.5V18.3125C22.5 19.0584 22.7963 19.7738 23.3238 20.3012C23.8512 20.8287 24.5666 21.125 25.3125 21.125H28.125V29.5625Z"
                            fill="#2671D9" />
                        </svg>
                        <div class="py-2 w-[200px] flex-grow runcate me-4">
                          <span class="text-[#333333] text-sm font-semibold">{{ fileNamelainnya }}</span>
                          <p class="text-[#9E9E9E] text-xs">{{ fileSizelainnya }}</p>
                        </div>
                      </a>
                      <div v-else class="w-[333px] h-auto">
                        <span class="text-[#9E9E9E] text-sm font-semibold">File belum diupload</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[1170px] mt-4 ml-4 mb-4 flex justify-between">
            <div>
              <h1 class="text-base text-[#4D5E80] font-semibold">Tanggapan</h1>
              <div class="w-[561px] h-[88px] bg-[#E0E0E0] border-[1px] border-[#E5E7E9] rounded-lg mt-2">
                <p class="text-[#333333] px-4 py-3 text-sm">
                  {{ dataBerkas?.responseText }}
                </p>
              </div>
            </div>
            <div>
              <h1 class="text-base text-[#4D5E80] font-semibold">Approval</h1>
              <div class="w-[561px] h-[88px] bg-[#E0E0E0] border-[1px] border-[#E5E7E9] rounded-lg mt-2">
                <p class="text-[#333333] px-4 py-3 text-sm">
                  {{ dataBerkas?.approvalNote }}
                </p>
              </div>
            </div>
          </div>

          <svg width="1170" height="1" class="ml-4" viewBox="0 0 1170 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1170" height="0" transform="translate(0 1)" fill="white" />
            <line y1="0.5" x2="1170" y2="0.5" stroke="#E5E7E9" />
          </svg>

          <div class="mr-5 flex justify-end py-4 gap-2">
            <button @click="pushEdit" class="w-[61px] h-[40px] bg-[#2671D9] text-white hover:bg-[#2f63ab] rounded-lg">
              Edit
            </button>
            <button :disabled="disableKirim" @click="SendKirimPengajuan" class="w-[61px] h-[40px] rounded-lg"
              :class="disableKirim ? 'bg-[#9C9C9C] text-black' : 'bg-[#2671D9] text-white hover:bg-[#2f63ab]'">
              Kirim
            </button>
          </div>
        </div>
        <!-- End Content -->
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL } from "@/api/apiManager";
export default {
  data() {
    return {
      dropdownInformasi: false,
      dropdownPekerjaan: false,
      dropdownRab: false,
      dropdownBerkas: false,
      dataBerkas: null,
      base: null,
      id: null,
      fileNameKKB: null,
      fileSizeKKB: null,
      linkDownloadKKB: "",
      fileNameKKR: null,
      fileSizeKKR: null,
      linkDownloadKKR: "",
      fileNameKKF: null,
      fileSizeKKF: null,
      linkDownloadKKF: "",
      fileNameKKO: null,
      fileSizeKKO: null,
      linkDownloadKKO: "",
      fileNamemitra: null,
      fileSizemitra: null,
      linkDownloadmitra: "",
      fileNamesurat: null,
      fileSizesurat: null,
      linkDownloadsurat: "",
      fileNamelainnya: null,
      fileSizelainnya: null,
      linkDownloadlainnya: "",
      disableKirim: true,
      isLoading: false,
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
    };
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
    // Popup Kirim
    SendKirimPengajuan() {
      this.modalDialog = {
        isVisible: true,
        title: 'Kirim Pengajuan',
        message: 'Apakan anda yakin akan mengirim pengajuan ini?',
        okFunction: this.openKirimPengajuan,
        closeFunction: this.closeKirimPengajuan
      }
    },
    openKirimPengajuan() {
      this.closeModalDialog();
      this.postDataApi(this.successKirimPengajuan, this.failKirimPengajuan);
    },
    closeKirimPengajuan() {
      this.closeModalDialog()
    },
    successKirimPengajuan() {
      this.modalSuccess = {
        isVisible: true,
        title: 'Success',
        message: 'Berhasil kirim pengajuan',
        closeFunction: this.closeSelesaiKirimPengajuan
      }
    },
    failKirimPengajuan(data) {
      this.modalFailed = {
        isVisible: true,
        title: 'Gagal',
        message: data?.message ? data.message : "Silahkan hubungi admin"
      }
    },
    closeSelesaiKirimPengajuan() {
      this.closeModalSuccess();
      this.$router.push('/Draft')
    },


    informasiDropdown() {
      this.dropdownInformasi = !this.dropdownInformasi;
    },
    pekerjaanDropdown() {
      this.dropdownPekerjaan = !this.dropdownPekerjaan;
    },
    rabDropdown() {
      this.dropdownRab = !this.dropdownRab;
    },
    berkasDropdown() {
      this.dropdownBerkas = !this.dropdownBerkas;
    },
    pushEdit() {
      if (this.id) {
        if (this.base == "PKS") {
          this.$router.push(`/PKS/${this.id}`);
        } else {
          this.$router.push(`/MoU-NDA/${this.id}`);
        }
      }
    },

    // api
    async getDataApi(base, id) {
      this.isLoading = true;
      if (base == "PKS") {
        const res = await fetchGet(`staff/pks/draft/${id}`, null, this.$router);
        if (res.status == 200) {
          this.dataBerkas = res.data;
          res.data.attachmentsPks.forEach((item) => {
            if (item.fileType == 'KKO') {
              this.fileNameKKO = item.fileName;
              this.fileSizeKKO = item.fileSize;
              this.linkDownloadKKO = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'KKF') {
              this.fileNameKKF = item.fileName;
              this.fileSizeKKF = item.fileSize;
              this.linkDownloadKKF = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'KKR') {
              this.fileNameKKR = item.fileName;
              this.fileSizeKKR = item.fileSize;
              this.linkDownloadKKR = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'KKB') {
              this.fileNameKKB = item.fileName;
              this.fileSizeKKB = item.fileSize;
              this.linkDownloadKKB = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'Dokumen Surat Menyurat') {
              this.fileNamesurat = item.fileName;
              this.fileSizesurat = item.fileSize;
              this.linkDownloadsurat = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'Proposal Mitra') {
              this.fileNamemitra = item.fileName;
              this.fileSizemitra = item.fileSize;
              this.linkDownloadmitra = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'Dokumen Lainnya') {
              this.fileNamelainnya = item.fileName;
              this.fileSizelainnya = item.fileSize;
              this.linkDownloadlainnya = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
          })
          if (
            this.fileNameKKB && this.fileSizeKKB && this.fileNameKKR && this.fileSizeKKR &&
            this.fileNameKKF && this.fileSizeKKF && this.fileNameKKO && this.fileSizeKKO &&
            res.data.partnershipTitle && res.data.partnershipMethod &&
            res.data.scopesPks.length > 0 && res.data.rab.length > 0 &&
            res.data.partnershipType && res.data.budgetType &&
            res.data.budgetNumber && res.data.materialType && res.data.partnershipCandidate
          ) {
            this.disableKirim = false;
          }
          console.log(res.data);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.modalFailed = {
            isVisible: true,
            title: 'Gagal Ambil Data',
            message: res.data.message ? res.data.message : "Silahkan hubungi admin"
          }
        }
      } else {
        const res = await fetchGet(
          `staff/mounda/draft/${id}`,
          null,
          this.$router
        );
        if (res.status == 200) {
          this.dataBerkas = res.data;
          res.data.attachmentsMou.forEach((item) => {
            if (item.fileType == 'Dokumen Surat Menyurat') {
              this.fileNamesurat = item.fileName;
              this.fileSizesurat = item.fileSize;
              this.linkDownloadsurat = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'Proposal Mitra') {
              this.fileNamemitra = item.fileName;
              this.fileSizemitra = item.fileSize;
              this.linkDownloadmitra = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
            if (item.fileType == 'Dokumen Lainnya') {
              this.fileNamelainnya = item.fileName;
              this.fileSizelainnya = item.fileSize;
              this.linkDownloadlainnya = `${baseURL.replace('/api',"")}/download/file/${item.id}`
            }
          })
          if (
            this.fileNamesurat && this.fileSizesurat && res.data.partnershipTitle &&
            res.data.partnershipCandidate && res.data.scopesMou.length > 0
          ) {
            this.disableKirim = false;
          }
          console.log(res.data);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.modalFailed = {
            isVisible: true,
            title: 'Gagal Ambil Data',
            message: res.data.message ? res.data.message : "Silahkan hubungi admin"
          }
        }
      }
    },
    async postDataApi(successFunction, failFunction) {
      this.isLoading = true;
      if (this.base == "PKS") {
        if (this.dataBerkas?.status == "Draft") {
          const res = await fetchPost(`staff/pks/draft/${this.id}/send`, null, null, this.$router);
          if (res.status == 200) {
            this.isLoading = false;
            successFunction();
          } else {
            this.isLoading = false;
            failFunction();
          }
        } else {
          const res = await fetchPost(`staff/pks/draft/${this.id}/send/revision`, null, null, this.$router);
          if (res.status == 200) {
            this.isLoading = false;
            successFunction();
          } else {
            this.isLoading = false;
            failFunction();
          }
        }
      } else {
        if (this.dataBerkas?.status == "Draft") {
          const res = await fetchPost(
            `staff/mounda/draft/${this.id}/send`,
            null, null,
            this.$router
          );
          if (res.status == 200) {
            this.isLoading = false;
            successFunction();
          } else {
            this.isLoading = false;
            failFunction();
          }
        } else {
          const res = await fetchPost(
            `staff/mounda/draft/${this.id}/send/revision`,
            null, null,
            this.$router
          );
          if (res.status == 200) {
            this.isLoading = false;
            successFunction();
          } else {
            this.isLoading = false;
            failFunction();
          }
        }
      }
    },
  },
  mounted() {
    if (this.$route.params.id && this.$route.params.base) {
      this.getDataApi(this.$route.params.base, this.$route.params.id);
    }
    this.base = this.$route.params.base;
    this.id = this.$route.params.id;
  },
};
</script>
