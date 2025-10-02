export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12">
      {children}
    </h2>
  );
}
