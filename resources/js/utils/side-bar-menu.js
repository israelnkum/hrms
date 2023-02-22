export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: ['admin', 'super-admin', 'staff'],
        icon: 'home'
    },
    {
        title: 'PIM',
        link: '#',
        children: [
            {
                permission: 'add-employee',
                modal: true,
                title: 'Add Employee',
                link: '/pim/employees/form',
            },
            // {
            //    permissions: ['admin', 'super-admin'],
            //     modal: true,
            //     title: 'Upload Employees',
            //     link: '/pim/employees/upload',
            // },
            {
                permission: 'view-employee',
                modal: false,
                title: 'All Employees',
                link: '/pim/employees',
            }
        ],
        permissions: ['admin', 'super-admin'],
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
                link: '/pim/employees/form',
            },
            {
                permission: 'view-pending-leave-request',
                modal: false,
                title: 'Pending Requests',
                link: '/pim/employees',
            },
            {
                permission: 'view-approved-leave-request',
                modal: false,
                title: 'Approved Requests',
                link: '/pim/employees',
            }
        ],
        permissions: ['admin', 'super-admin'],
        icon: 'pim'
    },
    {
        title: 'Time Off',
        link: '#',
        children: [
            {
                permission: 'request-time-off',
                modal: true,
                title: 'Request a Time Off',
                link: '/time-off/form',
            },
            {
                permission: 'view-pending-time-off',
                modal: false,
                title: 'Pending Time Offs',
                link: '/time-off/pending',
            },
            {
                permission: 'view-approved-time-off',
                modal: false,
                title: 'Approved Time Offs',
                link: '/time-off/approved',
            }
        ],
        permissions: ['admin', 'super-admin', 'staff'],
        icon: 'time-off'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
