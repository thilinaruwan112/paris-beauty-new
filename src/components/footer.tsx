import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-headline text-xl mb-4">Glamify</h3>
            <p className="text-muted-foreground text-sm">
              Elegance in every shade. Discover premium cosmetics that celebrate your unique beauty.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Makeup</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Skincare</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Haircare</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Fragrance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Stay Connected</h4>
            <p className="text-muted-foreground text-sm mb-2">Join our newsletter for exclusive offers.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link href="#"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Glamify. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
