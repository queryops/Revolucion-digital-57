import { motion } from "framer-motion";
import { MapPin, ExternalLink, Star } from "lucide-react";
import orbClubImg from "@/assets/orb-club.png";
import vaporaImg from "@/assets/vapora.png";
import dannyGlamImg from "@/assets/danny-glam.png";

const rescues = [
  {
    name: "O.R.B CLUB SOCIAL",
    type: "Club Social para Artistas Emergentes",
    city: "Zipaquirá",
    before: "Sin presencia digital, solo conocido localmente",
    after: "Web profesional en vivo, reservas online activas",
    rating: 5,
    url: "https://queryops.github.io/ORB-CLUB/",
    image: orbClubImg,
  },
  {
    name: "VAPORA",
    type: "Tienda de Vapeo Premium",
    city: "Zipaquirá",
    before: "Solo ventas por Instagram, sin catálogo web",
    after: "Catálogo online, WhatsApp integrado, SEO activo",
    rating: 5,
    url: "https://queryops.github.io/vapora",
    image: vaporaImg,
  },
  {
    name: "DANNY GLAM",
    type: "Artista Urbano Colombiano",
    city: "Colombia",
    before: "Sin página web, solo redes sociales dispersas",
    after: "Web profesional con música, galería y booking",
    rating: 5,
    url: "https://queryops.github.io/DannyGlam_WebSite",
    image: dannyGlamImg,
  },
];

const RescuesSection = () => {
  return (
    <section id="rescates" className="py-24 px-4 relative">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-display font-semibold text-sm tracking-widest uppercase">
            Rescates Digitales
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3">
            Negocios que{" "}
            <span className="text-gradient-gold">Transformamos</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Cada rescate es una historia real. Mira el antes y después de negocios que pasaron de invisibles a imparables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rescues.map((r, i) => (
            <motion.a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="glass-card rounded-xl overflow-hidden group hover:neon-border transition-all duration-200 block"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <h3 className="font-display font-bold text-foreground text-lg drop-shadow-lg">{r.name}</h3>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <MapPin size={12} />
                    <span>{r.city}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-muted-foreground text-xs">{r.type}</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-display font-semibold text-destructive uppercase tracking-wider">Antes</span>
                    <p className="text-muted-foreground text-sm mt-1">{r.before}</p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="flex-1">
                    <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">Después</span>
                    <p className="text-muted-foreground text-sm mt-1">{r.after}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition">
                    <ExternalLink size={12} />
                    Ver Sitio Web
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RescuesSection;
