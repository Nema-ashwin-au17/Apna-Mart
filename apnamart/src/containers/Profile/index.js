import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { PATHS } from '../../config'
import { useEffect, useState } from 'react'
import { getuserprofile } from '../../actions'
import { UserAccountInformation, LocationMap, NotificationModal, OrderHistory } from '../../components'
import Usercart from '../Cart'
import { Alert } from 'react-bootstrap'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RoomIcon from '@material-ui/icons/Room';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DeleteIcon from '@material-ui/icons/Delete';
import { Logoutuser, deleleteuseraccount } from '../../utils'

const Profile = ({ history }) => {
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.Profile)
    const { Name } = userprofile
    const Auth = useSelector(state => state.Auth)

    const [modal, showmodal] = useState(false)

    useEffect(() => {
        if (Auth.length !== 1 && Object.keys(userprofile).length === 0) {
            dispatch(getuserprofile())
        }

        else if (Object.keys(userprofile).length === 0 || Object.keys(userprofile).length === 1) {
            history.push(PATHS.HOME)
        }

        document.body.style.backgroundColor = "#f1f3f6"
        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [userprofile, history, dispatch, Auth])

    const [selectcomponenttodisplay, changedisplaycomponent] = useState("accountinformation")

    useEffect(() => {
        if (selectcomponenttodisplay !== "mycart") {
            document.body.style.backgroundColor = "#f1f3f6"
        }
    }, [selectcomponenttodisplay])

    return (
        <>
            {Name !== undefined &&
                <>
                    <h4 className="mb-3 mt-3 ms-5">My Profile </h4>

                    <div className="profilecontent mt-5 ms-3">
                        <div className="profileseperator1 me-3 pe-3 ps-3 pb-3">
                            <div onClick={() => changedisplaycomponent("accountinformation")} className={`imageandname pt-2 profilecontentdisplaycolor ${selectcomponenttodisplay === "accountinformation" ? "" : "cursorpointer"}`}>
                                <div className="relativeimage">
                                    <AccountCircleIcon color="primary" style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute" }}></AccountCircleIcon>
                                </div>
                                <div className="text-wrap">
                                    <span className="smalltext">Hello,</span>
                                    <p >{Name.slice(0, 35)} </p>
                                </div>
                            </div>

                            <Alert onClick={() => changedisplaycomponent("My orders")} className={`mt-5 p-2 d-flex justify-content-center ${selectcomponenttodisplay === "My orders" ? "" : "cursorpointer"}`}>
                                My Orders  <DoubleArrowIcon />
                            </Alert>

                            <Alert variant="warning" onClick={() => changedisplaycomponent("locationmap")} className={`mt-5 p-2 d-flex justify-content-center  ${selectcomponenttodisplay === "locationmap" ? "" : "cursorpointer"}`}>
                                View my location <RoomIcon style={{ color: "orange" }} />
                            </Alert>

                            <Alert variant="info" onClick={() => changedisplaycomponent("mycart")} className={`mt-5 p-2 d-flex justify-content-center ${selectcomponenttodisplay === "mycart" ? "" : "cursorpointer"}`}>
                                <span>
                                    View your cart
                                </span>
                                <ShoppingBasketIcon style={{ color: "red" }} />
                            </Alert>

                            <Alert onClick={() => Logoutuser(dispatch)} variant="light" className="mt-5 p-2 d-flex cursorpointer justify-content-center ">
                                Logout<PowerSettingsNewIcon />
                            </Alert>

                            <Alert onClick={() => deleleteuseraccount(dispatch, showmodal)} className="mt-5 p-2 d-flex cursorpointer justify-content-center" variant="danger">
                                Delete Account <DeleteIcon />
                            </Alert>

                        </div>

                        {selectcomponenttodisplay === "accountinformation" && <UserAccountInformation />}

                        {
                            selectcomponenttodisplay === "My orders" &&
                            <div  className="profileseperator2 profilecontentdisplaycolor w-50">
                                <OrderHistory profile={true} />
                            </div>
                        }

                        {selectcomponenttodisplay === "locationmap" &&
                            <div className="profileseperator2 pe-3 me-3 ps-3 pb-3  w-50">
                                <LocationMap />
                            </div>}

                        {selectcomponenttodisplay === "mycart" &&
                            <div className="profileseperator2 w-50">
                                <Usercart nomargin={true} />
                            </div>
                        }

                        <div className="profileseperator1">

                        </div>

                    </div>
                    <NotificationModal show={modal} centered={true} currentmodalmessage="Sorry you have been logged out. Please sign in to delete your account" onHide={showmodal} alertvariant="danger" successmessage="" />
                </>
            }
        </>
    )
}

export default Profile