export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: [],
        icon: 'home'
    },
    {
        title: 'EMPLOYEES',
        link: '#',
        children: [
            {
                permission: 'add-employee',
                modal: true,
                title: 'Add Employee',
                link: '/employees/form',
            },
            {
                permission: 'view-employee',
                modal: false,
                title: 'All Employees',
                link: '/pim/employees',
            }
        ],
        permissions: ['add-employee', 'view-employee'],
        icon: 'pim'
    },
    {
        title: 'Leave Management',
        link: '#',
        children: [
            {
                permission: 'add-leave-types',
                modal: false,
                title: 'Leave Types',
                link: '/leave-management/leave-types',
            },
            {
                permission: 'view-pending-leave-request',
                modal: false,
                title: 'Pending Requests',
                link: '/leave-management/pending-request',
            },
            {
                permission: 'view-approved-leave-request',
                modal: false,
                title: 'Approved Requests',
                link: '/leave-management/approved-request',
            }
        ],
        permissions: ['add-leave-types', 'view-pending-leave-request', 'view-approved-leave-request'],
        icon: 'time-off'
    },
    {
        title: 'Leave Request',
        link: '#',
        children: [
            {
                permission: 'request-time-off',
                modal: true,
                title: 'Make Request',
                link: '/time-off/form',
            },
            {
                permission: 'view-pending-time-off',
                modal: false,
                title: 'Pending Request',
                link: '/time-off/pending',
            },
            {
                permission: 'view-approved-time-off',
                modal: false,
                title: 'Approved Request',
                link: '/time-off/approved',
            }
        ],
        permissions: ['request-time-off', 'view-pending-time-off', 'view-approved-time-off'],
        icon: 'time-off'
    },
    {
        title: 'People',
        link: '/people',
        children: [],
        permissions: [],
        icon: 'config'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
