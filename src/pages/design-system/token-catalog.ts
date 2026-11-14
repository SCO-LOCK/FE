// Figma token names. The preview reads their resolved values from CSS.
export const appearanceGroups = {
  'gap': ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
  'padding': ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
  'radius': ['none', 'small', 'medium', 'large', 'full'],
  'border-weight': ['default', 'thin'],
  'grid': ['width', 'columns', 'margin', 'gutter'],
  'typography/letter-spacing': ['default'],
  'typography/font-weight': ['medium', 'semibold'],
  'typography/font-size': ['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'],
}

export const semanticColorGroups = {
  'bg/accent': ['informative', 'negative', 'positive'],
  'bg/interactive': ['inverse', 'inverse-pressed', 'negative', 'negative-focused', 'subtle', 'subtle-pressed', 'transparent', 'transparent-hover', 'transparent-pressed', 'weak', 'weak-focused', 'weak-pressed'],
  'bg/neutral': ['default', 'inverse', 'muted', 'scrim', 'subtle', 'weak'],
  'border/neutral': ['default', 'subtle'],
  'fg/accent': ['informative', 'inverse-negative', 'negative', 'negative-focused', 'notice', 'positive'],
  'fg/brand': ['inverse'],
  'fg/neutral': ['inverse', 'primary', 'secondary', 'tertiary'],
}

export const paletteGroups = {
  'static': ['white', 'black', 'black-a05', 'black-a10', 'black-a50'],
  'gray': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '990'],
  'red': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  'pink': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  'sco-lime': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  'sco-blue': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
}

export const measurements = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '36', '40', '44', '48', '52', '56', '64', 'max']
