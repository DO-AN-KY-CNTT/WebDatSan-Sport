import React, { useState } from 'react';
import { BriefcaseBusiness, LockKeyhole, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/common/Toast';
import { AuthShell } from '../../components/layout/AuthShell';
import { Button, FormField } from '../../components/ui';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const from = (location.state as any)?.from?.pathname;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) { showToast('Vui lòng nhập đầy đủ email và mật khẩu', 'error'); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      showToast(`Đăng nhập thành công! Chào mừng ${user.fullName}`, 'success');
      if (from) navigate(from, { replace: true }); else if (user.role === 'admin') navigate('/admin'); else if (user.role === 'manager') navigate('/manager'); else if (user.role === 'staff') navigate('/staff'); else navigate('/');
    } catch (error: any) { showToast(error.response?.data?.message || 'Email hoặc mật khẩu không chính xác', 'error'); } finally { setLoading(false); }
  };

  const quickLogin = (demoEmail: string) => { setEmail(demoEmail); setPassword('password123'); };
  const demos = [{ email: 'admin@sportbooking.com', label: 'Admin Demo', icon: ShieldCheck }, { email: 'manager@sportbooking.com', label: 'Manager Demo', icon: BriefcaseBusiness }, { email: 'staff@sportbooking.com', label: 'Staff Demo', icon: UserCheck }, { email: 'customer@sportbooking.com', label: 'Customer Demo', icon: UserCheck }];

  return <AuthShell title="Đăng nhập" subtitle={<>Chưa có tài khoản? <Link to="/register" className="font-bold text-[var(--sb-accent)] hover:underline">Đăng ký tài khoản mới</Link></>} footer={<span>Mật khẩu demo: <strong className="font-mono text-[var(--sb-ink)]">password123</strong></span>}><form onSubmit={handleSubmit} className="space-y-5"><FormField label="Email" htmlFor="login-email" required><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="sb-field pl-10" autoComplete="email" required /></div></FormField><FormField label="Mật khẩu" htmlFor="login-password" required><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--sb-ink-3)]" /><input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="sb-field pl-10" autoComplete="current-password" required /></div></FormField><Button type="submit" tone="accent" fullWidth loading={loading}>Đăng nhập</Button></form><div className="mt-7 border-t border-[var(--sb-line)] pt-5"><p className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--sb-ink-3)]">1-click tài khoản demo</p><div className="mt-3 grid grid-cols-2 gap-2">{demos.map(({ email: demoEmail, label, icon: Icon }) => <button key={demoEmail} type="button" onClick={() => quickLogin(demoEmail)} className="flex items-center gap-2 rounded-[var(--sb-radius)] border border-[var(--sb-line)] bg-[#fffafa] px-3 py-2.5 text-left text-xs font-bold text-[var(--sb-ink-2)] transition-colors hover:border-[var(--sb-accent)] hover:text-[var(--sb-accent)]"><Icon className="h-4 w-4 shrink-0 text-[var(--sb-accent)]" />{label}</button>)}</div></div></AuthShell>;
};
