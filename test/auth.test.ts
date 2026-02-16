import { describe, it, expect, beforeEach, vi } from 'vitest'
import Logout, { Login, Register, getUser, User } from '../src/utils/auth'

// Mock Global Fetch
global.fetch = vi.fn() as any

describe('Authentication Service', () => {

    const mockUser: User = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'user',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        sessionStorage.clear();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('Login', () => {

        it('should store token and user on successful login', async () => {

            (fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ token: 'fake-jwt-token', user: mockUser }),
            });

            const result = await Login('test@example.com', 'password123');

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3000/auth/login',
                expect.any(Object)
            );

            expect(localStorage.getItem('token')).toBe('fake-jwt-token');
            expect(sessionStorage.getItem('user')).toBe(JSON.stringify(mockUser));
            expect(result).toEqual(mockUser);
        });

        it('should throw an error if response is not ok', async () => {

            (fetch as any).mockResolvedValueOnce({
                ok: false,
                json: async () => ({ error: 'Invalid credentials' }),
            });

            await expect(
                Login('test@example.com', 'wrong-pass')
            ).rejects.toThrow('Invalid credentials');
        });

    });

    describe('Logout', () => {

        it('should clear storage', async () => {

            localStorage.setItem('token', 'some-token');
            sessionStorage.setItem('user', JSON.stringify(mockUser));

            await Logout();

            expect(localStorage.getItem('token')).toBeNull();
            expect(sessionStorage.getItem('user')).toBeNull();
        });

    });

});
