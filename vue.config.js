module.exports = {
  "pluginOptions": {
    "prerenderSpa": {
      "renderRoutes": [
        "/", '/ru'
      ],
      "useRenderEvent": true,
      "headless": true,
      "onlyProduction": true
    },
    "i18n": {
      "locale": "en",
      "fallbackLocale": "en",
      "localeDir": "locales",
      "enableInSFC": false
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}