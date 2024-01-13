// uno.config.ts
import { defineConfig, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
    presets: [presetUno(), presetWebFonts({
        provider: "google",
        fonts: {
            kalam: {
                name: "Parisienne",
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            }
        }
    })],
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
