import { createRouter, createWebHistory } from "vue-router";
import { clearDataLogin } from "@/utils/helper";

// Login
import Login from "@/pages/Login.vue";

// Admin (Manager, VP, Direksi)
import Dashboardmanager from "@/pages/Admin/Dashboardmanager.vue";
import Pengajuanbaru from "@/pages/Admin/Approval/Pengajuanbaru.vue";
import Disetujui from "@/pages/Admin/Approval/Disetujui.vue";
import Ditolak from "@/pages/Admin/Approval/Ditolak.vue";
import Prosesmanager from "@/pages/Admin/Prosesmanager.vue";
import Selesaimanager from "@/pages/Admin/Selesaimanager.vue";
import Detailmanager from "@/pages/Admin/Detailmanager.vue";
import Detailprosesmanager from "@/pages/Admin/Detailprosesmanager.vue";
import DetailMoUmanager from "@/pages/Admin/DetailMoUmanager.vue";

// User
import Dashboard from "@/pages/Dashboard.vue";
import Draft from "../pages/Draft.vue";
import Proses from "../pages/Proses.vue";
import Selesai from "../pages/Selesai.vue";
import Detaildraft from "../pages/Detaildraft.vue";
import Detailproses from "../pages/Detailproses.vue";
import DetailMoU from "../pages/DetailMoU.vue";

// MoU
import MoU from '../pages/MoU/Mou.vue';
import Ruanglingkup from '../pages/MoU/Ruanglingkup.vue';
import Lainnya from '../pages/MoU/Lainnya.vue';
import Mitrabisnis from '../pages/MoU/Mitrabisnis.vue';
import Lampiran from '../pages/MoU/Lampiran.vue';
import FormMou from "@/pages/MoU/FormMou.vue";
import FormUpdateMou from "@/pages/MoU/FormUpdateMou.vue";

// PKS
import PKS from '../pages/PKS/Pks.vue';
import Rab from '../pages/PKS/Rab.vue';
import Pksruanglingkup from '../pages/PKS/Pksruanglingkup.vue';
import Pkslainnya from '../pages/PKS/Pkslainnya.vue';
import Pksmitrabisnis from '../pages/PKS/Pksmitrabisnis.vue';
import Pkslampiran from '../pages/PKS/Pkslampiran.vue';
import FormPks from "@/pages/PKS/FormPks.vue";
import FormUpdatePks from "@/pages/PKS/FormUpdatePks.vue";


const routes = [

    // Login
    { path: '/', name: 'Login', component: Login },
    
    // Admin (Manager, VP, Direksi)
    { path: '/Dashboardadmin', name: 'Dashboardmanager', component: Dashboardmanager, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Approvalpengajuanbaru', name: 'Pengajuanbaru', component: Pengajuanbaru, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Approvaldisetujui', name: 'Disetujui', component: Disetujui, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Approvalditolak', name: 'Ditolak', component: Ditolak, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Prosesadmin', name: 'Prosesmanager', component: Prosesmanager, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Selesaiadmin', name: 'Selesaimanager', component: Selesaimanager, meta: { requiresAuth: true, role: ['manager', 'vp'] } },
    { path: '/Detailpengajuanadmin/:base/:id', name: 'Detailmanager', component: Detailmanager, meta: { requiresAuth: true, role: ['manager', 'vp'] }},
    { path: '/Detailprosesmanager/:base/:id', name: 'Detailprosesmanager', component: Detailprosesmanager, meta: { requiresAuth: true, role: ['manager', 'vp'] }},
    { path: '/DetailMoUmanager', name: 'DetailMoUmanager', component: DetailMoUmanager, meta: { requiresAuth: true, role: ['manager', 'vp'] }},

    // User
    { path: '/Dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Draft', name: 'Draft', component: Draft, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Proses', name: 'Proses', component: Proses, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Selesai', name: 'Selesai', component: Selesai, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Detaildraft/:base/:id', name: 'Detaildraft', component: Detaildraft, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Detailproses/:base/:id', name: 'Detailproses', component: Detailproses, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/DetailMoU', name: 'DetailMoU', component: DetailMoU, meta: { requiresAuth: true, role: ['staff'] } },

    // MoU
    // { path: '/MoU-NDA', name: 'MoU', component: MoU, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/MoU-NDA', name: 'MoU', component: FormMou, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Ruanglingkup', name: 'Ruanglingkup', component: Ruanglingkup, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Lainnya', name: 'Lainnya', component: Lainnya, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Mitrabisnis', name: 'Mitrabisnis', component: Mitrabisnis, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Lampiran', name: 'Lampiran', component: Lampiran, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/MoU-NDA/:id', name: 'MoUupdate', component: FormUpdateMou, meta: { requiresAuth: true, role: ['staff'] } },

    // PKS
    // { path: '/PKS', name: 'PKS', component: PKS, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/PKS', name: 'PKS', component: FormPks, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Rab', name: 'Rab', component: Rab, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Pksruanglingkup', name: 'Pksruanglingkup', component: Pksruanglingkup, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Pkslainnya', name: 'Pkslainnya', component: Pkslainnya, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Pksmitrabisnis', name: 'Pksmitrabisnis', component: Pksmitrabisnis, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/Pkslampiran', name: 'Pkslampiran', component: Pkslampiran, meta: { requiresAuth: true, role: ['staff'] } },
    { path: '/PKS/:id', name: 'PKSupdate', component: FormUpdatePks, meta: { requiresAuth: true, role: ['staff'] } },
  ];
const router = Router();

function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}

router.beforeEach((to, from, next) => {
    // Cek jika rute membutuhkan autentikasi
    if (to.meta.requiresAuth) {
      const accessToken = localStorage.getItem('access');
      const position = localStorage.getItem('position');
      if (accessToken && to.meta.role.includes(position)) {
        // Misalnya, token valid jika ditemukan nilai yang sesuai
        next(); // Lanjutkan ke rute tujuan
      } else {
        // Jika token tidak ditemukan, arahkan ke halaman login
        clearDataLogin()
        next({ name: 'Login' });
      }
    } else {
      // Jika rute tidak membutuhkan autentikasi, lanjutkan
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        const position = localStorage.getItem('position');
        if (position == 'manager' || position == 'vp') {
          next({ name: 'Dashboardmanager' });
        } else if (position == 'staff') {
          next({ name: 'Dashboard' });
        } else {
          clearDataLogin();
          next();
        }
      } else {
        next();
      }
    }
});

export default router;