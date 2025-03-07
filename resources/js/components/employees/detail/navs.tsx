import TlaImage from "../../../commons/tla-image";
import MenuHelper from "../../../commons/menu-helper";
import {formatUrl} from "../../../utils";
import {useAppSelector} from "../../../hooks";

function Navs() {
    const test = [
        {
            title: 'Personal Details',
            link: formatUrl('Personal Details'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Next of kin',
            link: formatUrl('Next of kin'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Contact Details',
            link: formatUrl('Contact Details'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Job',
            link: formatUrl('Job'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Qualifications',
            link: formatUrl('Qualifications'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        /*    {
                title: 'Direct Reports',
                link: formatUrl('Direct Reports'),
                children: [],
                permissions: [],
                icon: 'home'
            },*/
        {
            title: 'Emergency Contacts',
            link: formatUrl('Emergency Contacts'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Dependents',
            link: formatUrl('Dependents'),
            children: [],
            permissions: [],
            icon: 'home'
        },
        {
            title: 'Community Services',
            link: formatUrl('Community Services'),
            children: [],
            permissions: [],
            icon: 'home'
        }
    ]
    const employee = useAppSelector(state => state.employee.employee)

    return (
        <div className={'bg-primary-800 px-4 rounded-t-lg py-10'}>
            <div className={'relative flex gap-3 items-center'}>
                <div className={'absolute top-[30px] hidden md:block'}>
                    <TlaImage size={130} src={employee.photo} name={employee.name}/>
                </div>
                <div className={'flex flex-col justify-between ml-0 md:!ml-[176px]'}>
                    <div className={'mt-3 flex justify-between items-center mb-3'}>
                        <div>
                            <h3 className={'text-2xl text-white font-bold leading-1 mb-0'}>{employee.name}</h3>
                            <p className={'text-base text-white'}>{employee.rank}</p>
                        </div>
                        <div>
                            {/*<Button type={'default'} className={'text-white hover:text-white'}>Request Change</Button>*/}
                        </div>
                    </div>
                    <div className={'w-[300px] md:w-full'}>
                        <MenuHelper menus={test} theme={'dark'} direction={'horizontal'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navs;
