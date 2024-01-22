import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import 'resize-observer-polyfill';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});