import React, { useEffect, useState } from 'react';
import { ArrowUpDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import type { ApiResponse, Court } from '../../types';
import { Button, EmptyState, FilterBar, Pagination, PageHeader } from '../../components/ui';
import { CourtCard } from '../../components/customer/CourtCard';

export const SearchCourtsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [district, setDistrict] = useState(searchParams.get('district') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'rating');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 600000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (type !== 'all') params.set('type', type);
      if (district !== 'all') params.set('district', district);
      if (sortBy) params.set('sortBy', sortBy);
      if (maxPrice) params.set('maxPrice', maxPrice.toString());
      if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
      params.set('page', page.toString());
      params.set('limit', '9');
      const res = await api.get<ApiResponse<{ courts: Court[]; pagination: any }>>(`/courts?${params.toString()}`);
      if (res.data.success) { setCourts(res.data.data.courts); setTotal(res.data.data.pagination.total); setTotalPages(res.data.data.pagination.totalPages); }
    } catch (error) { console.error('Error fetching search courts:', error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchCourts(); }, [type, district, sortBy, page, maxPrice, selectedAmenities]);

  const handleSearchSubmit = (event: React.FormEvent) => { event.preventDefault(); setPage(1); fetchCourts(); };
  const toggleAmenity = (amenity: string) => { setSelectedAmenities((prev) => prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]); setPage(1); };
  const clearFilters = () => { setSearch(''); setType('all'); setDistrict('all'); setMaxPrice(600000); setSelectedAmenities([]); setSortBy('rating'); setPage(1); };

  const filters = <FilterBar title="Bộ lọc tìm kiếm" onReset={clearFilters}>
    <form onSubmit={handleSearchSubmit} className="relative"><label htmlFor="court-search" className="sb-field-label">Từ khóa</label><input id="court-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tên sân hoặc địa chỉ..." className="sb-field pr-10" /><button type="submit" aria-label="Tìm theo từ khóa" className="absolute right-3 top-8 text-[var(--sb-ink-3)] hover:text-[var(--sb-accent)]"><Search className="h-4 w-4" /></button></form>
    <label className="block"><span className="sb-field-label">Môn thể thao</span><select value={type} onChange={(event) => { setType(event.target.value); setPage(1); }} className="sb-field"><option value="all">Tất cả môn</option><option value="football">Bóng đá</option><option value="badminton">Cầu lông</option><option value="tennis">Tennis</option><option value="pickleball">Pickleball</option><option value="basketball">Bóng rổ</option><option value="volleyball">Bóng chuyền</option></select></label>
    <label className="block"><span className="sb-field-label">Khu vực / Quận</span><select value={district} onChange={(event) => { setDistrict(event.target.value); setPage(1); }} className="sb-field"><option value="all">Tất cả quận</option><option value="Quận 1">Quận 1</option><option value="Quận 7">Quận 7</option><option value="Quận 10">Quận 10</option><option value="Bình Thạnh">Bình Thạnh</option><option value="Phú Nhuận">Phú Nhuận</option><option value="Tân Bình">Tân Bình</option><option value="Thủ Đức">TP. Thủ Đức</option></select></label>
    <div><div className="flex items-center justify-between gap-3"><label htmlFor="max-price" className="sb-field-label mb-0">Giá tối đa / giờ</label><span className="text-xs font-bold text-[var(--sb-accent)]">{maxPrice.toLocaleString('vi-VN')} đ</span></div><input id="max-price" type="range" min={100000} max={600000} step={20000} value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} className="mt-3 w-full accent-[var(--sb-accent)]" /><div className="mt-1 flex justify-between text-[10px] text-[var(--sb-ink-3)]"><span>100.000đ</span><span>600.000đ</span></div></div>
    <div><p className="sb-field-label">Tiện ích</p><div className="space-y-2">{[{ id: 'wifi', label: 'Wifi miễn phí' }, { id: 'parking', label: 'Bãi đỗ xe' }, { id: 'shower', label: 'Phòng tắm' }, { id: 'lighting', label: 'Đèn LED thi đấu' }, { id: 'air_conditioning', label: 'Điều hòa' }].map((item) => <label key={item.id} className="flex cursor-pointer items-center gap-2 text-xs text-[var(--sb-ink-2)]"><input type="checkbox" checked={selectedAmenities.includes(item.id)} onChange={() => toggleAmenity(item.id)} className="h-4 w-4 rounded border-[var(--sb-line-strong)] accent-[var(--sb-accent)]" />{item.label}</label>)}</div></div>
  </FilterBar>;

  return <div className="sb-page"><div className="sb-shell"><PageHeader eyebrow="Khám phá địa điểm" title="Tìm sân thể thao" description="Lọc theo vị trí, môn chơi, mức giá và tiện ích để tìm một sân phù hợp với trận đấu tiếp theo." action={<Button tone="quiet" className="lg:hidden" onClick={() => setMobileFiltersOpen((open) => !open)}><SlidersHorizontal className="h-4 w-4" /> Bộ lọc</Button>} />
    <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="hidden lg:block">{filters}</aside>{mobileFiltersOpen && <div className="lg:hidden">{filters}</div>}<section className="min-w-0"><div className="flex flex-col gap-4 border-b border-[var(--sb-line)] pb-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[var(--sb-ink-2)]">Tìm thấy <strong className="text-[var(--sb-ink)]">{total}</strong> sân thể thao</p><label className="flex items-center gap-2 text-xs font-semibold text-[var(--sb-ink-2)]"><ArrowUpDown className="h-4 w-4 text-[var(--sb-accent)]" /><span>Sắp xếp</span><select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }} className="sb-field w-auto py-2"><option value="rating">Rating cao nhất</option><option value="price_asc">Giá thấp đến cao</option><option value="price_desc">Giá cao đến thấp</option><option value="newest">Mới nhất</option></select></label></div><div className="mt-6">{loading ? <div className="grid gap-5 sm:grid-cols-2"><div className="sb-skeleton h-80 rounded-[var(--sb-radius-lg)]" /><div className="sb-skeleton h-80 rounded-[var(--sb-radius-lg)]" /></div> : courts.length === 0 ? <EmptyState title="Không tìm thấy sân phù hợp" description="Hãy thử nới lỏng mức giá hoặc chọn khu vực khác để xem thêm địa điểm." action={<Button tone="quiet" onClick={clearFilters}><X className="h-4 w-4" /> Xóa bộ lọc</Button>} /> : <div className="grid gap-5 sm:grid-cols-2">{courts.map((court) => <CourtCard key={court._id} court={court} compact />)}</div>}</div><div className="mt-8"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div></section></div>
  </div></div>;
};
