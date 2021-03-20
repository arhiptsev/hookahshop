import { FetchResult } from "@apollo/client";
import { isString } from "lodash";
import { NotificationsServies } from "../common/notifications/notifications.service";
import { Notification } from "../common/notifications/types";

export type NotifyContent = string | Omit<Notification, 'type'>;

export const fetchNotifyHandler = (success: NotifyContent, error: NotifyContent) => {

    const successArgs = isString(success) ? [success] : [success.content, success.header];
    const errorArgs = isString(error) ? [error] : [error.content, error.header];

    return (res: FetchResult) => {
        const notifySerivce = NotificationsServies.getInstance();

        if (res.errors) {
            notifySerivce.addError(...errorArgs);
            return;
        }
        notifySerivce.addSuccess(...successArgs);



    }
}