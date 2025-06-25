import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { EditableProfileCard } from './EditableProfileCard';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { profileReducer } from '../../model/slice/profileSlice';
import { screen } from '@testing-library/react';
import { $api } from '@/shared/api/api';

jest.mock('@/shared/ui/Popups', () => ({
  ListBox: jest.fn(() => <div data-testid="ListBox"></div>),
}));

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 35,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Moscow',
  username: 'XXXXX',
};

const options = {
  route: '/profile/1',
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1', username: 'XXXXX' },
    },
  },
  asyncReducers: { profile: profileReducer },
};

describe('EditableProfileCard', () => {
  test('switch readonly mode', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument();
  });

  test('click cancel value are reset', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    );

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  test('show error', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph'),
    ).toBeInTheDocument();
  });

  test('if not error that server get PUT request', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    mockPutReq.mockReturnValue(Promise.resolve({ data: profile, status: 200 }));
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
