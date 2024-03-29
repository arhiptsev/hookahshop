import React from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { useObservable } from '../../utils/hooks/useObservable';
import { NotificationsService } from './notifications.service';

export const Notifications = () => {

    const notifications = useObservable(NotificationsService.getInstance().notifications$) || [];

    return (
        <AlertContainer
            position="bottom-right"
        >
            {notifications.map(({ type, header, content }, index) => (<Alert key={index} type={type} headline={header}>
                {content}
            </Alert>))}
        </AlertContainer>
    );
}
