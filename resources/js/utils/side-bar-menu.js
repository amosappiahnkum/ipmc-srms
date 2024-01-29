export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: [],
        icon: 'home'
    },
    {
        title: 'File',
        link: '#',
        children: [
            {

                permission: 'view-enquiry',
                modal: false,
                title: 'Enquiries',
                link: '/enquires'
            },
            {

                permission: 'view-registrations',
                modal: false,
                title: 'Registrations',
                link: '/registrations'
            },
            {

                permission: '',
                modal: false,
                title: 'Follow Ups',
                link: '/follow-ups'
            },
        ],
        permissions: [
            'view-enquiry'
        ],
        icon: 'enquiries'
    },
    {
        title: 'Students',
        link: '#',
        children: [
            {
                permission: 'add-student',
                modal: true,
                title: 'Add Student',
                link: '/students/form',
            },
            {
                permission: 'view-student',
                modal: false,
                title: 'All Students',
                link: '/students',
            }
        ],
        permissions: ['add-student', 'view-student'],
        icon: 'students'
    },
    {
        title: 'Staff',
        link: '#',
        children: [
            {
                permission: 'add-staff',
                modal: true,
                title: 'Add Staff',
                link: '/staff/form',
            },
            {
                permission: 'view-staff',
                modal: false,
                title: 'All Staff',
                link: '/staff',
            }
        ],
        permissions: ['add-staff', 'view-staff'],
        icon: 'teachers'
    },
    {
        title: 'Programs',
        link: '/programs',
        children: [],
        permissions: ['view-program'],
        icon: 'program'
    },
    {
        title: 'My Batches',
        link: '/my-batches',
        children: [],
        permissions: ['view-my-batches'],
        icon: 'batch'
    },
    {
        title: 'Batches',
        link: '#',
        children: [
            {
                permission: 'add-batch',
                modal: true,
                title: 'Add Batch',
                link: '/batches/form',
            },
            {
                permission: 'view-batch',
                modal: false,
                title: 'All Batches',
                link: '/batches',
            },
            {
                permission: 'generate-attendance',
                modal: true,
                title: 'Attendance',
                link: '/batches/generate-attendance',
            }
        ],
        permissions: ['add-batch', 'view-batch', 'generate-attendance'],
        icon: 'batch'
    },
    {
        title: 'My Programs',
        link: '/my-programs',
        children: [],
        permissions: ['take-exam', 'view-exam'],
        icon: 'home'
    },
    {
        title: 'Upcoming Exam',
        link: '/my-programs',
        children: [],
        permissions: ['view-exam'],
        icon: 'home'
    },
    {
        title: 'Completed Exam',
        link: '/my-programs',
        children: [],
        permissions: ['view-exam'],
        icon: 'home'
    },
    // {
    //     title: 'Config',
    //     link: '/app/configs/departments',
    //     children: [],
    //     permissions: ['Admin'],
    //     icon: 'config'
    // },
]
