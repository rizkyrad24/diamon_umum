<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-grow">
      <Navbar />
      <ProdukList />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar.vue";
import Navbar from "@/components/navbar.vue";
import ProdukList from "@/components/MasterData/produk-list.vue";

export default {
  components: {
    Sidebar,
    Navbar,
    ProdukList,
  },
};
</script>

<style>
.background {
  width: Fixed (1, 366px) px;
  height: Hug (1, 416px) px;
  left: 3733px;
  gap: 0px;
  opacity: 0px;
  background: #f6f7fd;
}
</style>