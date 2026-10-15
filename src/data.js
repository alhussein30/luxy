// LUXY — Facebook group store (admin: Khloud). Prices: only the 150 EGP offer is published so far;
// everything else is "ask on WhatsApp" until the owner sends real prices and photos.
export const store = {
  name: "LUXY",
  group: "https://www.facebook.com/groups/252962997766528",
  // Owner's WhatsApp number goes here; while empty, order buttons open the Facebook group instead.
  whatsapp: "",
};

export const orderLink = (text) =>
  store.whatsapp ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}` : store.group;

export const products = [
  { id: "m1", name: "ساعة رجالي جلد — مينا أسود", note: "تصميم شيك وخامة عالية الجودة", cat: "men", img: "img/men1.webp", tag: "جديد" },
  { id: "w1", name: "ساعة حريمي معدن — مستطيلة ذهبي", note: "قطعة أنيقة لكل يوم", cat: "women", img: "img/w1.webp", tag: "جديد" },
  { id: "o1", name: "ساعة حريمي إسورة — روز جولد", note: "عرض خاص", cat: "offers", img: "img/offer.webp", price: 150, tag: "عرض" },
  { id: "m2", name: "ساعة رجالي جلد — كلاسيك", note: "مينا أبيض بسيط وحزام بني", cat: "men", img: "img/men2.webp" },
  { id: "w2", name: "ساعة حريمي شبك — ذهبي", note: "حزام شبك معدن ناعم", cat: "women", img: "img/w2.webp" },
  { id: "w3", name: "ساعة حريمي معدن — روز جولد", note: "لمسة لامعة للسهرات", cat: "women", img: "img/w3.webp" },
];

export const cats = [
  { key: "all", label: "الكل" },
  { key: "men", label: "رجالي" },
  { key: "women", label: "حريمي" },
  { key: "offers", label: "العروض" },
];
