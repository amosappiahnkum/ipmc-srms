import React from "react";
import { Breadcrumb, Card } from 'antd'
import { FiHome } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { capitalize } from "../../utils";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  .ant-breadcrumb ol li {
    display: flex;
    height: 15px;
    align-items: center;
  }
`

const PageCrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    let items = [
        {
            title: <Link to={ '/' }>
                <FiHome style={ {color: 'var(--Gray-500)', marginTop: 5, fontSize: 16} }/>
            </Link>
        }
    ];

    pathSnippets.map((_, index) => {
        const url = `/${ pathSnippets.slice(0, index + 1).join('/') }`;
        isNaN(parseInt(pathSnippets[index])) &&
        items.push({
            title: <Link to={ url }>
                {
                    capitalize(decodeURIComponent(pathSnippets[index]).replace('-', ' '))
                }
            </Link>
        })
    })
    return (
        <Card className={'m-2'} size={'small'}>
            <GlobalStyles/>
            <Breadcrumb items={ items } className={ 'flex' } separator={ <IoIosArrowForward/> }/>
        </Card>
    )
};

export default PageCrumbs;
