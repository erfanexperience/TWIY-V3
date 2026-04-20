import BookingForm from '@/components/BookingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation — TWIY Health',
  description:
    'Schedule a consultation with the TWIY Health team. We partner with surgeons, ASC networks, and hospital systems across the Southeast.',
};

export default function BookConsultationPage() {
  return <BookingForm />;
}
