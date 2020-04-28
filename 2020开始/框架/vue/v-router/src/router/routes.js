import Home from '../views/Home';
import Profile from '../views/Profile';
import User from '../views/User';


export default [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: Profile
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        children: [
            // {
            //     path: '',
            //     component: () => import('../views/UserAdd.vue')
            // },
            {
                path: 'add',
                component: () => import('../views/UserAdd.vue')
            },
            {
                path: 'list',
                component: () => import('../views/UserList.vue')
            }
        ]
    },
    {
        path: '*',
        redirect: {path: '/'}
    }
]