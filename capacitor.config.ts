import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.uksusoff.rock63",
  appName: "rock63.ru",
  webDir: "dist",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    StatusBar: {
      overlaysWebView: false,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_logo_notifications",
    },
  },
};

export default config;
