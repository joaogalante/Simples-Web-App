export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/'

export const PARTICIPATION_TYPES = {
  SHAREHOLDER: 'shareholder',
  ADMINISTRATOR: 'administrator',
  BOTH: 'both',
}

const {SHAREHOLDER, ADMINISTRATOR, BOTH} = PARTICIPATION_TYPES

export const PARTICIPATION_TYPES_LABELS = {
  [SHAREHOLDER]: 'Sócio/Acionista',
  [ADMINISTRATOR]: 'Administrador',
}

export const PARTICIPATION_TYPES_CHECKBOX_OPTIONS = [
  {label: PARTICIPATION_TYPES_LABELS[SHAREHOLDER], value: SHAREHOLDER},
  {label: PARTICIPATION_TYPES_LABELS[ADMINISTRATOR], value: ADMINISTRATOR},
]

export const PARTICIPATION_OWNERSHIP_TYPES = {
  PERCENTAGE: 'percentage',
  QUOTAS: 'quotas',
}

export const PARTICIPATION_OWNERSHIP_TYPES_CHECKBOX_OPTIONS = [
  {label: 'Porcentagem', value: PARTICIPATION_OWNERSHIP_TYPES.PERCENTAGE},
  {label: 'Cotas', value: PARTICIPATION_OWNERSHIP_TYPES.QUOTAS},
]

export const SHAREHOLDER_TYPES = {
  ENTITY: 'entity',
  CIRCULATION: 'circulation',
  UNIDENTIFIED: 'unidentified',
  OPEN: 'open',
  TREASURY: 'treasury',
}

const {ENTITY, UNIDENTIFIED, CIRCULATION, TREASURY} = SHAREHOLDER_TYPES

export const SHAREHOLDER_TYPES_LABELS = {
  [CIRCULATION]: 'Ações em Circulação',
  [UNIDENTIFIED]: 'Acionistas Não Identificados',
  [TREASURY]: 'Ações em Tesouraria',
}

export const PARTICIPATION_TAGS_LABELS = {
  [SHAREHOLDER]: PARTICIPATION_TYPES_LABELS[SHAREHOLDER],
  [ADMINISTRATOR]: PARTICIPATION_TYPES_LABELS[ADMINISTRATOR],
  [CIRCULATION]: 'Composição',
}

export const PARTICIPATION_TAGS_COLORS = {
  [SHAREHOLDER]: 'green',
  [ADMINISTRATOR]: 'yellow',
  [CIRCULATION]: 'grey',
}

export const ENTITY_TYPES = {
  LEGAL: 'legal',
  INDIVIDUAL: 'individual',
}

const {LEGAL, INDIVIDUAL} = ENTITY_TYPES

export const ENTITY_TYPES_LABELS = {
  [LEGAL]: 'Pessoa Juridica',
  [INDIVIDUAL]: 'Pessoa Física',
}

export const ENTITY_TYPES_RADIO_OPTIONS = [
  {label: ENTITY_TYPES_LABELS[LEGAL], value: LEGAL},
  {label: ENTITY_TYPES_LABELS[INDIVIDUAL], value: INDIVIDUAL},
]
