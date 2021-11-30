const DARK = '#121212';
const SECONDARY_DARK = '#383838';
const EMERALD = '#2ecc71';
const LIGHT = '#ecf0f1';
const SILVER = '#bdc3c7';
const LASTMINUTE = '#f2007d';
const STAR = '#f1df5a';
const UNDERLINE_BLUE = '#58a6ff';

const common = {
  SUCCESS: EMERALD,
  LASTMINUTE: LASTMINUTE,
  SILVER: SILVER,
  SECONDARY_DARK: SECONDARY_DARK,
  STAR: STAR,
  UNDERLINE_BLUE: UNDERLINE_BLUE,
};

const light = {
  ...common,
  BACKGROUND: LIGHT,
  TEXT: DARK,
};

const dark = {
  ...common,
  BACKGROUND: DARK,
  TEXT: LIGHT,
};

export const colors = {light, dark};
