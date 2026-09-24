import React, { useState } from 'react';
import { LockKeyhole, Save, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { Button, FormField, PageHeader, SurfaceCard } from '../../components/ui';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault(); setUpdatingProfile(true);
    try { await updateProfile({ fullName, phone }); showToast('Cập nhật thông tin cá nhân thành công!', 'success'); }
    catch (error: any) { showToast(error.response?.data?.message || 'Cập nhật thất bại', 'error'); }
    finally { setUpdatingProfile(false); }
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) { showToast('Mật khẩu mới không khớp', 'error'); return; }
    if (newPassword.length < 6) { showToast('Mật khẩu mới phải có tối thiểu 6 ký tự', 'error'); return; }
    setChangingPass(true);
    try { const res = await api.put('/auth/change-password', { oldPassword, newPassword }); if (res.data.success) { showToast('Đổi mật khẩu thành công!', 'success'); setOldPassword(''); setNewPassword(''); setConfirmPassword(''); } }
    catch (error: any) { showToast(error.response?.data?.message || 'Đổi mật khẩu thất bại', 'error'); }
    finally { setChangingPass(false); }
  };

  return <div className="sb-page"><div className="sb-shell"><PageHeader eyebrow="Tài khoản" title="Hồ sơ cá nhân" description="Quản lý thông tin liên hệ và bảo mật tài khoản của bạn." /><div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]"><SurfaceCard as="aside" className="h-fit p-6"><div className="flex items-center gap-4 lg:block lg:text-center"><img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt={user?.fullName} className="h-20 w-20 rounded-full object-cover ring-4 ring-[var(--sb-accent-soft)] lg:mx-auto" /><div className="min-w-0 lg:mt-4"><h2 className="truncate text-base font-bold text-[var(--sb-ink)]">{user?.fullName}</h2><p className="mt-1 truncate text-xs text-[var(--sb-ink-3)]">{user?.email}</p></div></div><div className="mt-5 border-t border-[var(--sb-line)] pt-4 text-center"><span className="inline-flex rounded-full border border-[var(--sb-line-strong)] bg-[#fffafa] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--sb-accent)]">Vai trò: {user?.role}</span></div></SurfaceCard><div className="space-y-6"><SurfaceCard as="section" className="p-6 sm:p-7"><div className="flex items-start gap-3 border-b border-[var(--sb-line)] pb-4"><UserRound className="mt-0.5 h-5 w-5 text-[var(--sb-accent)]" /><div><h2 className="text-lg font-bold text-[var(--sb-ink)]">Thông tin chung</h2><p className="mt-1 text-xs text-[var(--sb-ink-3)]">Thông tin hiển thị trong tài khoản của bạn.</p></div></div><form onSubmit={handleUpdateProfile} className="mt-6 space-y-5"><FormField label="Họ và tên" htmlFor="profile-name" required><input id="profile-name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="sb-field" required /></FormField><FormField label="Số điện thoại" htmlFor="profile-phone" required><input id="profile-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="sb-field" required /></FormField><Button type="submit" tone="accent" loading={updatingProfile}><Save className="h-4 w-4" /> Lưu thay đổi</Button></form></SurfaceCard><SurfaceCard as="section" className="p-6 sm:p-7"><div className="flex items-start gap-3 border-b border-[var(--sb-line)] pb-4"><LockKeyhole className="mt-0.5 h-5 w-5 text-[var(--sb-accent)]" /><div><h2 className="text-lg font-bold text-[var(--sb-ink)]">Đổi mật khẩu</h2><p className="mt-1 text-xs text-[var(--sb-ink-3)]">Dùng mật khẩu dài và không trùng với tài khoản khác.</p></div></div><form onSubmit={handleChangePassword} className="mt-6 space-y-5"><FormField label="Mật khẩu hiện tại" htmlFor="old-password" required><input id="old-password" type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} className="sb-field" required /></FormField><div className="grid gap-5 sm:grid-cols-2"><FormField label="Mật khẩu mới" htmlFor="new-password" required><input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="sb-field" required /></FormField><FormField label="Xác nhận mật khẩu mới" htmlFor="confirm-password" required><input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="sb-field" required /></FormField></div><Button type="submit" tone="ink" loading={changingPass}><ShieldCheck className="h-4 w-4" /> Đổi mật khẩu</Button></form></SurfaceCard></div></div></div></div>;
};
