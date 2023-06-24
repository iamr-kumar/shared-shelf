import { Modal } from '@/components/ui/Modal';

export default function ShelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Modal />
      {children}
    </>
  );
}
