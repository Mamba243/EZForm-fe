import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Sheet from '../pages/client/Sheet';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import FullScreen from '../pages/client/FullScreen';
import Edit from '../pages/question/Edit';
import Tpl from '../pages/question/Tpl';
import Statistics from '../pages/question/Statistics';
import MyProject from '../pages/manage/MyProject';
import TplCenter from '../pages/manage/TplCenter';
import Trash from '../pages/manage/Trash';
import ResultPage from '../pages/client/ResultPage';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import ClientLayout from '../layouts/ClientLayout';

// 创建路由
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: '*', // 404 路由配置，都写在最后（兜底）
                element: <NotFound />,
            },
        ]
    },
    {
        path: 'manage',
        element: <ManageLayout />,
        children: [
            {
                path: 'my',
                element: <MyProject />
            },
            {
                path: 'template',
                element: <TplCenter />
            },
            {
                path: 'trash',
                element: <Trash />
            }
        ]
    },
    {
        path: 'question',
        children: [
            {
                path: 'edit/:id',
                element: <Edit />
            },
            {
                path: 'statistics/:id',
                element: <Statistics />
            }
        ],
    },
    {
        path: 'template',
        children: [
            {
                path: 'add/:id?',
                element: <Tpl />
            },
            {
                path: 'edit/:id',
                element: <Tpl />
            }
        ],
    },
    {
        path: 'client',
        element: <ClientLayout />,
        children: [
            {
                path: ':id',
                element: <Sheet />
            },
            {
                path: 'result/:id',
                element: <ResultPage />
            }
        ],
    },
    {
        path: 'fullscreen/:id',
        element: <FullScreen />,
    },
])

export const PUB_PATH = 'http://192.168.14.127:3000/fullscreen'
export const MANAGE_INDEX_PATHNAME = '/manage/my'
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'

export default router;
