import React from "react";
import { Breadcrumb } from 'antd'
import { FiHome } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import {capitalize} from "../../utils";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
       .ant-breadcrumb ol li{
            display: flex;
            height: 15px;
            align-items: center;
       }
    `

const PageCrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    return (
        <>
            <GlobalStyles/>
            <Breadcrumb className={'flex'} separator={<IoIosArrowForward/>}>
                {
                    pathSnippets.map((_, index) => {
                        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                        return (
                            <Breadcrumb.Item key={url} style={{ fontSize: index === 0 && 16}}>
                                {
                                    isNaN(parseInt(pathSnippets[index])) &&
                                        <Link to={index === 0 ? '/' : url} style={{
                                            color: index === pathSnippets.length -1 && 'var(--Primary-700)',
                                            fontSize: 14
                                        }}>
                                            {
                                                index === 0 ? <FiHome style={{ color: 'var(--Gray-500)', fontSize: 16}}/> :
                                                    capitalize(decodeURIComponent(pathSnippets[index]).replace('-',' '))
                                            }
                                        </Link>
                                }

                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </>
    )
};

PageCrumbs.defaultProps = {

}

PageCrumbs.propTypes = {

}

export default PageCrumbs;
