import PropTypes from 'prop-types'
import { Empty, Spin } from 'antd'

function ViewAllWrapper (props) {
    const {loading, children, noData = true} = props
    return (
        noData ? <Empty/> :
            <Spin tip={'Please Wait'} spinning={loading}>
                {!loading && children}
            </Spin>
    )
}

ViewAllWrapper.propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
    noData: PropTypes.bool,
}



export default ViewAllWrapper
