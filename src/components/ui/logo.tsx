import Image from 'next/image';

// ----------------------------------------------------------------------

export default function Logo() {
  return (
    <Image
      alt='Logo'
      height={36}
      src='/logo/logo-avatar.png'
      style={{ background: 'white', borderRadius: '50%' }}
      width={36}
    />
  );
}
