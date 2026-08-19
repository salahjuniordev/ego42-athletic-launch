/**
 * Fixed list of Cameroon cities offered to coaches (one regional capital per
 * administrative region — 10 in total). A closed dropdown instead of free text
 * keeps the directory's city filter free of typos and duplicate spellings.
 * Add smaller towns here if the directory ever needs them.
 */
export const CAMEROON_CITIES = [
  "Bafoussam",
  "Bamenda",
  "Bertoua",
  "Buea",
  "Douala",
  "Ebolowa",
  "Garoua",
  "Maroua",
  "Ngaoundéré",
  "Yaoundé",
] as const;

export type CameroonCity = (typeof CAMEROON_CITIES)[number];
