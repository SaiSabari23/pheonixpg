import { Link } from "wouter";
const logoPath = "/Logo.png";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0505] border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoPath} alt="Phoenix Logo" className="w-10 h-10 object-contain" />
              <span className="font-display font-bold text-xl tracking-wide text-foreground">
                PHOENIX PG
              </span>
            </div>
            <p className="text-muted-foreground">
              A premium, safe, and comfortable living space exclusively designed for women. Rise with comfort, stay with safety.
            </p>
          </div>

          {/* Bookings CTA */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Bookings</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/booking" className="text-primary hover:text-accent transition-colors font-medium">
                  Book Your Room Now →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Location */}
<div className="mb-8">
  <h4 className="text-foreground font-semibold mb-3">Location</h4>
  <a
    href="https://maps.app.goo.gl/BLW2weir1GgkH8qs6?g_st=aw"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
  >
    📍 View Phoenix Womens PG on Google Maps
  </a>
</div>

<div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4"></div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {currentYear} Kriyo Tek teams. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
