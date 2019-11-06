import React from 'react'
import { Empty } from 'antd';

const PageNotFound = () => {
    return <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' }}>
        <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
                height: 350,
            }}
            description={
                <span>
                    Url desa tidak ditemukan
                </span>
            }
        >
        </Empty>
    </div>
}

export default PageNotFound;