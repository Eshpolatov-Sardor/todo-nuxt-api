import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3333",
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}", // Eng keng tarqalgan formatlar
    supportFile: false,  
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
    // Quyidagi qismi agar sizda support fayli ishlatilayotgan bo'lsa kerak
      // setupNodeEvents(on, config) {
      //  if(config.env.coverage){
      //    on('task', require('@cypress/code-coverage/task'));
      //  }
      //   return config
      //  },
  },
});