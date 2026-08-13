# Sabir Sweets

SABIR SWEETS & BAKERS

BILINGUAL PREMIUM WEBSITE — ENGLISH + URDU

COPY-PASTE DEVELOPMENT PROMPT





ROLE



Act as a Senior Frontend Engineer, Creative Director, UI/UX Designer, Motion Designer, Branding Expert, and E-commerce Architect.



Your task is to design and develop a premium, production-ready, fully responsive bilingual website for:



SABIR SWEETS & BAKERS

Lahore, Pakistan



This is NOT a generic bakery website.



The website must combine:



PAKISTANI DESI HERITAGE

+

LAHORE FOOD CULTURE

+

MODERN LUXURY

+

PREMIUM BAKERY

+

MITHAI EXPERIENCE

+

MODERN E-COMMERCE





==================================================

1. BRAND DIRECTION

==================================================



Brand:



Sabir Sweets & Bakers



Location:



Outfall Road, Saint Nagar, Lahore, Pakistan



Google Maps:



https://maps.app.goo.gl/m7a78SMGSAJYZbRn8?g_st=ac



Brand personality:



- Traditional

- Authentic

- Warm

- Family-oriented

- Premium

- Trustworthy

- Desi

- Lahore-inspired

- Modern

- Welcoming



Core brand message:



"TRADITION IN EVERY BITE."



Urdu:



"ہر لقمے میں روایت"



Alternative English:



"Freshly Made. Traditionally Loved."



Urdu:



"تازہ تیار، روایت سے بھرپور"



The website should feel like a bakery that has deep roots in Pakistani food culture but has evolved into a modern premium brand.





==================================================

2. MOST IMPORTANT — COLOR THEME

==================================================



Use the attached color palette as the PRIMARY visual reference.



DO NOT replace the palette with generic brown/gold bakery colors.



PRIMARY COLORS:



Orange:

#FFA800



Beige:

#F0EAD6



Black:

#000000



SECONDARY COLORS:



Dark Brown:

#4D281F



Burnt Orange:

#993300



White:

#FFFFFF



Use the palette in this hierarchy:



#F0EAD6

→ Main background



#FFA800

→ Primary CTA, highlights, active states, accents



#000000

→ Typography, navbar/footer elements, strong contrast



#4D281F

→ Supporting dark sections, cards, food photography overlays



#993300

→ Secondary accent, hover states, premium details



IMPORTANT:



Orange must feel rich and energetic.



Beige must create warmth.



Black must create luxury and contrast.



Brown/burnt orange should support the palette rather than dominate it.



DO NOT use:



- Blue

- Purple

- Neon green

- Pink

- Generic gold gradients

- Excessive glassmorphism



Do not make the entire website orange.



Use:



BEIGE → large backgrounds

BLACK → typography and luxury sections

ORANGE → CTA and important visual accents

BROWN → supporting sections

BURNT ORANGE → subtle highlights





==================================================

3. DESI / LAHORI VISUAL IDENTITY

==================================================



The website must have a sophisticated Pakistani/desi identity.



Do NOT make it look like a western bakery template.



Use subtle visual references inspired by:



- Pakistani mithai shops

- Lahore street culture

- Traditional bakery packaging

- Brass serving trays

- Hand-painted signboards

- Pakistani truck-art geometry

- Mughal/Punjabi patterns

- Traditional jaali patterns

- Desi typography

- Festive food culture

- Bazaar aesthetics



BUT:



Do NOT overuse truck art.



Do NOT make the website cartoonish.



Do NOT use random cultural icons everywhere.



The desi elements should feel:



SUBTLE

PREMIUM

EDITORIAL

AUTHENTIC



Examples:



- Thin decorative borders

- Small geometric patterns

- Subtle jaali texture

- Orange line illustrations

- Traditional ornamental separators

- Brass-inspired visual details

- Handwritten-style accent labels

- Small Urdu calligraphy moments

- Patterned section dividers





==================================================

4. TYPOGRAPHY

==================================================



ENGLISH:



Headings:

Playfair Display



Body:

Poppins



Navigation / Buttons:

Montserrat



URDU:



Use:



Noto Nastaliq Urdu



or



Noto Naskh Arabic



depending on the section.



IMPORTANT:



Urdu must NOT look like English text translated into a bad font.



Urdu typography should feel intentional, elegant, and properly spaced.



For Urdu headings use a beautiful Nastaliq treatment where appropriate.



For Urdu body/UI use a highly readable Arabic/Urdu font.



Typography should change intelligently when language changes.





==================================================

5. BILINGUAL SYSTEM

==================================================



The website must support:



ENGLISH

and

اردو



Add a language switcher in the navbar:



EN | اردو



When English is selected:



- LTR layout

- English typography

- English navigation

- English buttons

- English content



When Urdu is selected:



- RTL layout

- Urdu typography

- Urdu navigation

- Urdu buttons

- Urdu content

- Correct RTL spacing

- Correct icon positioning

- Correct alignment



Do NOT simply translate text while keeping the English layout.



The entire UI must properly switch between:



LTR



and



RTL.





==================================================

6. LANGUAGE STATE

==================================================



Use a centralized language system.



Example:



language:

"en" | "ur"



Create translation files:



src/

  locales/

    en.ts

    ur.ts



Every visible text should come from the translation system.



DO NOT hardcode English text directly inside components.



Example:



t("hero.title")



English:



"Tradition in Every Bite."



Urdu:



"ہر لقمے میں روایت"



Persist language selection using localStorage.



Default language:



English



But make Urdu switching instant without page reload.





==================================================

7. TECH STACK

==================================================



Use:



React.js

Vite

TypeScript

Tailwind CSS

Framer Motion

GSAP

Lenis

React Router

Lucide React



Use clean reusable components.



Do not use unnecessary libraries.



Architecture must be scalable and backend-ready.





==================================================

8. WEBSITE ROUTES

==================================================



Create:



/

 /menu

 /menu/:category

 /product/:id

 /cakes

 /about

 /contact

 /cart

 /checkout



Prepare:



/admin



for future admin functionality.





==================================================

9. NAVBAR

==================================================



Create a premium sticky navbar.



Top announcement strip:



English:



"Freshly Made Daily • Lahore"



Urdu:



"روزانہ تازہ تیار • لاہور"



Main navigation:



Logo



Home

Menu

Cakes

About

Contact



Search

Cart



Language:



EN | اردو



CTA:



ORDER NOW



Urdu:



"ابھی آرڈر کریں"



On scroll:



Navbar transitions smoothly from transparent to:



Beige / Black



depending on section.



For Urdu:



Navbar must automatically switch to RTL.





==================================================

10. HERO SECTION

==================================================



Create a cinematic 90–100vh hero.



Use premium Pakistani mithai photography.



Visual concept:



Traditional mithai presented in a beautiful brass / ceramic serving tray.



Warm orange lighting.



Dark background.



Beige typography.



Orange highlights.



Hero should feel:



LUXURY

DESI

WARM

APPETIZING





ENGLISH VERSION:



Small label:



EST. LAHORE



Main headline:



TRADITION

IN EVERY BITE.



Description:



"Authentic sweets, freshly baked favourites, and timeless flavours made for every celebration."



Buttons:



EXPLORE MENU



ORDER NOW





URDU VERSION:



Small label:



لاہور کی روایت



Headline:



ہر لقمے میں

روایت



Description:



"خالص مٹھاس، تازہ بیکری اور وہ روایتی ذائقے جو ہر خوشی کو یادگار بنا دیں۔"



Buttons:



مینو دیکھیں



ابھی آرڈر کریں





Hero animation:



- Text reveal

- Image scale

- Subtle parallax

- Orange accent line animation

- Slow background movement



Do NOT overanimate.





==================================================

11. DESI DECORATIVE ELEMENT

==================================================



Add a subtle decorative pattern behind/around the hero.



Possible pattern:



Traditional Pakistani geometric pattern.



Use:



Orange

Burnt Orange

Black



at very low opacity.



The pattern should almost feel like premium packaging.



Do NOT make it visually distracting.





==================================================

12. SIGNATURE CATEGORIES

==================================================



Section heading:



ENGLISH:



OUR SIGNATURES



URDU:



ہماری خاص پیشکش



Categories:



Mithai

مٹھائی



Cakes

کیک



Bakery

بیکری



Biscuits

بسکٹ



Namkeen

نمکین



Nashta

ناشتہ



Desserts

میٹھے پکوان



Beverages

مشروبات



Use editorial cards.



Do NOT create eight identical boring cards.



Use varied image sizes and asymmetric layouts.





==================================================

13. BEST SELLERS

==================================================



English:



LOVED BY LAHORE



Urdu:



لاہور کے پسندیدہ ذائقے



Subtitle:



"Our most-loved favourites, freshly prepared."



Urdu:



"ہمارے سب سے پسندیدہ ذائقے، تازہ تیار کیے جاتے ہیں۔"



Products can include:



Gulab Jamun

گلاب جامن



Rasgulla

رس گلہ



Barfi

برفی



Jalebi

جلیبی



Gajar Halwa

گاجر کا حلوہ



Fresh Cream Cake

فریش کریم کیک



Chicken Patties

چکن پیٹیز



Biscuits

بسکٹ



Namkeen

نمکین



Do NOT invent actual prices.



Use:



PKR —



until real pricing is provided.





==================================================

14. PRODUCT CARD DESIGN

==================================================



Product card must contain:



Product image



Product name



Urdu name where applicable



Short description



Price



Weight / quantity



Favorite icon



Add to Cart



Quick View



English:



ADD TO CART



Urdu:



کارٹ میں شامل کریں



Hover:



Image zoom

Subtle orange border

Button movement



Do NOT make cards excessively rounded.





==================================================

15. MITHAI EXPERIENCE

==================================================



Create an editorial split section.



Image:



Close-up premium mithai.



Text:



THE ART OF MITHAI



Urdu:



مٹھائی کا فن



English copy:



"From classic favourites to festive essentials, our sweets bring the warmth and familiarity of traditional celebrations to every occasion."



Urdu:



"روایتی پسندیدہ ذائقوں سے لے کر خوشیوں کے خاص مواقع تک، ہماری مٹھائیاں ہر لمحے میں اپنائیت اور روایت کی مٹھاس بھر دیتی ہیں۔"



CTA:



EXPLORE MITHAI



Urdu:



مٹھائی دیکھیں





==================================================

16. FRESH FROM THE OVEN

==================================================



Heading:



FRESH FROM THE OVEN



Urdu:



تازہ تنور سے



Show:



Patties

Pastries

Biscuits

Bread

Cakes

Savouries



Visual style:



Warm bakery photography.



Use orange highlights.



Add subtle steam / warmth visual treatment where appropriate.





==================================================

17. NASHTA SECTION

==================================================



This section should strongly communicate Lahore/desi culture.



Heading:



START YOUR DAY THE LAHORE WAY



Urdu:



لاہوری انداز میں دن کا آغاز



Show:



Halwa

Puri

Chana

Paratha

Tea



Use:



Brass plates

Traditional tableware

Warm morning light

Desi textures



CTA:



VIEW NASHTA MENU



Urdu:



ناشتہ مینو دیکھیں



This should be one of the most visually distinctive sections.





==================================================

18. CUSTOM CAKES

==================================================



Heading:



MADE FOR YOUR MOMENTS



Urdu:



آپ کے خاص لمحوں کے لیے



Show:



Birthday

Wedding

Anniversary

Corporate

Custom



CTA:



EXPLORE CAKES



Urdu:



کیک دیکھیں



SECOND CTA:



REQUEST A CUSTOM CAKE



Urdu:



اپنے پسندیدہ کیک کا آرڈر دیں





==================================================

19. BRAND STORY

==================================================



Create an editorial story section.



Heading:



A TASTE WORTH REMEMBERING



Urdu:



ایک ذائقہ جو یاد رہ جائے



Do not invent historical facts.



Do not invent founding years.



Do not claim generations unless verified.



Use general copy around:



- Authentic taste

- Fresh preparation

- Pakistani food culture

- Lahore

- Celebrations

- Family moments

- Quality



Use photography of:



Mithai

Bakery

Hands preparing sweets

Traditional trays

Store atmosphere





==================================================

20. DESI CULTURAL STRIP

==================================================



Create a visually unique horizontal section inspired by Pakistani shop signage.



Use:



BLACK background



ORANGE typography



BEIGE details



Possible text:



"مٹھاس بھی، روایت بھی"



English:



"Sweetness. Tradition. Together."



Add subtle decorative patterns.



This section should create a memorable brand moment.





==================================================

21. CUSTOMER REVIEWS

==================================================



Heading:



LOVED BY OUR CUSTOMERS



Urdu:



ہمارے گاہکوں کا پیار



Use placeholder reviews ONLY as demo data.



Clearly structure them so actual reviews can later replace them.



Do not present fake testimonials as verified customer reviews.



Use elegant carousel.



Colors:



Beige background

Black text

Orange quotation marks





==================================================

22. LOCATION

==================================================



Heading:



VISIT SABIR



Urdu:



سبیر تشریف لائیں



Address:



Outfall Road,

Saint Nagar,

Lahore, Pakistan



Include:



Google Maps



GET DIRECTIONS



Urdu:



راستہ دیکھیں



CALL



Urdu:



کال کریں



WHATSAPP



Urdu:



واٹس ایپ



Use the provided Google Maps link.



Do NOT fabricate phone numbers.



Do NOT fabricate opening hours.





==================================================

23. MENU PAGE

==================================================



Create a complete bilingual menu.



Categories:



Mithai

مٹھائی



Cakes

کیک



Bakery

بیکری



Biscuits

بسکٹ



Desserts

میٹھے پکوان



Namkeen

نمکین



Nashta

ناشتہ



Beverages

مشروبات



Features:



Search



Filters



Categories



Sort



Product grid



Quick View



Add to Cart





==================================================

24. SEARCH

==================================================



Search must support:



English product names



AND



Urdu product names.



Example:



Searching:



"جلیبی"



should return:



Jalebi



Searching:



"Jalebi"



should also return:



جلیبی





==================================================

25. PRODUCT DETAIL

==================================================



Create premium product detail pages.



Include:



Large image gallery



Product name



Urdu product name



Description



Urdu description



Price



Weight



Quantity



Add to Cart



WhatsApp Order



Related Products



Example:



Gulab Jamun



گلاب جامن



"Soft, warm and syrup-soaked."



"نرم، گرم اور شیرے میں ڈوبی ہوئی روایتی مٹھاس۔"



Do not invent pricing.





==================================================

26. CART

==================================================



Desktop:



Slide-out cart drawer.



Mobile:



Full-screen cart.



Include:



Product

Quantity

Price

Remove

Subtotal

Delivery

Total



English:



PROCEED TO CHECKOUT



Urdu:



چیک آؤٹ کریں



Empty cart:



English:



"Your basket is waiting for something sweet."



Urdu:



"آپ کی ٹوکری کسی میٹھی چیز کی منتظر ہے۔"





==================================================

27. CHECKOUT

==================================================



Fields:



Full Name

پورا نام



Phone Number

فون نمبر



Email

ای میل



Delivery Address

ڈیلیوری کا پتہ



City

شہر



Order Notes

آرڈر نوٹس



Order summary.



Buttons:



PLACE ORDER



آرڈر مکمل کریں



ORDER VIA WHATSAPP



واٹس ایپ کے ذریعے آرڈر کریں





==================================================

28. WHATSAPP ORDER

==================================================



Prepare WhatsApp order generation.



Message format:



New Order

نیا آرڈر



Customer:

Phone:



Products:



Subtotal:



Delivery:



Total:



Address:



Notes:



Create:



WHATSAPP_NUMBER



as an environment variable.



Never invent a phone number.





==================================================

29. BACKEND READY ARCHITECTURE

==================================================



Create:



src/

  components/

  pages/

  layouts/

  data/

  services/

    api.ts

    products.ts

    orders.ts

    auth.ts

  hooks/

  types/

  utils/

  locales/

    en.ts

    ur.ts

  assets/



Products must come from a centralized data/API layer.



Do NOT hardcode product information across components.



Architecture should later support:



Backend API

Database

Admin Dashboard

Authentication

Orders

Inventory

Payments

WhatsApp





==================================================

30. ADMIN DASHBOARD PREPARATION

==================================================



Prepare:



/admin



Future admin capabilities:



Add Product

Edit Product

Delete Product

Upload Image

Change Price

Manage Categories

Featured Products

Orders

Customers

Inventory



Order status:



Pending

Confirmed

Preparing

Ready

Out for Delivery

Delivered

Cancelled



Urdu:



زیرِ التوا

تصدیق شدہ

تیاری میں

تیار

ڈیلیوری کے لیے روانہ

ڈیلیور شدہ

منسوخ





==================================================

31. ANIMATIONS

==================================================



Use:



Framer Motion

GSAP

Lenis



Animations:



- Hero reveal

- Text reveal

- Image parallax

- Product hover

- Category transitions

- Cart drawer

- Page transitions

- Scroll reveal

- Language switch transition

- Navbar transformation



Animations must feel:



Elegant

Slow

Premium

Natural



Avoid:



- Excessive bouncing

- Random spinning

- Overly flashy transitions

- Heavy animation on every element



Support:



prefers-reduced-motion





==================================================

32. RESPONSIVE DESIGN

==================================================



Perfectly support:



320px

375px

390px

414px

768px

1024px

1280px

1440px

1920px



Mobile must have:



- Proper Urdu RTL support

- Mobile navbar

- Hamburger

- Search

- Cart

- Touch-friendly buttons

- 2-column product grid

- Horizontal category scrolling

- Full-screen cart

- Optimized images





==================================================

33. RTL REQUIREMENTS

==================================================



When Urdu is selected:



HTML direction:



dir="rtl"



Layout must genuinely mirror.



For example:



English:



Logo | Navigation | Cart



Urdu:



Cart | Navigation | Logo



Icons should also be positioned correctly.



Do not simply text-align:right.



Entire layout must support RTL.



Margins

Paddings

Flex direction

Grid

Icons

Arrows

Breadcrumbs

Forms

Cart

Checkout



must all work correctly in RTL.





==================================================

34. IMAGE STYLE

==================================================



Use premium food photography.



Image direction:



- Pakistani mithai

- Jalebi

- Gulab Jamun

- Barfi

- Fresh cream cakes

- Bakery items

- Nashta

- Brass plates

- Traditional serving trays

- Warm Lahore atmosphere

- Desi table settings

- Natural textures



Lighting:



Warm

Cinematic

Rich

Appetizing



Color grading should complement:



Orange

Beige

Black

Brown





==================================================

35. DESI DETAILS

==================================================



Use small details such as:



- Traditional border patterns

- Subtle jaali texture

- Hand-painted style labels

- Urdu calligraphy

- Orange line art

- Decorative dividers

- Brass-inspired icons

- Traditional pattern overlays



But keep the overall design:



MODERN

CLEAN

LUXURIOUS





==================================================

36. SEO

==================================================



Homepage title:



Sabir Sweets & Bakers | Traditional Sweets & Bakery in Lahore



Urdu alternative:



سبیر سویٹس اینڈ بیکرز | لاہور کی روایتی مٹھائیاں اور بیکری



Meta description:



"Discover traditional Pakistani mithai, fresh bakery favourites, cakes and more from Sabir Sweets & Bakers in Lahore."



Urdu:



"لاہور میں سبیر سویٹس اینڈ بیکرز سے روایتی پاکستانی مٹھائیاں، تازہ بیکری، کیک اور مزیدار ذائقے دریافت کریں۔"



Implement:



- Semantic HTML

- Meta tags

- Open Graph

- Alt text

- Structured data

- LocalBusiness schema

- Product schema

- Clean URLs





==================================================

37. PERFORMANCE

==================================================



Optimize:



- Image loading

- Lazy loading

- Responsive images

- Code splitting

- Component rendering

- Animation performance

- Bundle size



Target excellent Lighthouse performance.





==================================================

38. ACCESSIBILITY

==================================================



Implement:



- Keyboard navigation

- Focus states

- ARIA labels

- Proper contrast

- Alt text

- Accessible forms

- Reduced motion

- Screen reader support



Both languages mu

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/138ec8e1-7914-41a4-80fd-da2220143e5c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
