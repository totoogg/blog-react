import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from './AppRouter';
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile,
} from '@/shared/const/router';
import { screen } from '@testing-library/dom';
import { UserRole } from '@/entities/User';

jest.mock('@/shared/ui/deprecated/Popups', () => ({
  ListBox: jest.fn(() => <div data-testid="ListBox"></div>),
}));

describe('AppRouter', () => {
  test('should render successfully', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');

    expect(page).toBeInTheDocument();
  });

  test('not found page', async () => {
    componentRender(<AppRouter />, {
      route: '/asd',
    });

    const page = await screen.findByTestId('NotFoundPage');

    expect(page).toBeInTheDocument();
  });

  test('redirect not authorization user', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });

  test('authorization user', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _inited: true, authData: {} },
      },
    });

    const page = await screen.findByTestId('ProfilePage');

    expect(page).toBeInTheDocument();
  });

  test('not role', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _inited: true, authData: {} },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');

    expect(page).toBeInTheDocument();
  });

  test('there is role', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });
});
