import { LucideIcon } from "lucide-react";

export default function Hero({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon?: LucideIcon;
}) {
  return (
    <section className="bg-linear-to-br from-dark to-darker text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {Icon && (
            <div>
              <Icon className="w-20 h-20 text-primary mx-auto mb-6" />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
