export type DialectPin = {
  id: string;
  name: string;
  region: string;
  description: string;
  speaker: string;
  latitude: number;
  longitude: number;
  audioSrc: string;
  audioAvailable: boolean;
};

export type MapCopy = {
  lead: string;
  closed: string;
  open: string;
  close: string;
  loading: string;
  empty: string;
  error: string;
  listLabel: string;
  play: string;
  pause: string;
  speaker: string;
  region: string;
  closeCard: string;
  audioMissing: string;
  audioError: string;
  testBadge: string;
  noscript: string;
  next: string;
};

export type NavLabels = {
  primary: string;
  about: string;
  map: string;
  soon: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  footer: string;
};
