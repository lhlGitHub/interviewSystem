import login from '../pages/login';
import register from '../pages/register';
import userManage from '../pages/admin/userManage/index';
import createUser from '../pages/admin/userManage/createUser';

import teamManage from '../pages/admin/teamManage/index';
import createTeam from '../pages/admin/teamManage/createTeam';

import resumeManage from '../pages/admin/resumeManage/index';
import createResume from '../pages/admin/resumeManage/createResume';
import resumeDetail from '../pages/admin/resumeManage/detail';

import postManage from '../pages/admin/postManage/index';
import createPost from '../pages/admin/postManage/createPost';

import interviewManage from '../pages/admin/interviewManage/index';

import home from '../pages/admin/home';
import progress from '../pages/admin/interviewManage/progress';

export const mainRoutes = [
  {
    path: '/login',
    component: login,
    name: 'login',
  },
  {
    path: '/register',
    component: register,
    name: 'register',
  },
  {
    path: '/createResume',
    component: createResume,
    name: 'createResume',
  },
  {
    path: '/resumeDetail',
    component: resumeDetail,
    name: 'resumeDetail',
  },
  {
    path: '/createUser',
    component: createUser,
    name: 'createUser',
  },
  {
    path: '/createTeam',
    component: createTeam,
    name: 'createTeam',
  },
  {
    path: '/createPost',
    component: createPost,
    name: 'createPost',
  },
  {
    path: '/progress',
    component: progress,
    name: 'progress',
  },
];

export const adminRoutes = [
  {
    path: '/admin/home',
    component: home,
    name: 'home',
    title: '工作台',
  },
  {
    path: '/admin/userManage',
    component: userManage,
    name: 'userManage',
    title: '用户管理',
  },
  {
    path: '/admin/postManage',
    component: postManage,
    title: '职位管理',
    name: 'postManage',
  },
  {
    path: '/admin/teamManage',
    component: teamManage,
    title: '团队管理',
    name: 'teamManage',
  },
  {
    path: '/admin/resumeManage',
    component: resumeManage,
    title: '简历管理',
    name: 'resumeManage',
  },

  {
    path: '/admin/interviewManage',
    component: interviewManage,
    title: '面试管理',
    name: 'interviewManage',
  },
];
