// uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
    presets: [presetUno()],
    theme: {
        colors: {
            accent: "#8C54A1",
            neutral: "#AEA1EA",
            background: "#B2EBF9",
            buttons: "#FAFBD4",
        },
        breakpoints: {
            xs: "300px",
            sm: "500px",
            md: "768px",
            lg: "1024px",
            xl: "1500px",
            "2xl": "1920px",
        },
    },
});
