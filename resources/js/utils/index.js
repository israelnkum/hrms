import Cookies from 'js-cookie'
import { Store } from './Store'
import cookie from 'cookie'
import api from './api'
export const isLoggedIn = (reqCookies = null) => {
  // if we don't have request cookies, get the cookie from client
  if (!reqCookies) {
    return !!Cookies.get('userLoggedIn')
  }

  // otherwise get cookie from server
  return !!cookie.parse(reqCookies).userLoggedIn
}

export const uploadImage = (path = 'upload', data) => {
  return new Promise((resolve, reject) => {
    api().post(`/nominee/${path}`, data).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getAge = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const activeRoles = () => {
  const state = Store.getState()
  console.log(state)
  return state.userReducer.activeRoles
}


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
                link: '/pim/add',
            },
            {
                permission: '',
                modal: true,
                title: 'Upload Employees',
                link: '/pim/upload',
            },
            {
                permission: '',
                modal: false,
                title: 'All Employees',
                link: '/pim/employees',
            }
        ],
        permissions: ['Admin'],
        icon: 'pim'
    },{
        title: 'Config',
        link: '/app/configs',
        children: [],
        permissions: ['Admin'],
        icon: 'config'
    },
]
export const ElectionDetailMenu = [
    {
        title: 'OVERVIEW',
        link: 'overview',
        children: [],
        permissions: ['Admin'],
        icon: 'candidates'
    },
    {
        title: 'CANDIDATES',
        link: 'candidates',
        children: [],
        permissions: ['Admin'],
        icon: 'candidates'
    },
    {
        title: 'NOMINEES',
        link: 'nominees',
        children: [],
        permissions: ['Admin'],
        icon: 'candidates'
    },
    {
        title: 'VOTERS',
        link: 'voters',
        children: [],
        permissions: ['Admin'],
        icon: 'voters'
    },
    {
        title: 'RESULTS',
        link: 'results',
        children: [],
        permissions: ['Admin'],
        icon: 'voters'
    }
]

export const capitalize = (word) => {
    return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const getInitials = (name) => {
    if (name === '' || name === null) {
        return 'N/A'
    }
    // eslint-disable-next-line prefer-regex-literals
    const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

    const initials = [...name.matchAll(rgx)] || []
    return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()
}

export const completeExport = (data, filename = 'report') => {

    const extension = data.type.split('/')[1] === 'pdf' ? 'pdf' : 'xlsx';

    if (extension === 'pdf'){
        const blobURL = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
        const iframe =  document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = blobURL;
        iframe.onload = function() {
            setTimeout(function() {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    }else{
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(new Blob([data]))
        link.setAttribute('download', `${filename + '.' + extension}`)
        document.body.appendChild(link)
        link.click()
    }


}
