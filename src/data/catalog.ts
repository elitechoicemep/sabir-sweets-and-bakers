import heroMithai from "@/assets/hero-mithai.jpg";
import mithaiArt from "@/assets/mithai-art.jpg";
import bakeryOven from "@/assets/bakery-oven.jpg";
import nashtaImg from "@/assets/nashta.jpg";
import mixMithaiImg from "@/assets/sweets/mix-mithai.jpg";
import barfiImg from "@/assets/sweets/barfi.jpg";
import badamBarfiImg from "@/assets/sweets/badam-barfi.jpg";
import qalaqandImg from "@/assets/sweets/qalaqand.jpg";
import pethaImg from "@/assets/sweets/petha.jpg";
import patisaImg from "@/assets/sweets/patisa.jpg";
import panPairayImg from "@/assets/sweets/pan-pairay.jpg";
import gulabJamunImg from "@/assets/sweets/gulab-jamun.jpg";
import malaiGulabJamunImg from "@/assets/sweets/malai-gulab-jamun.jpg";
import chamChamImg from "@/assets/sweets/cham-cham.jpg";
import malaiChamChamImg from "@/assets/sweets/malai-cham-cham.jpg";
import balushahiImg from "@/assets/sweets/balushahi.jpg";
import amartiImg from "@/assets/sweets/amarti.jpg";
import ladduImg from "@/assets/sweets/laddu.jpg";
import ladduSpecialImg from "@/assets/sweets/laddu-special.jpg";
import maisooImg from "@/assets/sweets/maisoo.jpg";
import shakarparaImg from "@/assets/sweets/shakarpara.jpg";
import pheniyanImg from "@/assets/sweets/pheniyan.jpg";
import gajarPakHalwaImg from "@/assets/sweets/gajar-pak-halwa.jpg";
import rasmalaiImg from "@/assets/sweets/rasmalai.jpg";
import badanaImg from "@/assets/sweets/badana.jpg";
import jalebiImg from "@/assets/sweets/jalebi.jpg";
import meethayPakorayImg from "@/assets/sweets/meethay-pakoray.jpg";
import samosaImg from "@/assets/sweets/samosa.jpg";
import puriImg from "@/assets/sweets/puri.jpg";
import qeemaTikkiImg from "@/assets/sweets/qeema-tikki.jpg";
import chickenTikkiImg from "@/assets/sweets/chicken-tikki.jpg";
import namakParayImg from "@/assets/sweets/namak-paray.jpg";
import mixNamkoImg from "@/assets/sweets/mix-namko.jpg";
import type { Category, CategoryId, Product } from "@/types";

export const categoryImages: Record<CategoryId, string> = {
  mithai: mixMithaiImg,
  laddu: ladduImg,
  khasta: shakarparaImg,
  halwa: gajarPakHalwaImg,
  namkeen: samosaImg,
};

export const categories: Category[] = [
  { id: "mithai", name: "Mithai & Barfi", nameUr: "مٹھائی اور برفی", image: mixMithaiImg },
  { id: "laddu", name: "Laddu & Maisoo", nameUr: "لڈو اور میسو", image: ladduImg },
  { id: "khasta", name: "Khasta", nameUr: "کھستہ", image: shakarparaImg },
  { id: "halwa", name: "Halwa", nameUr: "حلوہ", image: gajarPakHalwaImg },
  { id: "namkeen", name: "Namkeen & Snacks", nameUr: "نمکین اور اسنیکس", image: samosaImg },
];

/** Sizes offered on every mithai, priced from the shop rate list (per kg). */
export const SIZES = [0.5, 1, 2] as const;

export function sizeLabel(kg: number): string {
  return kg === 0.5 ? "0.5 kg" : `${kg} kg`;
}

export function sizeLabelUr(kg: number): string {
  if (kg === 0.5) return "آدھا کلو";
  if (kg === 2) return "۲ کلو";
  return "۱ کلو";
}

/** Prices follow the shop's official rate list (per kg). */
export const products: Product[] = [
  {
    id: "mix-mithai",
    name: "Mix Mithai",
    nameUr: "مکس مٹھائی",
    category: "mithai",
    description: "An assortment of our counter favourites on one tray.",
    descriptionUr: "ہمارے کاؤنٹر کی پسندیدہ مٹھائیوں کا مجموعہ۔",
    pricePerKg: 850,
    image: mixMithaiImg,
    featured: true,
  },
  {
    id: "sada-barfi",
    name: "Sada Barfi",
    nameUr: "سادہ برفی",
    category: "mithai",
    description: "Milk-rich plain barfi, cut fresh from the tray.",
    descriptionUr: "دودھ سے بھرپور سادہ برفی، تھال سے تازہ کاٹی گئی۔",
    pricePerKg: 900,
    image: barfiImg,
    featured: true,
  },
  {
    id: "badam-barfi",
    name: "Badam Barfi",
    nameUr: "بادام برفی",
    category: "mithai",
    description: "Almond barfi finished with silver leaf.",
    descriptionUr: "بادام برفی، چاندی کے ورق کے ساتھ۔",
    pricePerKg: 1000,
    image: badamBarfiImg,
    featured: true,
  },
  {
    id: "qalaqand",
    name: "Qalaqand",
    nameUr: "قلاقند",
    category: "mithai",
    description: "Grainy milk cake, slow-set and lightly sweet.",
    descriptionUr: "دانے دار ملک کیک، دھیمی آنچ پر تیار۔",
    pricePerKg: 1000,
    image: qalaqandImg,
    featured: true,
  },
  {
    id: "patisa",
    name: "Patisa",
    nameUr: "پتیسہ",
    category: "mithai",
    description: "Flaky layered patisa that melts on the tongue.",
    descriptionUr: "تہہ دار پتیسہ، منہ میں گھل جانے والا۔",
    pricePerKg: 900,
    image: patisaImg,
    featured: true,
  },
  {
    id: "petha",
    name: "Petha",
    nameUr: "پیٹھا",
    category: "mithai",
    description: "Sugar-glazed petha cubes, crystal clear and juicy.",
    descriptionUr: "شیرے میں تیار پیٹھے کے ٹکڑے، رسیلے اور شفاف۔",
    pricePerKg: 900,
    image: pethaImg,
  },
  {
    id: "pan-pairay",
    name: "Pan Pairay",
    nameUr: "پان پئیرے",
    category: "mithai",
    description: "Pan-flavoured mithai with a cool, fragrant finish.",
    descriptionUr: "پان کے ذائقے والی مٹھائی، خوشبودار اور ٹھنڈی۔",
    pricePerKg: 1000,
    image: panPairayImg,
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    nameUr: "گلاب جامن",
    category: "mithai",
    description: "Soft, warm and syrup-soaked.",
    descriptionUr: "نرم، گرم اور شیرے میں ڈوبی ہوئی روایتی مٹھاس۔",
    pricePerKg: 900,
    image: gulabJamunImg,
    featured: true,
  },
  {
    id: "malai-gulab-jamun",
    name: "Malai Gulab Jamun",
    nameUr: "ملائی گلاب جامن",
    category: "mithai",
    description: "Gulab jamun layered with fresh malai.",
    descriptionUr: "گلاب جامن، تازہ ملائی کے ساتھ۔",
    pricePerKg: 900,
    image: malaiGulabJamunImg,
  },
  {
    id: "cham-cham",
    name: "Cham Cham",
    nameUr: "چم چم",
    category: "mithai",
    description: "Light chenna rolls rolled in coconut.",
    descriptionUr: "ہلکے پھلکے چھینے کے رول، ناریل میں لپٹے۔",
    pricePerKg: 900,
    image: chamChamImg,
    featured: true,
  },
  {
    id: "malai-cham-cham",
    name: "Malai Cham Cham",
    nameUr: "ملائی چم چم",
    category: "mithai",
    description: "Cham cham filled with thick malai.",
    descriptionUr: "چم چم، گاڑھی ملائی کی بھرائی کے ساتھ۔",
    pricePerKg: 900,
    image: malaiChamChamImg,
  },
  {
    id: "balushahi",
    name: "Balushahi",
    nameUr: "بالوشاہی",
    category: "mithai",
    description: "Crisp-edged, sugar-glazed and flaky inside.",
    descriptionUr: "کرارے کنارے، شیرے میں ڈوبی اور اندر سے تہہ دار۔",
    pricePerKg: 900,
    image: balushahiImg,
    featured: true,
  },
  {
    id: "amarti",
    name: "Amartian",
    nameUr: "امرتیاں",
    category: "mithai",
    description: "Crisp syrup-dipped spirals, fried through the day.",
    descriptionUr: "کرارے مروڑ، شیرے میں ڈبوئے، دن بھر تازہ۔",
    pricePerKg: 900,
    image: amartiImg,
  },
  {
    id: "laddu",
    name: "Laddu",
    nameUr: "لڈو",
    category: "laddu",
    description: "Classic besan laddu with almond and pista.",
    descriptionUr: "روایتی بیسن کے لڈو، بادام اور پستے کے ساتھ۔",
    pricePerKg: 900,
    image: ladduImg,
    featured: true,
  },
  {
    id: "laddu-special",
    name: "Laddu Special",
    nameUr: "لڈو اسپیشل",
    category: "laddu",
    description: "Our richest laddu, loaded with dry fruit.",
    descriptionUr: "ہمارا بھرپور لڈو، خشک میوے سے بھرا۔",
    pricePerKg: 1200,
    image: ladduSpecialImg,
    featured: true,
  },
  {
    id: "maisoo",
    name: "Maisoo",
    nameUr: "میسو",
    category: "laddu",
    description: "Ghee-rich maisoo with a grainy bite.",
    descriptionUr: "دیسی گھی سے بھرپور میسو، دانے دار ذائقہ۔",
    pricePerKg: 900,
    image: maisooImg,
  },
  {
    id: "shakarpara",
    name: "Shakar Paray",
    nameUr: "شکر پارے",
    category: "khasta",
    description: "Crisp sugar-glazed shakar paray for the tea tray.",
    descriptionUr: "کرارے شکر پارے، چائے کے ساتھ بہترین۔",
    pricePerKg: 560,
    image: shakarparaImg,
    featured: true,
  },
  {
    id: "pheniyan",
    name: "Pheniyan",
    nameUr: "پھینیاں",
    category: "khasta",
    description: "Fine roasted vermicelli nests — light, crisp and khasta.",
    descriptionUr: "باریک بھنی ہوئی پھینیاں، ہلکی اور کرارى۔",
    pricePerKg: 800,
    image: pheniyanImg,
  },
  {
    id: "gajar-pak-halwa",
    name: "Gajar Pak Halwa",
    nameUr: "گاجر پاک حلوہ",
    category: "halwa",
    description: "Slow-cooked carrot halwa rich with ghee, khoya and dry fruit.",
    descriptionUr: "دھیمی آنچ پر پکا گاجر کا حلوہ، گھی، کھویا اور میوے کے ساتھ۔",
    pricePerKg: 1000,
    image: gajarPakHalwaImg,
    featured: true,
  },
  {
    id: "rasmalai",
    name: "Rasmalai",
    nameUr: "رس ملائی",
    category: "mithai",
    description: "Soft chenna discs resting in saffron-scented thickened milk. Priced per piece.",
    descriptionUr: "نرم چھینے کی ٹکیاں، زعفرانی گاڑھے دودھ میں۔ فی عدد قیمت۔",
    pricePerKg: 120,
    unit: "piece",
    image: rasmalaiImg,
    featured: true,
  },
  {
    id: "badana",
    name: "Badana",
    nameUr: "بادانہ",
    category: "mithai",
    description: "Sweet gram-flour boondi pearls, light and syrup-kissed.",
    descriptionUr: "میٹھے بیسن کے بوندی دانے، ہلکے اور شیرے میں لپٹے۔",
    pricePerKg: 560,
    image: badanaImg,
  },
  {
    id: "jalebi",
    name: "Jalebian",
    nameUr: "جلیبیاں",
    category: "mithai",
    description: "Crisp golden spirals soaked in warm syrup, fried all day.",
    descriptionUr: "کرارى سنہری جلیبیاں، گرم شیرے میں ڈوبی، دن بھر تازہ۔",
    pricePerKg: 560,
    image: jalebiImg,
    featured: true,
  },
  {
    id: "meethay-pakoray",
    name: "Meethay Pakoray",
    nameUr: "میٹھے پکوڑے",
    category: "khasta",
    description: "Sweet fried pakoray with a sugary crust — a tea-time favourite.",
    descriptionUr: "میٹھے پکوڑے، اوپر سے شکر کی تہہ — چائے کے ساتھ بہترین۔",
    pricePerKg: 560,
    image: meethayPakorayImg,
  },
  {
    id: "namak-paray",
    name: "Namak Paray",
    nameUr: "نمک پارے",
    category: "namkeen",
    description: "Crunchy salted pastry strips, freshly fried in small batches.",
    descriptionUr: "کرارے نمک پارے، تازہ تلے ہوئے۔",
    pricePerKg: 560,
    image: namakParayImg,
    featured: true,
  },
  {
    id: "mix-namko",
    name: "Mix Namko",
    nameUr: "مکس نمکو",
    category: "namkeen",
    description: "Our house namkeen mix of sev, lentils and nuts.",
    descriptionUr: "گھر کا خاص نمکین مکس — سیو، دالیں اور میوے۔",
    pricePerKg: 1000,
    image: mixNamkoImg,
  },
  {
    id: "samosa",
    name: "Samosa",
    nameUr: "سموسہ",
    category: "namkeen",
    description: "Hot, crisp samosa with spiced potato filling. Priced per piece.",
    descriptionUr: "گرم کرارا سموسہ، مصالحہ دار آلو کی بھرائی۔ فی عدد قیمت۔",
    pricePerKg: 60,
    unit: "piece",
    image: samosaImg,
    featured: true,
  },
  {
    id: "puri",
    name: "Puri",
    nameUr: "پوڑی",
    category: "namkeen",
    description: "Puffed fried puri, best with halwa and chana. Priced per piece.",
    descriptionUr: "پھولی ہوئی تلی پوڑی، حلوہ چنے کے ساتھ لاجواب۔ فی عدد قیمت۔",
    pricePerKg: 60,
    unit: "piece",
    image: puriImg,
  },
  {
    id: "qeema-tikki",
    name: "Qeema Tikki",
    nameUr: "قیمے والی ٹکی",
    category: "namkeen",
    description: "Spiced mince tikki, shallow-fried to order. Priced per piece.",
    descriptionUr: "مصالحہ دار قیمے کی ٹکی، تازہ تلی ہوئی۔ فی عدد قیمت۔",
    pricePerKg: 150,
    unit: "piece",
    image: qeemaTikkiImg,
  },
  {
    id: "chicken-tikki",
    name: "Chicken Tikki",
    nameUr: "چکن ٹکی",
    category: "namkeen",
    description: "Golden chicken tikki, crisp outside and juicy inside. Priced per piece.",
    descriptionUr: "سنہری چکن ٹکی، باہر سے کرارى اور اندر سے رسیلی۔ فی عدد قیمت۔",
    pricePerKg: 150,
    unit: "piece",
    image: chickenTikkiImg,
  },
];

/** Builds a size-specific product (0.5 / 1 / 2 kg) used by the cart. */
export function variantProduct(product: Product, kg: number): Product {
  if (product.unit === "piece") {
    return { ...product, baseId: product.id, price: product.pricePerKg, weight: "1 pc", weightUr: "۱ عدد" };
  }
  return {
    ...product,
    id: `${product.id}@${kg}`,
    baseId: product.id,
    sizeKg: kg,
    price: product.pricePerKg === null ? null : Math.round(product.pricePerKg * kg),
    weight: sizeLabel(kg),
    weightUr: sizeLabelUr(kg),
  };
}

/** Resolves a stored cart id (with or without a size suffix) back to a product. */
export function resolveCartProduct(id: string): Product | null {
  const [base, kg] = id.split("@");
  const product = products.find((p) => p.id === base);
  if (!product) return null;
  return kg ? variantProduct(product, Number(kg)) : product;
}

export { heroMithai, mithaiArt, bakeryOven, nashtaImg };
