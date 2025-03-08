import PopUps from "./index";
import {useNavigate} from "react-router-dom";

interface Props {
    children: any,
    extra?: any,
    className?: string,
}

export default function TlaDrawer({children, extra, className = 'w-[640px]'}: Props) {
    const navigate = useNavigate()
    return (
        <PopUps>
            <div className={`ant-drawer ant-drawer-right css-1e3x2xa ant-drawer-open`} tabIndex={-1}>
                <div className="ant-drawer-mask"></div>
                <div tabIndex={0} aria-hidden="true" data-sentinel="start"
                     style={{ width: '0px', height: '0px', overflow: 'hidden', outline: 'none', position: 'absolute' }}></div>
                <div className={`ant-drawer-content-wrapper ${className}`} >
                    <div className="ant-drawer-content" aria-modal="true" role="dialog">
                        <div className="ant-drawer-wrapper-body">
                            <div className="ant-drawer-header">
                                <div className="ant-drawer-header-title">
                                    <div className="ant-drawer-title">
                                        <button onClick={() => navigate(-1)} type="button" className="ant-btn ant-btn-default">
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="ant-drawer-extra">
                                    {extra}
                                </div>
                            </div>
                            <div className="ant-drawer-body" style={{ paddingBottom: '80px' }}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} aria-hidden="true" data-sentinel="end"
                     style={{
                         width: '0px', height: '0px', overflow: 'hidden', outline: 'none', position: 'absolute'
                     }}></div>
            </div>
        </PopUps>
    )
}
