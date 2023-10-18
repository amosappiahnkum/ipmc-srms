export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: [],
        icon: 'home'
    },
    {
        title: 'Enquiries',
        link: '/enquires',
        children: [],
        permissions: [],
        icon: 'enquiries'
    },
    {
        title: 'Students',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Student',
                link: '/students/form',
            },
            {
                permission: '',
                modal: false,
                title: 'All Students',
                link: '/students',
            }
        ],
        permissions: [],
        icon: 'students'
    },
    {
        title: 'Instructors',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Instructor',
                link: '/instructors/form',
            },
            {
                permission: '',
                modal: false,
                title: 'All Instructors',
                link: '/instructors',
            }
        ],
        permissions: [],
        icon: 'teachers'
    },
    {
        title: 'Programs',
        link: '/programs',
        children: [],
        permissions: [],
        icon: 'program'
    },
    {
        title: 'Batches',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Batch',
                link: '/batches/form',
            },
            {
                permission: '',
                modal: false,
                title: 'All Batches',
                link: '/batches',
            }
        ],
        permissions: [],
        icon: 'batch'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
