# VARCAS Electric Vehicles - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium electric vehicle manufacturers (Tesla, Rivian) and modern automotive websites, combined with clean corporate design patterns. The design should communicate innovation, sustainability, and trust while maintaining the established VARCAS brand identity.

**Key Design Principles**:
- Professional yet approachable
- Technology-forward with smart/connected features highlighted
- Environmental consciousness through clean, efficient design
- Trust-building through certifications and social proof

## Color Palette

**Primary Colors (Dark Mode Optimized)**:
- Brand Yellow/Gold: 45 95% 55% - Hero CTAs, accent elements, hover states
- Deep Black: 0 0% 10% - Primary backgrounds, headers
- Charcoal: 0 0% 15% - Card backgrounds, secondary sections
- Soft Black: 0 0% 20% - Elevated surfaces

**Accent Colors**:
- Brand Red: 0 85% 55% - Limited use for urgent CTAs, badges (IATF/ISO)
- Electric Blue: 210 100% 60% - GPS/Tech features, connectivity icons

**Neutral Colors**:
- White: 0 0% 98% - Primary text on dark backgrounds
- Light Gray: 0 0% 70% - Secondary text
- Border Gray: 0 0% 25% - Dividers, borders

## Typography

**Font Families**:
- Headers: 'Inter' or 'Poppins' - Bold, modern, tech-forward (600-700 weight)
- Body: 'Inter' - Clean readability (400-500 weight)
- Accent/Stats: 'Space Grotesk' - For numbers and technical specifications (500-600 weight)

**Type Scale**:
- Hero H1: text-5xl md:text-7xl (bold)
- Section H2: text-3xl md:text-5xl (semibold)
- Card H3: text-xl md:text-2xl (semibold)
- Body: text-base md:text-lg
- Small/Captions: text-sm

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Container max-width: max-w-7xl
- Card padding: p-6 md:p-8
- Grid gaps: gap-6 md:gap-8 lg:gap-12

**Grid System**:
- Vehicle cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Feature cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Stats counters: grid-cols-2 md:grid-cols-4

## Component Library

**Navigation**:
- Sticky header with dark background (bg-black/95 backdrop-blur)
- Logo left, main navigation center, CTA button right
- Mobile: Hamburger menu with slide-out panel
- Mega menu for "Models" dropdown showing all vehicles with thumbnails

**Hero Section**:
- Full-width hero with large background image/video
- Overlay gradient (from black/80 to transparent)
- Centered content with headline, subheadline, dual CTAs
- Height: min-h-[600px] lg:min-h-[800px]
- Scroll indicator at bottom

**Vehicle Cards**:
- Image at top, model name, key specs (range, battery), "Know More" button
- Hover: Lift effect (translate-y-2), border glow in brand yellow
- Background: Charcoal with subtle border

**Feature Cards** (Smart Features):
- Icon at top (using Lucide React icons)
- Title, description
- Minimal padding, clean presentation
- Background: Soft black with hover state

**Stats Counter**:
- Large numbers in Space Grotesk
- Animated count-up on scroll into view
- Icon + Number + Label layout
- Yellow accent on hover

**Testimonial Cards**:
- Customer photo (circular), quote, name, role
- Carousel with dots navigation
- Card style: dark background with subtle shadow

**Footer**:
- Multi-column layout: Company Info, Quick Links, Models, Contact
- Newsletter signup with inline form
- Social media icons
- Certifications badges (IATF, ISO)
- Bottom bar: Copyright, Privacy Policy

**Admin Dashboard Components**:
- Sidebar navigation with sections
- Content editor with image upload
- Vehicle management table with add/edit/delete
- Banner carousel manager
- Testimonials manager
- Simple WYSIWYG for text content

## Page-Specific Layouts

**Home Page**:
1. Hero with rotating banners (admin managed)
2. Quick stats bar (30k+ customers, 250+ centers)
3. Featured vehicles grid (4 latest models)
4. Smart & Connected features section (3-column grid)
5. About preview (2-column: text + certification badges)
6. Environmental impact section (icon grid)
7. Color options showcase (horizontal scroll)
8. Partners logos grid
9. Testimonials carousel
10. Become a Dealer CTA banner
11. Footer

**Vehicle Landing Page**:
1. Hero with vehicle image gallery
2. Key specs highlight bar (range, battery, GPS)
3. Two-column: Description + Tech Specs table
4. Color variants showcase
5. Features grid (6-8 key features)
6. Enquire Now form (sticky sidebar or modal)
7. Related models carousel

**About Us**:
1. Hero with team image
2. Mission statement (centered, large text)
3. Values grid (Reliable, Sustainable, Affordable)
4. Timeline/History section
5. Certifications showcase
6. Team structure (if available)

**Find Dealer**:
1. Search by location form
2. Dealer cards with map integration
3. Contact details, opening hours

**Buy Spares**:
1. Category grid with Shopify links
2. Each category: Image, name, "Shop Now" button

## Images

**Required Images**:
- Hero: Large, high-quality lifestyle shots of VARCAS e-bikes in urban settings (1920x1080+)
- Vehicle models: Professional product photography on clean backgrounds, multiple angles
- Team: Professional group photo or office environment
- Features: Icon-based, minimal photography
- Environmental: Illustration-style or photography of clean cities
- Testimonials: Real customer photos (circular crops)
- Partners: Logo images on transparent backgrounds

**Image Treatment**:
- Subtle overlay gradients on hero images for text readability
- Consistent aspect ratios per section (16:9 for heroes, 4:3 for product cards)
- Lazy loading for performance

## Animations

**Minimal, Purposeful Motion**:
- Scroll-triggered fade-ins for sections (use Intersection Observer)
- Stats counter animation on scroll
- Smooth hover transitions (200ms ease-in-out)
- Page transitions: Simple fade
- NO complex parallax or excessive motion

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios
- Full dark mode design (primary)
- Focus states with yellow outline
- Keyboard navigation support
- Alt text for all images
- Semantic HTML structure

This design creates a premium, technology-forward experience that positions VARCAS as an innovative, trustworthy electric vehicle manufacturer while maintaining accessibility and performance.