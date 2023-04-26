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
                permission: 'view-approved-leave',
                modal: false,
                title: 'All Leave Requests',
                link: '/leave-management/leave-requests',
            }
        ],
        permissions: ['add-leave-types', 'view-pending-leave', 'view-approved-leave', 'approve-leave', 'disapprove-leave'],
        icon: 'time-off'
    },
    {
        title: 'My Leave Requests',
        link: '#',
        children: [
            {
                permission: 'request-leave',
                modal: true,
                title: 'Make Request',
                link: '/time-off/form',
            },
            {
                permission: 'view-pending-request',
                modal: false,
                title: 'Leave Requests',
                link: '/time-offs',
            }
        ],
        permissions: ['request-time-request', 'view-pending-request', 'view-approved-request'],
        icon: 'time-off'
    },
    {
        title: 'People',
        link: '/people',
        children: [],
        permissions: [],
        icon: 'people'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
