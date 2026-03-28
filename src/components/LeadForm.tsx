import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Terminal, CheckCircle, Loader2,
  ChevronRight, ChevronLeft,
  Building2, Settings, Package, Users,
  DollarSign, Globe, AlertTriangle, Cpu, FileText,
  X, Zap,
} from "lucide-react";

const WEBHOOK_CONFIG = {
  leadForm: "https://n8n.zipautomationstudios.tech/webhook/lead-forms",
};

type FormStatus = "idle" | "sending" | "success" | "error";

const initialFormData = {
  // A - Identidad
  selectedPlan: "",
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  physicalAddress: "",
  mailingAddress: "",
  businessDescription: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  businessCategory: "",
  // B - Operaciones
  hoursOfOperation: "",
  numberOfEmployees: "",
  locationType: "",
  serviceArea: "",
  hasBookingSystem: "",
  bookingSystemName: "",
  posSystem: "",
  // C - Productos
  productsServices: "",
  pricingRange: "",
  bestSellingItems: "",
  inventorySystem: "",
  suppliers: "",
  // D - Clientes
  targetAudience: "",
  ageRange: "",
  acquisitionChannels: [] as string[],
  emailListSize: "",
  loyaltyProgram: "",
  reviewsPresence: [] as string[],
  // E - Financiero
  monthlyRevenue: "",
  avgTransactionValue: "",
  peakHours: "",
  growthTrend: "",
  // F - Digital
  websiteStatus: "",
  seoStatus: "",
  socialMediaActivity: "",
  onlineOrdering: "",
  crmUsage: "",
  crmName: "",
  // G - Desafíos
  biggestChallenges: [] as string[],
  toolsWished: "",
  timeConsumingTasks: "",
  // H - Tecnología
  currentSoftware: "",
  techWillingness: "5",
  digitalBudget: "",
  techInterests: [] as string[],
  // I+J - Legal & Avanzado
  businessLicense: "",
  insurance: "",
  certifications: "",
  seasonalTrends: "",
  retentionRate: "",
  upsellStrategies: "",
  internalWorkflows: "",
  message: "",
};

type FormData = typeof initialFormData;

const steps = [
  { title: "Identidad",   subtitle: "Información básica del negocio",   Icon: Building2     },
  { title: "Operaciones", subtitle: "Cómo funciona tu negocio",          Icon: Settings      },
  { title: "Productos",   subtitle: "Qué ofreces",                       Icon: Package       },
  { title: "Clientes",    subtitle: "Tu audiencia y marketing",           Icon: Users         },
  { title: "Financiero",  subtitle: "Rendimiento del negocio",            Icon: DollarSign    },
  { title: "Digital",     subtitle: "Presencia en línea",                 Icon: Globe         },
  { title: "Desafíos",    subtitle: "Puntos de dolor",                    Icon: AlertTriangle },
  { title: "Tecnología",  subtitle: "Automatización y herramientas",      Icon: Cpu           },
  { title: "Legal & Extra", subtitle: "Cumplimiento e insights",          Icon: FileText      },
];

interface LeadFormProps {
  preSelectedPlan?: string;
}

const LeadForm = ({ preSelectedPlan = "" }: LeadFormProps) => {
  const [status, setStatus]           = useState<FormStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData]       = useState<FormData>(initialFormData);

  useEffect(() => {
    if (preSelectedPlan) {
      setFormData(prev => ({ ...prev, selectedPlan: preSelectedPlan }));
    }
  }, [preSelectedPlan]);

  const set = (field: keyof FormData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const toggleArray = (field: keyof FormData, value: string) =>
    setFormData(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...formData,
      acquisitionChannels: formData.acquisitionChannels.join(", "),
      reviewsPresence:     formData.reviewsPresence.join(", "),
      biggestChallenges:   formData.biggestChallenges.join(", "),
      techInterests:       formData.techInterests.join(", "),
      source:    "landing_page",
      timestamp: new Date().toISOString(),
      campaign:  "revolucion_digital_57",
    };

    try {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));

      // no-cors + urlencoded = simple request, no CORS preflight needed
      await fetch(WEBHOOK_CONFIG.leadForm, {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    params.toString(),
        mode:    "no-cors",
      });

      setStatus("success");
      setFormData(initialFormData);
      setCurrentStep(0);
    } catch (error) {
      console.error("Webhook send failed:", error);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full bg-muted/50 border border-border text-foreground rounded-lg px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition";
  const labelClass = "text-xs font-display text-muted-foreground mb-1.5 block";
  const hintClass  = "text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border/50";

  const CheckboxGroup = ({
    options, field, values,
  }: { options: string[]; field: keyof FormData; values: string[] }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggleArray(field, opt)}
          className={`px-3 py-1.5 rounded-lg text-xs font-body border transition ${
            values.includes(opt)
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted/50 border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {

      /* ── A: IDENTIDAD ─────────────────────────────────────── */
      case 0: return (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre del Negocio *</label>
              <input type="text" required value={formData.businessName}
                onChange={e => set("businessName", e.target.value)}
                placeholder="Café del Barrio" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nombre del Propietario *</label>
              <input type="text" required value={formData.ownerName}
                onChange={e => set("ownerName", e.target.value)}
                placeholder="Juan García" className={inputClass} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Teléfono / WhatsApp *</label>
              <input type="tel" required value={formData.phone}
                onChange={e => set("phone", e.target.value)}
                placeholder="+57 300 123 4567" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Correo Electrónico *</label>
              <input type="email" required value={formData.email}
                onChange={e => set("email", e.target.value)}
                placeholder="tu@email.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Dirección Física</label>
            <input type="text" value={formData.physicalAddress}
              onChange={e => set("physicalAddress", e.target.value)}
              placeholder="Calle 123 #45-67, Medellín" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Dirección de Correspondencia</label>
            <input type="text" value={formData.mailingAddress}
              onChange={e => set("mailingAddress", e.target.value)}
              placeholder="Si es diferente a la física" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Plan de interés</label>
            <div className="flex flex-wrap gap-2">
              {["Rescate Digital — $10/mes", "Pro Digital — $59/mes", "Automatización Total — $145/mes"].map((option) => {
                const planName = option.split(" —")[0];
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => set("selectedPlan", planName)}
                    className={`px-3 py-2 rounded-lg text-xs font-display border transition ${
                      formData.selectedPlan === planName
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className={labelClass}>Descripción del negocio o emprendimiento *</label>
            <textarea
              required
              value={formData.businessDescription}
              onChange={e => set("businessDescription", e.target.value)}
              placeholder="Cuéntanos qué hace tu negocio, qué lo hace especial y por qué quieres ser rescatado..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Instagram</label>
              <input type="text" value={formData.instagram}
                onChange={e => set("instagram", e.target.value)}
                placeholder="@usuario" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Facebook</label>
              <input type="text" value={formData.facebook}
                onChange={e => set("facebook", e.target.value)}
                placeholder="@pagina" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>TikTok</label>
              <input type="text" value={formData.tiktok}
                onChange={e => set("tiktok", e.target.value)}
                placeholder="@usuario" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Categoría del Negocio *</label>
            <select required value={formData.businessCategory}
              onChange={e => set("businessCategory", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="restaurante">Restaurante / Café</option>
              <option value="retail">Retail / Tienda</option>
              <option value="barberia">Barbería / Peluquería</option>
              <option value="hostal">Hostal / Hotel</option>
              <option value="taller">Taller / Estudio</option>
              <option value="servicio">Servicio Profesional</option>
              <option value="salud">Salud / Bienestar</option>
              <option value="educacion">Educación</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
      );

      /* ── B: OPERACIONES ───────────────────────────────────── */
      case 1: return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Horarios de Atención</label>
            <input type="text" value={formData.hoursOfOperation}
              onChange={e => set("hoursOfOperation", e.target.value)}
              placeholder="Lun-Vie 8am-6pm, Sáb 9am-3pm" className={inputClass} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Número de Empleados</label>
              <select value={formData.numberOfEmployees}
                onChange={e => set("numberOfEmployees", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="solo">Solo yo</option>
                <option value="2-5">2 – 5</option>
                <option value="6-15">6 – 15</option>
                <option value="16-50">16 – 50</option>
                <option value="50+">Más de 50</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tipo de Local</label>
              <select value={formData.locationType}
                onChange={e => set("locationType", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="single">Una sola sede</option>
                <option value="multi">Múltiples sedes</option>
                <option value="mobile">Negocio móvil</option>
                <option value="online">Solo online</option>
              </select>
            </div>
          </div>
          {formData.locationType === "mobile" && (
            <div>
              <label className={labelClass}>Área de Servicio</label>
              <input type="text" value={formData.serviceArea}
                onChange={e => set("serviceArea", e.target.value)}
                placeholder="Ej: Norte de Bogotá, radio 20 km" className={inputClass} />
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sistema de Reservas</label>
              <select value={formData.hasBookingSystem}
                onChange={e => set("hasBookingSystem", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="si">Sí tengo</option>
                <option value="no">No tengo</option>
                <option value="manual">Manual (WhatsApp / llamada)</option>
              </select>
            </div>
            {formData.hasBookingSystem === "si" && (
              <div>
                <label className={labelClass}>¿Cuál sistema?</label>
                <input type="text" value={formData.bookingSystemName}
                  onChange={e => set("bookingSystemName", e.target.value)}
                  placeholder="Calendly, Acuity, otro..." className={inputClass} />
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>Sistema de Punto de Venta (POS)</label>
            <select value={formData.posSystem}
              onChange={e => set("posSystem", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="ninguno">Ninguno</option>
              <option value="square">Square</option>
              <option value="toast">Toast</option>
              <option value="clover">Clover</option>
              <option value="shopify">Shopify POS</option>
              <option value="siigo">Siigo</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
      );

      /* ── C: PRODUCTOS ─────────────────────────────────────── */
      case 2: return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Productos / Servicios que ofreces</label>
            <textarea value={formData.productsServices}
              onChange={e => set("productsServices", e.target.value)}
              placeholder="Lista los principales productos o servicios..." rows={3}
              className={inputClass + " resize-none"} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Rango de Precios</label>
              <select value={formData.pricingRange}
                onChange={e => set("pricingRange", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="bajo">Económico (&lt;$20k)</option>
                <option value="medio">Medio ($20k–$100k)</option>
                <option value="alto">Premium ($100k–$500k)</option>
                <option value="lujo">Lujo (&gt;$500k)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Sistema de Inventario</label>
              <select value={formData.inventorySystem}
                onChange={e => set("inventorySystem", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="ninguno">No uso</option>
                <option value="manual">Manual (papel / Excel)</option>
                <option value="digital">Software digital</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Productos / Servicios más vendidos</label>
            <textarea value={formData.bestSellingItems}
              onChange={e => set("bestSellingItems", e.target.value)}
              placeholder="¿Cuáles son tus estrellas?" rows={2}
              className={inputClass + " resize-none"} />
          </div>
          <div>
            <label className={labelClass}>Proveedores / Aliados principales</label>
            <input type="text" value={formData.suppliers}
              onChange={e => set("suppliers", e.target.value)}
              placeholder="¿De quién te abasteces?" className={inputClass} />
          </div>
        </div>
      );

      /* ── D: CLIENTES ──────────────────────────────────────── */
      case 3: return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Audiencia Objetivo</label>
            <textarea value={formData.targetAudience}
              onChange={e => set("targetAudience", e.target.value)}
              placeholder="¿A quién le vendes? Describe tu cliente ideal..." rows={2}
              className={inputClass + " resize-none"} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Rango de Edad del Cliente</label>
              <select value={formData.ageRange}
                onChange={e => set("ageRange", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="18-24">18 – 24</option>
                <option value="25-34">25 – 34</option>
                <option value="35-44">35 – 44</option>
                <option value="45-54">45 – 54</option>
                <option value="55+">55+</option>
                <option value="mixto">Mixto / Todas las edades</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tamaño de Lista de Email</label>
              <select value={formData.emailListSize}
                onChange={e => set("emailListSize", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="ninguna">No tengo</option>
                <option value="1-100">1 – 100</option>
                <option value="100-500">100 – 500</option>
                <option value="500-2000">500 – 2,000</option>
                <option value="2000+">2,000+</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Canales de Adquisición de Clientes</label>
            <CheckboxGroup
              options={["Visita presencial","Online / Web","Publicidad paga","Referidos","Redes sociales","WhatsApp","Eventos"]}
              field="acquisitionChannels"
              values={formData.acquisitionChannels}
            />
          </div>
          <div>
            <label className={labelClass}>Programa de Fidelización</label>
            <select value={formData.loyaltyProgram}
              onChange={e => set("loyaltyProgram", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="si">Sí tengo</option>
              <option value="no">No tengo</option>
              <option value="planeando">Lo estoy planeando</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Presencia en Reseñas</label>
            <CheckboxGroup
              options={["Google","Yelp","TripAdvisor","Facebook","Booking","Ninguna"]}
              field="reviewsPresence"
              values={formData.reviewsPresence}
            />
          </div>
        </div>
      );

      /* ── E: FINANCIERO ────────────────────────────────────── */
      case 4: return (
        <div className="space-y-4">
          <p className={hintClass}>
            Esta información es opcional y completamente confidencial. Nos ayuda a darte recomendaciones más precisas.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ingresos Mensuales Aproximados</label>
              <select value={formData.monthlyRevenue}
                onChange={e => set("monthlyRevenue", e.target.value)} className={inputClass}>
                <option value="">Prefiero no decir</option>
                <option value="menos-5m">Menos de $5M</option>
                <option value="5m-20m">$5M – $20M</option>
                <option value="20m-50m">$20M – $50M</option>
                <option value="50m-100m">$50M – $100M</option>
                <option value="100m+">Más de $100M</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Valor Promedio por Transacción</label>
              <select value={formData.avgTransactionValue}
                onChange={e => set("avgTransactionValue", e.target.value)} className={inputClass}>
                <option value="">Prefiero no decir</option>
                <option value="menos-20k">Menos de $20k</option>
                <option value="20k-100k">$20k – $100k</option>
                <option value="100k-500k">$100k – $500k</option>
                <option value="500k+">Más de $500k</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Horas / Días Pico del Negocio</label>
            <input type="text" value={formData.peakHours}
              onChange={e => set("peakHours", e.target.value)}
              placeholder="Ej: Viernes-Sábado tarde, hora del almuerzo..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tendencia de Crecimiento Actual</label>
            <select value={formData.growthTrend}
              onChange={e => set("growthTrend", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="creciendo">Creciendo</option>
              <option value="estable">Estable</option>
              <option value="decayendo">Decayendo</option>
              <option value="fluctuante">Fluctuante / Estacional</option>
            </select>
          </div>
        </div>
      );

      /* ── F: DIGITAL ───────────────────────────────────────── */
      case 5: return (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Estado del Sitio Web</label>
              <select value={formData.websiteStatus}
                onChange={e => set("websiteStatus", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="ninguno">No tengo</option>
                <option value="basico">Básico / Informativo</option>
                <option value="avanzado">Avanzado / E-commerce</option>
                <option value="app">App móvil</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado de SEO</label>
              <select value={formData.seoStatus}
                onChange={e => set("seoStatus", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="ninguno">Sin SEO</option>
                <option value="basico">SEO básico</option>
                <option value="activo">SEO activo / trabajado</option>
                <option value="no-se">No sé qué es</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Actividad en Redes Sociales</label>
              <select value={formData.socialMediaActivity}
                onChange={e => set("socialMediaActivity", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="ninguna">Sin redes</option>
                <option value="baja">Baja (1–2/semana)</option>
                <option value="media">Media (3–5/semana)</option>
                <option value="alta">Alta (diario)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Pedidos en Línea</label>
              <select value={formData.onlineOrdering}
                onChange={e => set("onlineOrdering", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="si">Sí acepto pedidos online</option>
                <option value="no">No</option>
                <option value="planeando">Lo estoy planeando</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>¿Usas un CRM?</label>
              <select value={formData.crmUsage}
                onChange={e => set("crmUsage", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no-se">No sé qué es</option>
              </select>
            </div>
            {formData.crmUsage === "si" && (
              <div>
                <label className={labelClass}>¿Cuál CRM?</label>
                <input type="text" value={formData.crmName}
                  onChange={e => set("crmName", e.target.value)}
                  placeholder="HubSpot, Salesforce, otro..." className={inputClass} />
              </div>
            )}
          </div>
        </div>
      );

      /* ── G: DESAFÍOS ──────────────────────────────────────── */
      case 6: return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Principales Desafíos del Negocio</label>
            <CheckboxGroup
              options={["Personal / Equipo","Marketing","Inventario","Flujo de caja","Competencia","Clientes recurrentes","Tecnología","Tiempo"]}
              field="biggestChallenges"
              values={formData.biggestChallenges}
            />
          </div>
          <div>
            <label className={labelClass}>Herramientas que desearías tener</label>
            <textarea value={formData.toolsWished}
              onChange={e => set("toolsWished", e.target.value)}
              placeholder="¿Qué soluciones te harían la vida más fácil?" rows={3}
              className={inputClass + " resize-none"} />
          </div>
          <div>
            <label className={labelClass}>Tareas que más tiempo consumen</label>
            <textarea value={formData.timeConsumingTasks}
              onChange={e => set("timeConsumingTasks", e.target.value)}
              placeholder="¿Qué actividades te quitan más tiempo en el día a día?" rows={3}
              className={inputClass + " resize-none"} />
          </div>
        </div>
      );

      /* ── H: TECNOLOGÍA ────────────────────────────────────── */
      case 7: return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Software que usas actualmente</label>
            <input type="text" value={formData.currentSoftware}
              onChange={e => set("currentSoftware", e.target.value)}
              placeholder="Excel, WhatsApp Business, Google Workspace, etc." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>
              Disposición para adoptar nueva tecnología —{" "}
              <span className="text-primary font-bold">{formData.techWillingness} / 10</span>
            </label>
            <input
              type="range" min="1" max="10"
              value={formData.techWillingness}
              onChange={e => set("techWillingness", e.target.value)}
              className="w-full accent-primary mt-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 — Nada</span>
              <span>10 — Totalmente listo</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>Presupuesto para herramientas digitales / mes</label>
            <select value={formData.digitalBudget}
              onChange={e => set("digitalBudget", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="ninguno">No tengo presupuesto</option>
              <option value="menos-100k">Menos de $100k</option>
              <option value="100k-500k">$100k – $500k</option>
              <option value="500k-1m">$500k – $1M</option>
              <option value="1m+">Más de $1M</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Intereses en Automatización</label>
            <CheckboxGroup
              options={["IA / Chatbots","Automatización de procesos","Reservas online","Dashboards de análisis","Marketing automático","Gestión de inventario","Facturación automática"]}
              field="techInterests"
              values={formData.techInterests}
            />
          </div>
        </div>
      );

      /* ── I+J: LEGAL & AVANZADO ────────────────────────────── */
      case 8: return (
        <div className="space-y-4">
          <p className={hintClass}>
            Sección opcional. Solo comparte lo que te sientas cómodo compartiendo.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Licencia de Funcionamiento</label>
              <select value={formData.businessLicense}
                onChange={e => set("businessLicense", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="al-dia">Al día</option>
                <option value="en-proceso">En proceso</option>
                <option value="no">No tengo</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Seguro Empresarial</label>
              <select value={formData.insurance}
                onChange={e => set("insurance", e.target.value)} className={inputClass}>
                <option value="">Selecciona...</option>
                <option value="si">Sí tengo</option>
                <option value="no">No tengo</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Certificaciones / Reconocimientos</label>
            <input type="text" value={formData.certifications}
              onChange={e => set("certifications", e.target.value)}
              placeholder="ISO, premios, certificaciones del sector..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tendencias Estacionales</label>
            <textarea value={formData.seasonalTrends}
              onChange={e => set("seasonalTrends", e.target.value)}
              placeholder="¿Tu negocio tiene picos en ciertas épocas del año?" rows={2}
              className={inputClass + " resize-none"} />
          </div>
          <div>
            <label className={labelClass}>Tasa de Retención de Clientes</label>
            <select value={formData.retentionRate}
              onChange={e => set("retentionRate", e.target.value)} className={inputClass}>
              <option value="">Selecciona...</option>
              <option value="baja">Baja (&lt;30%)</option>
              <option value="media">Media (30–60%)</option>
              <option value="alta">Alta (&gt;60%)</option>
              <option value="no-se">No lo sé</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Estrategias de Upsell / Cross-sell</label>
            <textarea value={formData.upsellStrategies}
              onChange={e => set("upsellStrategies", e.target.value)}
              placeholder="¿Cómo aumentas el valor por cliente?" rows={2}
              className={inputClass + " resize-none"} />
          </div>
          <div>
            <label className={labelClass}>Procesos Internos Clave</label>
            <textarea value={formData.internalWorkflows}
              onChange={e => set("internalWorkflows", e.target.value)}
              placeholder="Describe brevemente cómo fluye el trabajo internamente..." rows={2}
              className={inputClass + " resize-none"} />
          </div>
          <div>
            <label className={labelClass}>¿Algo más que quieras contarnos?</label>
            <textarea value={formData.message}
              onChange={e => set("message", e.target.value)}
              placeholder="Cualquier detalle adicional..." rows={3}
              className={inputClass + " resize-none"} />
          </div>
        </div>
      );
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep  = currentStep === steps.length - 1;

  const canProceed = currentStep !== 0 || (
    formData.businessName.trim()        !== "" &&
    formData.ownerName.trim()           !== "" &&
    formData.phone.trim()               !== "" &&
    formData.email.trim()               !== "" &&
    formData.businessCategory           !== "" &&
    formData.businessDescription.trim() !== ""
  );

  const closeModal = () => setStatus("idle");

  return (
    <>
      {/* ── MODAL POPUP ─────────────────────────────────────── */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
              className={`relative glass-card rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl ${
                status === "success" ? "neon-border" : "border border-destructive/50"
              }`}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              >
                <X size={18} />
              </button>

              {status === "success" ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                    <Zap size={32} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    ¡Solicitud Enviada!
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-1">
                    Recibimos tu información correctamente.
                  </p>
                  <p className="text-muted-foreground font-body text-sm mb-6">
                    Revisaremos tu caso y te contactaremos pronto por{" "}
                    <span className="text-foreground font-semibold">WhatsApp o correo</span> para coordinar tu rescate digital.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-xs font-display text-primary font-semibold mb-6">
                    <CheckCircle size={13} />
                    Solo 2 negocios seleccionados por semana
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-display font-bold text-base hover:brightness-110 transition neon-glow"
                  >
                    Cerrar
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-5">
                    <AlertTriangle size={32} className="text-destructive" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Error al Enviar
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-6">
                    No se pudo enviar tu solicitud. Verifica tu conexión a internet e intenta de nuevo.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-3 rounded-xl font-display font-semibold text-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          const btn = document.querySelector<HTMLButtonElement>('button[type="submit"]');
                          btn?.click();
                        }, 100);
                      }}
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-display font-bold text-sm hover:brightness-110 transition"
                    >
                      Reintentar
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-6 glass-card neon-border rounded-xl px-6 py-4 flex items-start gap-3"
          >
            <span className="text-primary text-lg mt-0.5">⚡</span>
            <p className="text-sm font-body text-foreground/90 text-left">
              <span className="font-display font-bold text-primary">Solo 2 negocios por semana</span>{" "}
              son seleccionados para el rescate en vivo. Completa tus datos y podrías aparecer en el próximo capítulo.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Terminal header */}
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

          {/* Progress */}
          <div className="px-6 pt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-display text-muted-foreground">
                {steps[currentStep].title}
              </span>
              <span className="text-xs font-body text-muted-foreground">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Step pills */}
            <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
              {steps.map((step, idx) => {
                const Icon = step.Icon;
                const done    = idx < currentStep;
                const active  = idx === currentStep;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => done && setCurrentStep(idx)}
                    title={step.title}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-body whitespace-nowrap flex-shrink-0 transition ${
                      active  ? "bg-primary text-primary-foreground" :
                      done    ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30" :
                                "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                    }`}
                  >
                    <Icon size={10} />
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
              >
                <div className="mb-5">
                  <h3 className="font-display font-bold text-foreground text-lg leading-tight">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {steps[currentStep].subtitle}
                  </p>
                </div>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition font-display font-semibold text-sm"
                >
                  <ChevronLeft size={15} />
                  Atrás
                </button>
              )}

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => s + 1)}
                  disabled={!canProceed}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-display font-bold text-base hover:brightness-110 transition neon-glow disabled:opacity-40"
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-lg hover:brightness-110 transition neon-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
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
              )}
            </div>

            {isLastStep && (
              <p className="text-center text-muted-foreground text-xs mt-4">
                Al enviar, aceptas ser contactado por WhatsApp o correo para coordinar tu rescate digital.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default LeadForm;
