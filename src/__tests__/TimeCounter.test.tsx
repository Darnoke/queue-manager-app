import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeCounter from '../pages/Worker/TimeCounterComponent';

describe('TimeCounter', () => {
  it('displays the correct time difference', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-22T12:00:00Z'));

    render(<TimeCounter createdAt="2024-01-22T11:00:00Z" />);

    expect(screen.getByText('01:00:00')).toBeDefined();

    vi.useRealTimers();
  });
});