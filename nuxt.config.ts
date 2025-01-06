// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: ['~/plugins/vee-validate.ts'],
  modules: ['@nuxt/ui','@nuxt/image'],
  imports: {
    autoImport: true,
  },
  
})