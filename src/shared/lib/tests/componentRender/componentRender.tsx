import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from "app/providers/StoryProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18ForTests from "shared/config/i18n/i18ForTests";
import { DeepPartial } from "shared/lib/deepPartial/deepPartial";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export default function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {}
) {
  const { route = "/", initialState } = options;

  return render(
    <StoreProvider initialState={initialState}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18ForTests}>{component}</I18nextProvider>
      </MemoryRouter>
    </StoreProvider>
  );
}
