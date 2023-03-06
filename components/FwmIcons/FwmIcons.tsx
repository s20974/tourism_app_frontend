import React from "react";

export const PasswordIcon = (props: {isPasswordVisible: any, setPasswordVisibility: any}) => {
    return(
        props.isPasswordVisible === false ? (
            <i className="fa-solid fa-eye" style={{cursor: 'pointer'}} onClick={
                props.setPasswordVisibility ? () => {props.setPasswordVisibility(!props.isPasswordVisible)} : undefined
            }/>
        ) : (
            <i className="fa-solid fa-eye-slash" style={{cursor: 'pointer'}} onClick={
                props.setPasswordVisibility ? () => {props.setPasswordVisibility(!props.isPasswordVisible)} : undefined
            }/>
        )
    )
}

export function MailIcon(){
    return(
        <i className="fa-solid fa-envelope"/>
    )
}

export function UserIcon(){
    return (
        <i className="fa fa-user" aria-hidden="true"/>
    )
}

export function HomeIcon(){
    return (
        <i className="fa-solid fa-house"></i>
    )
}

export function FriendIcon(){
    return (
        <i className="fa-solid fa-person-half-dress"></i>
    )
}

export function MessageIcon(){
    return (
        <i className="fa-solid fa-envelope"></i>
    )
}

export function PostsIcon(){
    return (
        <i className="fa-solid fa-photo-film"></i>
    )
}

export function TripIcon(){
    return (
        <i className="fa-solid fa-plane-departure"></i>
    )
}

export function PlaceIcon(){
    return (
        <i className="fa-solid fa-tree"></i>
    )
}

export function HotelIcon(){
    return (
        <i className="fa-solid fa-hotel"></i>
    )
}

export function CirclePlusIcon(props: {onClick: any}){
    return(
        <i className="fa-solid fa-circle-plus" onClick={props.onClick}></i>
    )
}

export function SettingsIcon(){
    return(
        <i className="fa-solid fa-gear"></i>
    )
}

export function CopyrightIcon(){
    return(
        <i className="fa-solid fa-copyright"></i>
    )
}

export function XMarkIcon(props: {onClose: any}){
    return(
        <i className="fa-solid fa-xmark" onClick={props.onClose}></i>
    )
}

export function PhoneIcon(){
    return(
        <i className="fa-solid fa-phone"></i>
    )
}

export function PlusIcon(){
    return(
        <i className="fa-solid fa-plus"></i>
    )
}

export function UserSlashIcon(){
    return(
        <i className="fa-solid fa-user-slash"></i> 
    )
}

export function WaitingIcon(){
    return(
        <i className="fa-solid fa-hourglass"></i>
    )
}

export function ImageSlashIcon(){
    return(
        <i className="fa-regular fa-image"></i>
    )
}

export function SendIcon(){
    return (
        <i className="fa-solid fa-paper-plane"></i>
    )
}

export function MessageResievedIcon(){
    return(
        <i className="fa-solid fa-check"></i>
    )
}

export function MessageDeliveredIcon(){
    return(
        <i className="fa-solid fa-check-double"></i>
    )
}

export function ScrollDownIcon(){
    return(
        <i className="fa-solid fa-chevron-down"></i>
    )
}

export function FilterIcon() {
    return (
        <i className="fa-solid fa-filter"></i>
    )
}

export function PlaneIcon() {
    return (
        <i className="fa-solid fa-plane"></i>
    )
}

export function LogoutIcon() {
    return(
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
    )
}

export function AngleIcon() {
    return (
        <i className="fa-solid fa-angle-left"></i>
    )
}

export function LocationIcon() {
    return (
        <i className="fa-solid fa-location-dot"></i>
    )
}

export function NotificationIcon() {
    return (
        <i className="fa-solid fa-bell"></i>
    )
}

export function AdminIcon() {
    return (
        <i className="fa-solid fa-lock"></i>
    )
}