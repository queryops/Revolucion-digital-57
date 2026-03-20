import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, CheckCircle, Loader2 } from "lucide-react";

const WEBHOOK_CONFIG = {
  leadForm: "https://n8n.zipautomationstudios.tech/webhook/lead-forms",
};

type FormStatus = "idle" | "sending" | "success" | "error";

const LeadForm = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    city: "",
    phone: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...formData,
      source: "landing_page",
      timestamp: new Date().toISOString(),
      campaign: "revolucion_digital_57",
    };

    try {
      await fetch(WEBHOOK_CONFIG.leadForm, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      setStatus("success");
      setFormData({ businessName: "", ownerName: "", email: "", city: "", phone: "", businessType: "", message: "" });
    } catch (error) {
      console.error("Webhook send failed:", error);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full bg-muted/50 border border-border text-foreground rounded-lg px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition";

  return (
    <section id="contacto" className="py-24 px-4 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-display font-semibold text-sm tracking-widest uppercase">
            Contacto
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3">
            ¿Tu negocio necesita un{" "}
            <span className="text-gradient-gold">Rescate Digital?</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Completa el formulario y podrías ser el siguiente negocio rescatado en vivo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="bg-muted/50 px-6 py-3 flex items-center gap-3 border-b border-border/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
              <Terminal size={12} />
              <span>zip_rescue --submit-business</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-display text-muted-foreground mb-1.5 block">Nombre del Negocio *</label>
                <input type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Café del Barrio" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-display text-muted-foreground mb-1.5 block">Tu Nombre *</label>
                <input type="text" required value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} placeholder="Juan García" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs font-display text-muted-foreground mb-1.5 block">Correo Electrónico *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-display text-muted-foreground mb-1.5 block">Ciudad *</label>
                <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="Medellín" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-display text-muted-foreground mb-1.5 block">WhatsApp *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+57 300 123 4567" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs font-display text-muted-foreground mb-1.5 block">Tipo de Negocio *</label>
              <select required value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="restaurante">Restaurante / Café</option>
                <option value="barberia">Barbería / Peluquería</option>
                <option value="tienda">Tienda / Comercio</option>
                <option value="hostal">Hostal / Hotel</option>
                <option value="taller">Taller / Estudio</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-display text-muted-foreground mb-1.5 block">¿Por qué necesitas un Rescate Digital?</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Cuéntanos sobre tu negocio..." rows={3} className={inputClass + " resize-none"} />
            </div>

            <button type="submit" disabled={status === "sending"} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-lg hover:brightness-110 transition neon-glow flex items-center justify-center gap-2 disabled:opacity-50">
              {status === "sending" ? (
                <><Loader2 size={20} className="animate-spin" /> Enviando...</>
              ) : status === "success" ? (
                <><CheckCircle size={20} /> ¡Solicitud Enviada!</>
              ) : status === "error" ? (
                <><Send size={20} /> Error al enviar. Intenta de nuevo.</>
              ) : (
                <><Send size={20} /> Enviar Solicitud de Rescate</>
              )}
            </button>

            <p className="text-center text-muted-foreground text-xs">
              Al enviar, aceptas ser contactado por WhatsApp o correo para coordinar tu rescate digital.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
