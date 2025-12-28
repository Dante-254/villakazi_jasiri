import EventForm from "@/components/admin/EventForm";

export default function AddEventPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* @ts-expect-error Server -> Client */}
      <EventForm />
    </div>
  );
}
