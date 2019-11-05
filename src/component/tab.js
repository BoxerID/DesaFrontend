import qs from 'query-string'
import { replaceQueryString } from './util';

const useTab = (router, keyTab, defaultKeyTab) => {
    const q = qs.parse(router.location.search);
    const tabChanged = (v) => {
        router.history.replace(replaceQueryString(router.location.pathname, router.location.search, `${keyTab}=${v}`))
    }

    return {
        defaultActiveKey: q[keyTab] !== undefined ? q[keyTab] : defaultKeyTab,
        onChange: tabChanged,
    };
}

export { useTab };