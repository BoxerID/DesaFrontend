import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropType from 'prop-types';
import { replaceQueryString } from './util'

const _MyLink = ({ children, to, ...rest }) => {
    return (
        <Link to={{ pathname: to, state: { prev: `${rest.location.pathname}${rest.location.search}` } }}>
            {children}
        </Link>
    )
}

_MyLink.propTypes = {
    to: PropType.string.isRequired
}

const pop = (link, path) => {
    if (link.history.length > 1) {
        path = (link.location.state !== undefined && link.location.state.prev !== undefined) ? link.location.state.prev : path;
    }
    link.history.replace(path);
}

const push = (link, path) => {
    link.history.push(path, { prev: `${link.location.pathname}${link.location.search}` })
}

const replace = (link, path) => {
    link.history.replace(path, link.location.state)
}

const replaceQuery = (router, replace, clear = false) => {
    if (Array.isArray(replace)) {
        router.history.replace(replaceQueryString(router.location.pathname, router.location.search, replace, clear))
    } else {
        router.history.replace(replaceQueryString(router.location.pathname, router.location.search, [replace], clear))
    }
}

const MyLink = withRouter(_MyLink);

export { MyLink, pop, push, replaceQuery, replace }