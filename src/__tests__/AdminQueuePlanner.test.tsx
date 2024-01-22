import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminQueuePlannerWrapComponent from '../pages/Admin/Nodes/AdminQueuePlannerWrapComponent';
import { UserProvider } from '../contexts/UserContext';

global.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('AdminQueuePlannerComponent', () => {
  it('renders correctly', () => {
    render(
    <UserProvider>
      <AdminQueuePlannerWrapComponent />
    </UserProvider>);
    
    // Checks is react flow renders correctly
    expect(screen.getByTestId('rf__wrapper')).toBeDefined(); 
    expect(screen.getByTestId('rf__minimap')).toBeDefined();
    expect(screen.getByTestId('rf__controls')).toBeDefined();
    expect(screen.getByTestId('rf__background')).toBeDefined();

    expect(screen.getByTestId('admin-queue-planner-side-component')).toBeDefined();
  });
});