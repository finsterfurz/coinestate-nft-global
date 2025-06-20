import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock Web3 to avoid errors in tests
const mockWeb3 = {
  ethereum: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  }
};

Object.defineProperty(window, 'ethereum', {
  value: mockWeb3.ethereum,
  writable: true
});

describe('App', () => {
  test('renders CoinEstate branding', () => {
    render(<App />);
    const brandElement = screen.getByText(/CoinEstate/i);
    expect(brandElement).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<App />);
    const dashboardLink = screen.getByRole('button', { name: /dashboard/i });
    const projectsLink = screen.getByRole('button', { name: /projects/i });
    
    expect(dashboardLink).toBeInTheDocument();
    expect(projectsLink).toBeInTheDocument();
  });

  test('displays legal compliance banner', () => {
    render(<App />);
    const legalText = screen.getByText(/governance credential/i);
    expect(legalText).toBeInTheDocument();
  });

  test('theme toggle functionality', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeToggle);
    
    // Check if dark mode is applied (this would need more specific implementation)
    expect(document.body.className).toContain('dark');
  });

  test('wallet connection flow', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to dashboard
    const dashboardButton = screen.getByRole('button', { name: /get access/i });
    await user.click(dashboardButton);
    
    // Check if wallet connection prompt appears
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    expect(connectButton).toBeInTheDocument();
  });

  test('displays project portfolio information', () => {
    render(<App />);
    
    // Check for property values and locations
    const viennaProperty = screen.getByText(/Vienna/i);
    const berlinProperty = screen.getByText(/Berlin/i);
    
    expect(viennaProperty).toBeInTheDocument();
    expect(berlinProperty).toBeInTheDocument();
  });

  test('accessibility compliance', () => {
    render(<App />);
    
    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    
    // Check for proper button labels
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  test('responsive design elements', () => {
    render(<App />);
    
    // Check for mobile menu (hidden by default on desktop)
    const mobileMenuButton = screen.getByLabelText(/menu/i);
    expect(mobileMenuButton).toBeInTheDocument();
  });

  test('legal disclaimer compliance', () => {
    render(<App />);
    
    // Ensure no prohibited investment language
    const pageText = document.body.textContent;
    expect(pageText).not.toMatch(/investment|security|yield guaranteed/i);
    
    // Ensure proper legal language is present
    expect(pageText).toMatch(/governance|access credential|cayman islands/i);
  });

  test('NFT access simulation', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to dashboard and simulate wallet connection
    const dashboardButton = screen.getByRole('button', { name: /dashboard/i });
    await user.click(dashboardButton);
    
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    await user.click(connectButton);
    
    // Wait for mock connection to complete
    await screen.findByText(/wallet connected/i, {}, { timeout: 3000 });
    
    // Check for NFT access indicators
    const nftAccess = screen.getByText(/governance key/i);
    expect(nftAccess).toBeInTheDocument();
  });
});

describe('Legal Compliance', () => {
  test('does not contain investment terminology', () => {
    render(<App />);
    const prohibitedTerms = ['investment', 'security', 'profit guaranteed', 'yield guarantee'];
    const pageContent = document.body.textContent?.toLowerCase() || '';
    
    prohibitedTerms.forEach(term => {
      expect(pageContent).not.toContain(term);
    });
  });

  test('contains required legal disclaimers', () => {
    render(<App />);
    const requiredTerms = ['governance', 'access credential', 'cayman islands', 'foundation'];
    const pageContent = document.body.textContent?.toLowerCase() || '';
    
    requiredTerms.forEach(term => {
      expect(pageContent).toContain(term);
    });
  });

  test('KYC compliance messaging', () => {
    render(<App />);
    const kycText = screen.getByText(/kyc/i);
    expect(kycText).toBeInTheDocument();
  });
});

describe('Performance', () => {
  test('renders without performance issues', () => {
    const startTime = performance.now();
    render(<App />);
    const endTime = performance.now();
    
    // Should render in under 100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('lazy loading implementation', () => {
    render(<App />);
    
    // Check that images have proper loading attributes
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });
});
