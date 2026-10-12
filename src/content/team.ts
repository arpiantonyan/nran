export type TeamMember = {
  id: string;
  name: { hy: string; en: string };
  /** Public path, for example "/team/member.jpg". Null shows the round placeholder. */
  imageSrc: string | null;
};

export const team: TeamMember[] = [
  {
    id: "member-1",
    name: { hy: "Անուն Ազգանուն", en: "Name Surname" },
    imageSrc: null,
  },
  {
    id: "member-2",
    name: { hy: "Անուն Ազգանուն", en: "Name Surname" },
    imageSrc: null,
  },
  {
    id: "member-3",
    name: { hy: "Անուն Ազգանուն", en: "Name Surname" },
    imageSrc: null,
  },
  {
    id: "member-4",
    name: { hy: "Անուն Ազգանուն", en: "Name Surname" },
    imageSrc: null,
  },
];
