import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/common/Toast';
import { AuthShell } from '../../components/layout/AuthShell';
import { Button, FormField } from '../../components/ui';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) { showToast('Mật khẩu xác nhận không khớp', 'error'); return; }
    if (password.length < 6) { showToast('Mật khẩu phải có ít nhất 6 ký tự', 'error'); return; }
    setLoading(true);
    try { await register({ fullName, email, phone, password }); showToast('Đăng ký tài khoản thành công!', 'success'); navigate('/'); }
    catch (error: any) { showToast(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại.', 'error'); }
    finally { setLoading(false); }
  };

  return <AuthShell title="Tạo tài khoản" subtitle={<>Đã có tài khoản? <Link to="/login" className="font-bold text-[var(--sb-accent)] hover:underline">Đăng nhập tại đây</Link></>}><form onSubmit={handleSubmit} className="space-y-4"><FormField label="Họ và tên" htmlFor="register-name" required><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="register-name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Nguyễn Văn A" className="sb-field pl-10" autoComplete="name" required /></div></FormField><FormField label="Email" htmlFor="register-email" required><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="sb-field pl-10" autoComplete="email" required /></div></FormField><FormField label="Số điện thoại" htmlFor="register-phone" required><div className="relative"><Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="register-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0912345678" className="sb-field pl-10" autoComplete="tel" required /></div></FormField><div className="grid gap-4 sm:grid-cols-2"><FormField label="Mật khẩu" htmlFor="register-password" required><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="register-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tối thiểu 6 ký tự" className="sb-field pl-10" autoComplete="new-password" required /></div></FormField><FormField label="Xác nhận mật khẩu" htmlFor="register-confirm" required><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="register-confirm" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Nhập lại mật khẩu" className="sb-field pl-10" autoComplete="new-password" required /></div></FormField></div><Button type="submit" tone="accent" fullWidth loading={loading}>Hoàn tất đăng ký <ArrowRight className="h-4 w-4" /></Button></form></AuthShell>;
};
