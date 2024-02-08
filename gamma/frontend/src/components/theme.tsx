interface Theme {
  bgBase: string;
  bgHover: string;
  bgPress: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export const themes: { [key: string]: Theme } = {
  // default
  null: {
    bgBase: "",
    bgHover: "",
    bgPress: "",
    textPrimary: "",
    textSecondary: "",
    border: "",
  },
  black: {
    bgBase: "bg-black",
    bgHover: "bg-zinc-900",
    bgPress: "lol",
    textPrimary: "text-white",
    textSecondary: "text-neutral-500",
    border: "border-neutral-700",
  },
};
