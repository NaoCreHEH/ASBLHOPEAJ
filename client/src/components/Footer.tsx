import { Facebook, Instagram } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-hope-yellow text-black py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Soutien</h3>
            <p className="text-lg">
              Ensemble contre le harcèlement,
              <br />
              redonnons de l'espoir.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <a
              href="mailto:contact@asbl-hope.org"
              className="text-lg hover:underline"
            >
              contact@asbl-hope.org
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterForm />
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={32} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={32} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="TikTok"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/20 text-center">
          <p>© 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
