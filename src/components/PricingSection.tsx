import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const plans = [
  {
    icon: Zap,
    name: "Rescate Digital",
    price: "GRATIS",
    description: "El rescate en vivo para tu negocio",
    features: [
      "Página web funcional",
      "Dominio temporal gratuito",
      "SEO básico",
      "Botón de WhatsApp",
      "Google Maps integrado",
      "QR físico listo para imprimir",
    ],
    cta: "Aplica para ser Rescatado",
    highlighted: false,
  },
  {
    icon: Crown,
    name: "Pro Digital",
    price: "$49/mes",
    description: "Mantenimiento y crecimiento continuo",
    features: [
      "Todo del plan Rescate",
      "Dominio personalizado",
      "Hosting premium",
      "SEO avanzado mensual",
      "Analítica web",
      "Soporte prioritario",
      "Actualizaciones ilimitadas",
    ],
    cta: "Empieza Ahora",
    highlighted: true,
  },
  {
    icon: Rocket,
    name: "Automatización Total",
    price: "$149/mes",
    description: "Escala tu negocio con automatización",
    features: [
      "Todo del plan Pro",
      "Tienda online",
      "Sistema de reservas",
      "Automatización WhatsApp",
      "Email marketing",
      "CRM básico",
      "Integraciones n8n",
    ],
    cta: "Consulta Gratis",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="planes" className="py-24 px-4 relative">
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
            Planes
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3">
            Escala tu{" "}
            <span className="text-gradient-neon">Presencia Digital</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`glass-card rounded-xl p-8 flex flex-col relative ${
                plan.highlighted ? "neon-border ring-1 ring-primary/30" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-display font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  plan.highlighted ? "bg-primary/20" : "bg-muted"
                }`}>
                  <plan.icon size={20} className={plan.highlighted ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`block text-center py-3 rounded-xl font-display font-semibold text-sm transition ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:brightness-110 neon-glow"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
