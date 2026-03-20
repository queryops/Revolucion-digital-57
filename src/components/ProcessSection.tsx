import { motion } from "framer-motion";
import { Search, Code, QrCode, Rocket, Timer, Eye } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Encontramos tu negocio",
    description: "Visitamos negocios increíbles que son invisibles en internet.",
    time: "0:00",
  },
  {
    icon: Eye,
    title: "Analizamos tu marca",
    description: "Capturamos fotos, historia y esencia de tu negocio.",
    time: "5:00",
  },
  {
    icon: Code,
    title: "Construimos en vivo",
    description: "Diseño, desarrollo, SEO y WhatsApp integrado a máxima velocidad.",
    time: "10:00",
  },
  {
    icon: Rocket,
    title: "Publicamos tu web",
    description: "Tu página en vivo con dominio, mapa y botón de contacto.",
    time: "45:00",
  },
  {
    icon: QrCode,
    title: "Entregamos tu QR",
    description: "Un QR físico listo para que tus clientes te encuentren.",
    time: "55:00",
  },
  {
    icon: Timer,
    title: "¡Negocio Rescatado!",
    description: "En 57 minutos tu negocio es visible para el mundo.",
    time: "57:00",
  },
];

const ProcessSection = () => {
  return (
    <section id="proceso" className="py-24 px-4 relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-display font-semibold text-sm tracking-widest uppercase">
            El Proceso
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3">
            57 Minutos. Un Negocio{" "}
            <span className="text-gradient-neon">Transformado.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass-card p-6 rounded-xl group hover:neon-border transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                  <step.icon size={22} className="text-primary" />
                </div>
                <span className="font-display text-secondary font-bold text-sm tabular-nums">
                  {step.time}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
