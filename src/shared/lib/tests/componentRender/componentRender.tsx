import { render, RenderResult } from "@testing-library/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18ForTests from "@/shared/config/i18n/i18ForTests";
import { DeepPartial } from "../../../lib/deepPartial/deepPartial";
import { ReducersMapObject } from "@reduxjs/toolkit";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export default function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {}
): RenderResult {
  const { route = "/", initialState, asyncReducers } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        asyncReducers={asyncReducers}
        initialState={initialState as StateSchema}
      >
        <I18nextProvider i18n={i18ForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}
