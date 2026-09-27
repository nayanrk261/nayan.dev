import type { SocialItem } from "@/types";
import githubDark from "@/assets/logos/tech_stack/github-dark.svg";
import githubWhite from "@/assets/logos/tech_stack/github-white.svg";

export function getSocials(darkMode: boolean): SocialItem[] {
  return [
    {
      label: "GitHub",
      url: "https://github.com/nayanrk261",
      icon: darkMode ? githubWhite : githubDark,
      isImg: true,
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/nayank_2616/",
      icon: darkMode ? githubWhite : githubDark,
      isImg: true,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/nayan-khandelwal-a88504268/",
      icon: darkMode ? githubWhite : githubDark,
      isImg: true,
    },
    {
      label: "Email",
      url: "mailto:nayankhandelwal261@gmail.com",
      icon: darkMode ? githubWhite : githubDark,
      isImg: true,
    },
  ];
}
