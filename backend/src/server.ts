import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { sendSuccess } from './utils/response';

import authRoutes from './routes/authRoutes';
import courtRoutes from './routes/courtRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import employeeRoutes from './routes/employeeRoutes';
import shiftRoutes from './routes/shiftRoutes';
import workScheduleRoutes from './routes/workScheduleRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leaveRoutes from './routes/leaveRoutes';
import payrollRoutes from './routes/payrollRoutes';
import reportRoutes from './routes/reportRoutes';

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/work-schedules', workScheduleRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave-requests', leaveRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/admin/reports', reportRoutes);

// Base health check route
app.get('/api/health', (_req: Request, res: Response) => {
  return sendSuccess(res, 'Hệ thống SportBooking API đang hoạt động ổn định', {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start server function for app & tests
export const startServer = async () => {
  await connectDB();
  return app.listen(ENV.PORT, () => {
    console.log(`[SportBooking API] Server is running on http://localhost:${ENV.PORT}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
