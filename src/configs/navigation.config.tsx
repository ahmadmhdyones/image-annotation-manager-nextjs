import { Navigation } from '@toolpad/core/AppProvider';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CollectionsIcon from '@mui/icons-material/Collections';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Dashboard' },
  {
    icon: <LocalOfferIcon />,
    kind: 'page',
    pattern: `${paths.dashboard.categories.root.to().slice(1)}{/:segment}*`,
    segment: paths.dashboard.categories.root.to().slice(1),
    title: 'Categories',
  },
  {
    icon: <CollectionsIcon />,
    kind: 'page',
    pattern: `${paths.dashboard.images.root.to().slice(1)}{/:segment}*`,
    segment: paths.dashboard.images.root.to().slice(1),
    title: 'Images',
  },
];
