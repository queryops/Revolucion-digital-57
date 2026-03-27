import { Zap } from "lucide-react";

const socialLinks = [
  { label: "TikTok", href: "https://www.tiktok.com/@zipautomation.stu?is_from_webapp=1&sender_device=pc" },
  { label: "Instagram", href: "https://www.instagram.com/zipautomationz/" },
  { label: "WhatsApp", href: "https://wa.me/573504605319" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585007545143" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Zap size={14} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-sm">
              ZipAutomation Studios
            </span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-xs font-body">
            © {new Date().getFullYear()} ZipAutomation Studios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
