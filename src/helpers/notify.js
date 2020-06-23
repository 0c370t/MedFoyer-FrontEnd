/*
    This file contains standard notifications that we may want to change or remove in the future
 */
import uikit from 'uikit';

export const operation_not_supported = () => {
    uikit.notification("<span uk-icon='icon: warning'></span> This operation is not supported at this time", {status: "danger"})
};