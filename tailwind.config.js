module.exports = {
    content: [
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                'blue': {
                    '400': '#53B1FD',
                    '800': '#1849A9',
                },
                'error': {
                    '25': '#FFFBFA',
                    '50': '#FEF3F2',
                    '70': '#B42318',
                    '300': '#FDA29B',
                    '600': '#D92D20',
                    '700': '#B42318',
                },
                'primary': {
                    '25': '#F5FAFF',
                    '50': '#EFF8FF',
                    '100': '#D1E9FF',
                    '400': '#53B1FD',
                    '500': '#2E90FA',
                    '600': '#1570EF',
                    '700': '#175CD3',
                    '800': '#1849A9',
                    'hover': '#2E90FA'
                },
                'gray': {
                    '25': '#FCFCFD',
                    '50': '#F9FAFB',
                    '100': '#F2F4F7',
                    '200': '#EAECF0',
                    '300': '#D0D5DD',
                    '400': '#98A2B3',
                    '500': '#667085',
                    '700': '#344054',
                    '800': '#1D2939',
                    '900': '#101828',
                },
                'indigo': {
                    '50': '#EEF4FF',
                    '700': '#3538CD',
                },
                'orange': {
                    '100': '#FDEAD7',
                    '700': '#B93815',
                },
                'success': {
                    '300': '#6CE9A6',
                    '50': '#ECFDF3',
                    '700': '#027A48',
                },
                'white': '#FFFFFF',
                'violet': {
                    '100': '#ECE9FE',
                    '700': '#6927DA',
                },
                'warning': {
                    '50': '#FFFAEB',
                    '100': '#FEF0C7',
                    '300': '#FEC84B',
                    '700': '#B54708',
                },
                'rose': {
                    '300': '#FEA3B4',
                    '700': '#C01048',
                    '100': '#FFE4E8'
                }
            }
        },
    },
    plugins: [],
}
