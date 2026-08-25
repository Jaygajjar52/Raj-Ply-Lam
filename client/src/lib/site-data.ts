import PlywoodImage from "@/Images/Plywood.jpg";
import WoodenPatti from "@/Images/Wooden Patti.jpeg";
import Flushdoor from "@/Images/flush doors.jpg";
import PVCBoard from "@/Images/PVC Board.png";
import Timber from "@/Images/Timber.jpg";
import Laminate from "@/Images/Laminates.jpg";
import MDF from "@/Images/MDF.jpg";
import AcrylicLaminate from "@/Images/Acrylic Sheet.png";
import * as BrandLogos from "@/Brands";
export const COMPANY = {
  name: "Raj Ply Lam",
  tagline: "Quality Plywood,Designer Laminates",
  owner: "Naresh Gajjar",
  since: 1998,
  phone: "+91 9427049594",
  phoneRaw: "919427049594",
  email: "contact.rajplylam@gmail.com",
  address: {
    line1: "Raj Ply Lam , HK Complex, 120 Feet Ring Road",
    line2: "Yogeshwar Nagar Society, Bhatta, Paldi",
    city: "Ahmedabad, Gujarat - 380007",
  },
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday", time: "10:00 AM – 2:00 PM" },
  ],
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Raj+Ply+Lam&ll=23.0064904,72.5514704&z=17&output=embed",
  mapsUrl:
    "https://www.google.com/maps/place/Raj+Ply+Lam/@23.0064904,72.5514704,17z/data=!3m1!4b1!4m6!3m5!1s0x395e85d20217d655:0xd953b8004ba0b064!8m2!3d23.0064904!4d72.5514704!16s%2Fg%2F11q83hb5qn?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
};

export const WHATSAPP_MESSAGE =
  "Hello Raj Ply Lam, I would like to know more about your products.";

export const STATS = [
  { label: "Years of Trust", value: 29, suffix: "+" },
  { label: "Happy Customers", value: 5000, suffix: "+" },
  { label: "Laminate Designs", value: 3000, suffix: "+" },
  { label: "Partner Brands", value: 50, suffix: "+" },
];

export const PRODUCTS = [
  {
    id: "plywood",
    name: "Plywood",
    description: "Marine & commercial grade plywood built for strength and longevity.",
    image: PlywoodImage,
  },
  {
    id: "timber",
    name: "Timber",
    description: "Seasoned, authentic timber sourced for structural and furniture use.",
    image: Timber,
  },
  {
    id: "flush-doors",
    name: "Flush Doors",
    description: "Termite-resistant flush doors with a smooth, factory finish.",
    image: Flushdoor,
  },
  {
    id: "pvc-boards",
    name: "PVC Boards",
    description: "Waterproof PVC boards, ideal for kitchens and wet areas.",
    image: PVCBoard,
  },
  {
    id: "laminates",
    name: "Laminates",
    description: "3000+ designs across textures, finishes and leading brands.",
    image: Laminate,
  },
  {
    id: "hardware",
    name: "Hardware",
    description: "Premium fittings, hinges, channels and interior hardware.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "mdf",
    name: "MDF",
    description: "High-density MDF boards for modular and modern interiors.",
    image: MDF,
  },
  {
    id: "interior-solutions",
    name: "Interior Solutions",
    description: "End-to-end material planning for architects and contractors.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "wooden Binding Patti",
    name: "Wooden Binding Patti",
    description: "Marine & commercial grade plywood built for strength and longevity.",
    image: WoodenPatti,
  },
  {
    id: "Acrylic Laminate Sheets",
    name: "Acrylic Laminate Sheets",
    description: "High-quality acrylic laminate sheets for durable and attractive surfaces.",
    image: AcrylicLaminate,
  },
];

export const BRANDS = [
  {
    name: "Virgo Laminates",
    logo: BrandLogos.Virgo,
  },
  {
    name: "Royal Touché",
    logo: BrandLogos.RoyalTouche,
  },
  {
    name: "Century Laminates",
    logo: BrandLogos.Century,
  },
  {
    name: "Timex MICA",
    logo: BrandLogos.Timex,
  },
  {
    name: "VITA Hardware",
    logo: BrandLogos.Vita,
  },
  {
    name: "Action TESA",
    logo: BrandLogos.ActionTESA,
  },
  {
    name: "Greenpanel",
    logo: BrandLogos.Greenpanel,
  },
  {
    name: "CrossBond MDF",
    logo: BrandLogos.CrossBond,
  },
];

export const SERVICES = [
  { title: "Material Consulting", description: "Expert guidance to help you select the ideal plywood, laminates, and interior materials for every project." },
  { title: "Bulk Orders", description: "Competitive pricing and dedicated support for residential, commercial, and large-scale projects." },
  { title: "Same-Day Site Delivery", description: "Fast, reliable and Direct delivery to your site across Ahmedabad as per requirements." },
  { title: "Large Collection & Catalogue", description: "Browse our comprehensive catalogue featuring hundreds of designs, textures, finishes, and premium brands." },
  { title: "Architect Support", description: "Sample kits and technical specs for architects and designers." },
  { title: "Quality & Rate Assurance", description: "Every product is sourced from trusted brands to ensure durability with Affordable Rates and a premium finish." },
];

export const TESTIMONIALS = [
  {
    name: "Dhiren Gajjar",
    rating: 5,
    text: "Had an excellent shopping experience at Raj Ply Lam. Product quality and customer support were outstanding.",
  },
  {
    name: "Vijay Champanera",
    rating: 5,
    text: "Raj Ply Lam offers an impressive range of laminates and hardware. Highly recommended.",
  },
  {
    name: "Arvind Bhai",
    rating: 5,
    text: "The team guided us throughout the selection process and provided the best products within our budget.",
  },
  {
    name: "Nilesh Patel",
    rating: 5,
    text: "Genuine products and transparent pricing. A trusted name in Ahmedabad.",
  },
  {
    name: "Harsh Shah",
    rating: 5,
    text: "Excellent service and timely delivery. Their laminate collection is amazing.",
  },
];

export const WHY_CHOOSE_US = [
  "Trusted Since 1998",
  "100% Authentic Products",
  "Same-Day Delivery",
  "Competitive Pricing",
  "Expert Guidance",
  "Transparent Billing",
];

export const ABOUT_SERVICES = [
  "Authentic Products",
  "Competitive Pricing",
  "Same-Day Delivery",
  "Gujarat Delivery",
  "Contractor Support",
  "Architect Assistance",
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
