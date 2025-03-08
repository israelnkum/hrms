import PropTypes from "prop-types";
import AppMenus from "./app-menus";
import {useAppSelector} from "../../hooks";

interface Props {
    collapsed?: boolean
}
function AppSidebar({ collapsed = false }: Props) {
    const {loggedInUser } = useAppSelector((state) => state.user)

    return (
        <div className={'shadow-lg h-screen'}>
            <AppMenus collapsed={collapsed} name={loggedInUser?.name}/>
        </div>
    )
}

AppSidebar.propTypes = {
    collapsed: PropTypes.bool,
}

export default AppSidebar
