<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="w-[312px] h-[450px] border-[1px] rounded-lg px-4 py-4 absolute bg-white">
      <div class="w-full h-[44px]">
        <span class="text-xs font-semibold text-[#9C9C9C]">{{ selectedYear }}</span>
        <h1 class="text-[#333333] font-semibold text-base">{{ selectedDay }} {{ months[selectedMonth] }}</h1>
      </div>
  
      <!-- Month and Year Selection -->
      <div class="flex mt-4">
        <div class="w-[55px]">
          <div class="w-[100px] relative flex">
          <span  class="text-[#333333] font-semibold text-base">{{ months[selectedMonth] }}</span>
          <svg @click="showMonths = !showMonths" width="16" height="16" class="cursor-pointer ml-5 mt-[5px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z" fill="#2671D9"/>
          </svg>
          </div>
          <div v-show="showMonths" class="absolute bg-white shadow-md p-2 -translate-x-1 w-[50px] month-dropdown">
            <span v-for="(month, index) in months" :key="index" @click="selectMonth(index)" class="block text-[#333333] cursor-pointer hover:text-[#2671D9] font-semibold text-base">{{ month }}</span>
          </div>
        </div>


      <div class="w-[65px] ml-6">
          <div class="w-[100px] relative flex">
            <span class=" text-[#333333] font-semibold text-base">{{ selectedYear }}</span>
            <svg @click="showYears = !showYears" width="16" height="16" class="cursor-pointer ml-6 mt-[5px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 11.2071C8.31658 11.5976 7.68342 11.5976 7.29289 11.2071L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8.70711 11.2071Z" fill="#2671D9"/>
            </svg>
        </div>
        <div v-show="showYears" class="absolute bg-white shadow-md p-2 -translate-x-1 w-[50px] year-dropdown">
        <span v-for="year in years" :key="year" @click="selectYear(year)" class="block text-[#333333] cursor-pointer hover:text-[#2671D9] font-semibold text-base">{{ year }}</span>
      </div>
      </div>
  
        <!-- Navigation Buttons -->
        <div class="w-[56px] h-[24px] flex justify-between ml-[64px]">
          <svg @click="prevMonth" width="24" height="24" class="cursor-pointer" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#E5E7E9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59467 12.5303C9.30178 12.2374 9.30178 11.7626 9.59467 11.4697L13.3447 7.71967C13.6376 7.42678 14.1124 7.42678 14.4053 7.71967C14.6982 8.01256 14.6982 8.48744 14.4053 8.78033L11.1857 12L14.4053 15.2197C14.6982 15.5126 14.6982 15.9874 14.4053 16.2803C14.1124 16.5732 13.6376 16.5732 13.3447 16.2803L9.59467 12.5303Z" fill="#333333"/>
          </svg>
          <svg @click="nextMonth" width="24" height="24" class="ml-2 cursor-pointer" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#E5E7E9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4053 11.4697C14.6982 11.7626 14.6982 12.2374 14.4053 12.5303L10.6553 16.2803C10.3624 16.5732 9.88756 16.5732 9.59467 16.2803C9.30178 15.9874 9.30178 15.5126 9.59467 15.2197L12.8143 12L9.59467 8.78033C9.30178 8.48744 9.30178 8.01256 9.59467 7.71967C9.88756 7.42678 10.3624 7.42678 10.6553 7.71967L14.4053 11.4697Z" fill="#333333"/>
          </svg>
        </div>
      </div>
  
      <!-- Weekdays -->
      <div class="w-full h-[45px] mt-3">
        <div class="w-[250px] h-[40px] flex justify-between">
          <span class="text-[#FF5656] ml-[5px]">Sun</span>
          <span class="text-[#333333]">Mon</span>
          <span class="text-[#333333]">Tue</span>
          <span class="text-[#333333]">Wed</span>
          <span class="text-[#333333]">Thu</span>
          <span class="text-[#333333]">Fri</span>
          <span class="text-[#333333]">Sat</span>
        </div>
      </div>
  
      <!-- Date Grid -->
      <div class="w-full h-[200px] grid grid-cols-7 gap-2">
        <template v-for="(week, index) in calendar" :key="index">
          <template v-for="day in week" :key="day">
            <span @click="day ? selectDay(day) : null" :class="['text-center', dayClass(day)]"
              :style="{padding: '5px', cursor: 'pointer', display: 'inline-block'}">
              {{ day }}
            </span>
          </template>
        </template>
      </div>
  
      <!-- Apply Button -->
      <div class="mr-3 mt-3 flex justify-end">
        <button @click="applyDate" class="w-[90px] h-[40px] bg-[#2671D9] rounded-lg text-white font-semibold">Terapkan</button>
      </div>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      showMonths: false,
      selectedMonth: 8, // September
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      selectedYear: 2024,
      showYears: false,
      selectedDay: 30,
      years: Array.from({ length: 21 }, (_, i) => 2024 - 6 + i), 
      calendar: []
  };
},
  mounted() {
    const today = new Date();
    this.selectedYear = today.getFullYear();
    this.selectedMonth = today.getMonth();
    this.selectedDay = today.getDate();
    this.generateCalendar();
  },
methods: {
  selectYear(year) {
    this.selectedYear = year;
    this.showYears = false;
    this.generateCalendar();
  },
  selectMonth(index) {
    this.selectedMonth = index;
    this.showMonths = false;
    this.generateCalendar();
  },
  emitSelectedDate(selectedDate) {
    this.$emit('date-selected', selectedDate);
  },
  applyDate() {
    const selectedDate = `${this.selectedDay}`;
    this.emitSelectedDate(selectedDate);
  },
  prevMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear -= 1;
    } else {
      this.selectedMonth -= 1;
    }
      this.generateCalendar();
  },
  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear += 1;
    } else {
      this.selectedMonth += 1;
    }
      this.generateCalendar();
  },
  selectDay(day) {
    this.selectedDay = day;
  },
  generateCalendar() {
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    let calendar = [];
    let week = Array(firstDay).fill('');

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
  if (week.length === 7 || day === daysInMonth) {
    calendar.push(week);
    week = [];  
  }
}

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(''); 
    }
    calendar.push(week);
  }
    this.calendar = calendar;
  },
  dayClass(day) {
    return day === this.selectedDay ? 'bg-[#2671D9] rounded-lg text-white font-semibold' : 'text-[#333333]';
  }
  }
};
</script>
