import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../src/hooks/useDarkMode';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock document.documentElement
const mockDocumentElement = {
  setAttribute: vi.fn(),
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
  }
};

Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('useDarkMode Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should initialize with light mode by default', () => {
    const { result } = renderHook(() => useDarkMode());
    
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should initialize with saved preference from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('true');
    
    const { result } = renderHook(() => useDarkMode());
    
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.toggleDarkMode();
    });
    
    expect(result.current.isDarkMode).toBe(true);
  });

  it('should save preference to localStorage', () => {
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.toggleDarkMode();
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkModePreference', 'true');
  });

  it('should apply theme attributes to document', () => {
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.setDarkMode(true);
    });
    
    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark-theme');
    expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('light-theme');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    // Should not throw and should default to false
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDarkMode).toBe(false);
  });
});