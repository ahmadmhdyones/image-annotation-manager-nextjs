import Image, { ImageProps } from 'next/image';

// ----------------------------------------------------------------------

export default function Logo({
  options,
  size = 36,
  style,
}: {
  options?: Omit<ImageProps, 'src' | 'alt'>;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      alt='Logo'
      height={size}
      src='/logo/logo-avatar.png'
      style={{ ...style, background: 'white', borderRadius: '50%' }}
      width={size}
      {...options}
    />
  );
}
