<!-- eslint-disable vue/multi-word-component-names -->

<template>
        <div class="w-[180px] absolute rounded-b-lg translate-x-[20px] mt-8 bg-white">
            <ul class="text-sm">
                <li @click="logout" class="mx-1 hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium cursor-pointer border-b-[1px] px-2 py-2">Logout</li>
                <!-- <li v-if="totalAccess > 1" class="mx-1 me-3 border-b-[1px] px-2 py-2">Pilih Role</li>
                <li v-if="(isStaff || isSuperuser) && position != 'staff'" @click="roleStaff" class="mx-3 hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium cursor-pointer border-b-[1px] px-3 py-2">Staff</li>
                <li v-if="(isManager || isSuperuser) && position != 'manager'" @click="roleManager" class="mx-3 hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium cursor-pointer border-b-[1px] px-3 py-2">Manager</li>
                <li v-if="(isVp || isSuperuser) && position != 'vp'" @click="roleVp" class="mx-3 hover:bg-[#E9F1FB] hover:text-[#2671D9] hover:font-medium cursor-pointer px-3 py-2">VP</li> -->
            </ul>
        </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { clearDataLogin } from '@/utils/helper';
import { onMounted, ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['status'])

const router = useRouter();
// const route = useRoute();
// const isStaff = ref(null);
// const isManager = ref(null);
// const isVp = ref(null);
// const isSuperuser = ref(null);
// const position = ref(null);

function logout() {
    clearDataLogin();
    emit('status', false);
    router.push("/");
}
// function roleStaff() {
//     localStorage.setItem('position', 'staff');
//     emit('status', false);
//     router.push("/Dashboard");
// }
// function roleManager() {
//     localStorage.setItem('position', 'manager');
//     emit('status', false);
//     if (route.fullPath == "/Dashboardadmin") {
//         window.location.reload()
//     } else {
//         router.push("/Dashboardadmin");
//     }
// }
// function roleVp() {
//     localStorage.setItem('position', 'vp');
//     emit('status', false);
//     if (route.fullPath == "/Dashboardadmin") {
//         window.location.reload()
//     } else {
//         router.push("/Dashboardadmin");
//     }
// }

// const totalAccess = computed(() => {
//     let count = 0;
//     if (isStaff.value) {
//         count++
//     }
//     if (isManager.value) {
//         count++
//     }
//     if (isVp.value) {
//         count++
//     }
//     if (isSuperuser.value) {
//         count = count + 3
//     }
//     return count
// })

// onMounted(() => {
//     isStaff.value = localStorage.getItem('isStaff') === 'true';
//     isManager.value = localStorage.getItem('isManager') === 'true';
//     isVp.value = localStorage.getItem('isVp') === 'true';
//     isSuperuser.value = localStorage.getItem('isSuperuser') === 'true';
//     position.value = localStorage.getItem('position');
//     console.log(position.value)
// })
</script>
