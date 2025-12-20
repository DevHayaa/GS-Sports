/**
 * Admin Authentication API Service
 */

import { postApi, postApiOTPVerifyuser } from './apiService';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
    token: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * Admin Login (Get OTP)
 * POST /api/admin/login
 */
export const adminLogin = async (
  data: AdminLoginRequest
): Promise<AdminLoginResponse> => {
  const response = await postApi('/admin/login', data);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Admin login failed');
  }
  return response.json();
};

/**
 * Verify OTP
 * POST /api/admin/verify-otp
 */
export const verifyOTP = async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
  const response = await postApiOTPVerifyuser('/admin/verify-otp', data);
  if (!response.success) {
    throw new Error(response.message || 'OTP verification failed');
  }
  return response as VerifyOTPResponse;
};

/**
 * Admin Logout
 * POST /api/admin/logout
 * Note: Uses Bearer token format as per API documentation
 */
export const adminLogout = async (adminToken: string): Promise<LogoutResponse> => {
  const response = await postApi('/admin/logout', {}, adminToken, true);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Logout failed');
  }
  return response.json();
};

