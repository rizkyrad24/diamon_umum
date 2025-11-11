<template>
  <div style="position: relative" class="searchable-select mt-1 text-[14px] font-sans text-[#9C9C9C] p-2 w-full border rounded-lg">
    <input v-model="searchTerm" type="text" :placeholder="placeholder" @focus="isDropdownOpen = true"
      class="search-input" style="width: 100%; padding: 1px; box-sizing: border-box;" />
    <ul v-if="isDropdownOpen" class="dropdown-list" style="
          list-style-type: none;
          margin: 0;
          padding: 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 150px;
          overflow-y: auto;
          background-color: #fff;
          z-index: 1000;
        ">
      <li v-for="option in filteredOptions" :key="option.value" @click="selectOption(option)" class="dropdown-item"
        style="
            padding: 8px;
            cursor: pointer;
            background-color: #fff;
          " @mouseover="hoverOption($event, true)" @mouseout="hoverOption($event, false)">
        {{ option.label }}
      </li>
      <li v-if="filteredOptions.length === 0" style="padding: 8px; color: #999;">
        No results found
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";

export default {
  name: "SelectSearch",
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Search...",
    },
    initialValue: {
      type: Object,
      default: null
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const searchTerm = ref("");
    const choosenOption = ref("");
    const isDropdownOpen = ref(false);
    const filterClickListener = ref(null);

    const filteredOptions = computed(() => {
      if (searchTerm.value != "") {
        return props.options.filter((option) =>
          option?.label?.toLowerCase().includes(searchTerm?.value?.toLowerCase())
        );
      } else {
        return props.options
      }
    });

    const selectOption = (option) => {
      // searchTerm.value = option.label;
      emit("change", option);
      isDropdownOpen.value = false;
    };

    const hoverOption = (event, hover) => {
      event.currentTarget.style.backgroundColor = hover ? "#f0f0f0" : "#fff";
    };

    // Watch for initialValue changes
    watch(
      () => props.initialValue,
      (newValue) => {
        if (newValue !== null) {
          searchTerm.value = newValue.label; // Optionally update search term
          choosenOption.value = newValue.label;
        }
      },
      { immediate: true } // Trigger immediately on component mount
    );

    onMounted(() => {
      filterClickListener.value = (e) => {
        if (!e.target.closest('.searchable-select')
        ) {
          isDropdownOpen.value = false;
          searchTerm.value = choosenOption.value
        }
      }
      document.addEventListener('click', filterClickListener.value);
    });

    return {
      searchTerm,
      isDropdownOpen,
      filteredOptions,
      selectOption,
      hoverOption
    };
  }
};
</script>

<style scoped>
.searchable-select {
  font-family: Arial, sans-serif;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.search-input:focus {
  outline: none;
  border-color: #4a90e2; /* Opsional: tambahkan border warna lain untuk focus */
  box-shadow: 0 0 4px rgba(74, 144, 226, 0.5); /* Opsional: tambahkan efek shadow */
}
</style>