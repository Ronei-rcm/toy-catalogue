
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter subscription functionality
    console.log('Subscribe to newsletter');
  };

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
              <Package className="h-7 w-7" />
              <span>ToyWorld</span>
            </Link>
            <p className="text-muted-foreground">
              Bringing joy and learning through quality toys for all ages.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Toy Street, Fun City, FC 12345, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="mailto:info@toyworld.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@toyworld.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to receive updates and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="glass-input rounded-full"
              />
              <Button type="submit" className="rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ToyWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
