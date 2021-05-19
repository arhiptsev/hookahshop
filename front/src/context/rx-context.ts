import { createContext } from "react";
import { BehaviorSubject } from "rxjs";

import { getCurrentUser } from "../common/utils/getCurrentUser";
import { CurrentUser } from "../types/user";

export class GlobalObservables {
    currentUserObservable = new BehaviorSubject<CurrentUser | null>(getCurrentUser());
    sideBarObservable = new BehaviorSubject<boolean>(true);
};

export const RxContext = createContext(new GlobalObservables());
