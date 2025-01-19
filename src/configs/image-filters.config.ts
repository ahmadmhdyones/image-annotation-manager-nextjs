export const IMAGE_FILTERS_CONFIG = {
  category: {
    default: undefined,
    param: 'category',
    type: 'select',
  },
  format: {
    default: undefined as string | undefined | null,
    param: 'format',
    type: 'select' as const,
  },
  name: {
    default: '' as string,
    param: 'name',
    type: 'text' as const,
  },
  resolution: {
    default: undefined as string | undefined | null,
    param: 'resolution',
    type: 'select' as const,
  },
} as const;

export type FilterKeys = keyof typeof IMAGE_FILTERS_CONFIG;
