import './index.css'
import {UserAccountInformation, LocationMap} from '../../Profile Section Component'

export const Section2 = ({ showditingmodal, selectcomponenttodisplay , changecomponenttodisplay }) => {
    return (
        <>
         { selectcomponenttodisplay === "accountinformation" && <UserAccountInformation showditingmodal={showditingmodal} /> }
         { selectcomponenttodisplay === "locationmap" && <LocationMap selectcomponenttodisplay={selectcomponenttodisplay}  changecomponenttodisplay={changecomponenttodisplay} /> }
        </>
    )
}