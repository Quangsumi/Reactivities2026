import { createContext } from "react";
import { UiStore } from "./uiStore";
import CounterStore from "./counterStore";

interface Store {
    uiStore: UiStore
    counterStore: CounterStore
}

export const store: Store = {
    uiStore: new UiStore(),
    counterStore: new CounterStore()
}

export const StoreContext = createContext(store);