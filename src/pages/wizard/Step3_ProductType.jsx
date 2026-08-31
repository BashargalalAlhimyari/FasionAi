/**
 * Step3_ProductType.jsx — Product type selection, filtered by selected gender.
 */
import { useWizardStore } from '../../store/wizardStore';
import {
  Shirt, Package, Layers, Star,
  Sparkles, Wind, Footprints,
  ShoppingBag, Gem, Watch,
  Baby, ScrollText, Flower2,
} from 'lucide-react';

// Products specific to each gender
const GENDER_PRODUCTS = {
  men: [
    { id: 'shirts',  label: 'قمصان وتيشيرتات',  Icon: Shirt },
    { id: 'pants',   label: 'بناطيل وجينز',       Icon: Package },
    { id: 'jackets', label: 'جاكيتات وسترات',    Icon: Layers },
    { id: 'thobes',  label: 'ثياب وأزياء رسمية', Icon: ScrollText },
  ],
  women: [
    { id: 'dresses',  label: 'فساتين',         Icon: Sparkles },
    { id: 'abayas',   label: 'عبايات',          Icon: Wind },
    { id: 'blouses',  label: 'بلايز وتنانير',   Icon: Flower2 },
    { id: 'pants_w',  label: 'بناطيل نسائية',   Icon: Package },
  ],
  kids: [
    { id: 'kids_sets',   label: 'طقم أطفال',    Icon: Baby },
    { id: 'kids_shirts', label: 'قمصان أطفال',  Icon: Shirt },
    { id: 'kids_pants',  label: 'بناطيل أطفال', Icon: Package },
    { id: 'girls_dress', label: 'فساتين بنات',  Icon: Star },
  ],
};

const SHARED_PRODUCTS = [
  { id: 'shoes',       label: 'أحذية',    Icon: Footprints },
  { id: 'bags',        label: 'حقائب',    Icon: ShoppingBag },
  { id: 'accessories', label: 'إكسسوار',  Icon: Gem },
  { id: 'watches',     label: 'ساعات',    Icon: Watch },
];

function ProductCard({ item, isSelected, onClick }) {
  const { Icon } = item;
  return (
    <button
      onClick={onClick}
      style={{
        padding: '1rem 0.625rem',
        borderRadius: '1rem',
        border: `1.5px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
        background: isSelected ? 'rgba(156,122,46,0.12)' : 'rgba(255,255,255,0.03)',
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.2s', outline: 'none',
        boxShadow: isSelected ? '0 0 14px rgba(156,122,46,0.2)' : 'none',
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        <Icon size={20} color={isSelected ? '#D4AF37' : 'rgba(255,255,255,0.6)'} strokeWidth={1.75} />
      </div>
      <div style={{
        fontWeight: 600, fontSize: '0.75rem',
        color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.75)',
        lineHeight: 1.3, fontFamily: 'Cairo, sans-serif',
      }}>
        {item.label}
      </div>
      {isSelected && (
        <div style={{
          position: 'absolute', top: '5px', left: '5px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: '#D4AF37',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.55rem', color: '#0D0D0D', fontWeight: 700,
        }}>✓</div>
      )}
    </button>
  );
}

export default function Step3_ProductType() {
  const { gender, productType, setProductType } = useWizardStore();
  const genderProducts = GENDER_PRODUCTS[gender] ?? [];
  const GENDER_LABELS = { men: 'الرجالية', women: 'النسائية', kids: 'الأطفال' };

  return (
    <div dir="rtl">
      <h2 style={headingStyle}>نوع المنتج</h2>
      <p style={subStyle}>اختر نوع المنتج الذي ترغب في تصميمه.</p>

      {/* Gender-specific */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={sectionLabelStyle}>منتجات {GENDER_LABELS[gender] ?? ''}</div>
        <div style={gridStyle}>
          {genderProducts.map((item) => (
            <ProductCard
              key={item.id} item={item}
              isSelected={productType === item.id}
              onClick={() => setProductType(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Shared */}
      <div>
        <div style={sectionLabelStyle}>منتجات مشتركة</div>
        <div style={gridStyle}>
          {SHARED_PRODUCTS.map((item) => (
            <ProductCard
              key={item.id} item={item}
              isSelected={productType === item.id}
              onClick={() => setProductType(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const headingStyle = {
  fontSize: '1.3rem', fontWeight: 700, color: '#fff',
  marginBottom: '0.5rem', fontFamily: 'Cairo, sans-serif',
};
const subStyle = {
  fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)',
  marginBottom: '1.5rem', lineHeight: 1.6,
};
const sectionLabelStyle = {
  fontSize: '0.72rem', fontWeight: 600,
  color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em',
  marginBottom: '0.75rem', textTransform: 'uppercase',
};
const gridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.625rem',
};
