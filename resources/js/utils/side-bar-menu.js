export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: ['Admin'],
        icon: 'home'
    },
    {
        title: 'PIM',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Employee',
                link: '/pim/employees/form',
            },
            // {
            //     permission: '',
            //     modal: true,
            //     title: 'Upload Employees',
            //     link: '/pim/employees/upload',
            // },
            {
                permission: '',
                modal: false,
                title: 'All Employees',
                link: '/pim/employees',
            }
        ],
        permissions: ['Admin'],
        icon: 'pim'
    },
    {
        title: 'Leave Management',
        link: '#',
        children: [
            {
                permission: '',
                modal: false,
                title: 'Leave Types',
                link: '/pim/employees/form',
            },
            {
                permission: '',
                modal: false,
                title: 'Pending Requests',
                link: '/pim/employees',
            },
            {
                permission: '',
                modal: false,
                title: 'Approved Requests',
                link: '/pim/employees',
            }
        ],
        permissions: ['Admin'],
        icon: 'pim'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
