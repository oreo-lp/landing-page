import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStateProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStateProps>()(
  persist<ThemeStateProps>(
    (set, get) => ({
      // 根据用户系统偏好设置初始主题
      theme:
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      toggleTheme: () => {
        const newTheme: Theme = get().theme === "light" ? "dark" : "light";
        // 关键步骤：更新DOM类名避免出现闪烁问题
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle(
            "dark", // element.classList.toggle('dark', condition);如果 condition 为 true，则添加类，否则移除类
            newTheme === "dark"
          );
        }
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme",
      // 初次加载时从存储中恢复主题状态
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          if (state?.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
    }
  )
);
