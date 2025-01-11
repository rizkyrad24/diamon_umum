<template>
    <div v-if="isVisible" class="loading-overlay">
      <div class="spinner"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingComponent",
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.3);
    border-top: 5px solid black;
    border-right: 5px solid black;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-message {
    margin-top: 15px;
    color: blue;
    font-size: 1.2em;
    text-align: center;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  