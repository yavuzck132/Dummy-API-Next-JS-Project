import { FormEvent, FunctionComponent, MouseEvent } from "react"
import { UserDto } from "@/models/user/user.dto";
import UserService from "@/services/user/user.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./UserForm.module.scss";
import { useRouter } from 'next/router';

interface FormProps {
    userId?: string
}

const UserForm: FunctionComponent<FormProps> = (props) => {

    const [emptyValue, setEmptyValue] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [userData, setUserData] = useState<UserDto>({
        firstName: "",
        lastName: "",
        picture: "",
        title: "mr",
        dateOfBirth: "",
        email: "",
        gender: "male",
        location: {
            city: "",
            country: "",
            state: "",
            street: "",
            timezone: ""
        },
        phone: "",
        registerDate: "",
        updatedDate: ""
    });

    useEffect(() => {
        if(props.userId){
            UserService.getUser(props.userId)
            .then(res=>{
                setUserData(res);
                setLoading(false);
            })
        }
        setLoading(false);
    }, [])

    const changeValue = (name: string, value: string) => {
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const changeLocationValue = (name: string, value: string) => {
        setUserData({
            ...userData,
            location: {
                ...userData.location,
                [name]: value
            }
        });
    }

    const loadImage = async (): Promise<boolean> => {
        const img = new Image();
        img.src = userData.picture ? userData.picture : "";
        return new Promise((resolve, reject) => {
            img.onload = () => {
              resolve(true); // Image loaded successfully
            };
            img.onerror = () => {
              reject(new Error('Image failed to load'));
            };
        });
    }

    const uploadData = () => {
        if(props.userId){
            UserService.updateUser({...userData, updatedDate: (new Date()).toISOString()}, props.userId).then(() => {
                setLoading(false);
                toast.success("User updated successefully!");
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }else{
            UserService.createUser({...userData, registerDate: (new Date()).toISOString(), updatedDate: (new Date()).toISOString()}).then(() => {
                setLoading(false);
                router.push('/user/list')
                toast.success("User created successefully!");
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        for (let userDataKey of Object.keys(userData)){
            if(userDataKey === "location"){
                for (let locationKey of Object.keys(userData.location)){
                    if(userData.location[locationKey as keyof typeof userData.location] === ""){
                        setEmptyValue(true);
                        setLoading(false);
                        return;
                    }
                }
            }else if(userDataKey !== "registerDate" && userDataKey !== "updatedDate"){
                if(userData[userDataKey as keyof UserDto] === ""){
                    console.log(userDataKey);
                    setEmptyValue(true);
                    setLoading(false);
                    return;
                }
            }
        }
        setEmptyValue(false);
        loadImage().then(() => {
            // Code to execute when the image is loaded successfully
            setImageError(false);
            uploadData();
        },
        error => {
            // Code to execute when there's an error loading the image
            setImageError(true);
            setLoading(false);
            toast.error(error.message);
        });
        
    };

    const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(props.userId){   
            UserService.deleteUser(props.userId).then(
                () => {
                    setLoading(false);
                    toast.success("User was successefully removed!");
                    window.history.go(-2)
                },
                error => {
                    setLoading(false);
                    toast.error(error.response.data.message ? error.response.data.message : error.message);
                });
        }
    }

    if(isLoading === true) return <>Loading...</>
    return <>
        <div className={styles.formWrap}>
            <h1>{props.userId ? `Edit User` : `Create User`}</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                {emptyValue ? <p className={styles.errorMessage}>Please fill all the values.</p> : <></>}
                {imageError ? <p className={styles.errorMessage}>Cannot find provided image text. Please type in online image link.</p> : <></>}
                <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input value={userData.firstName} onChange={(e)=>{changeValue("firstName", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input value={userData.lastName} onChange={(e)=>{changeValue("lastName", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Image</label>
                    <input value={userData.picture} onChange={(e)=>{changeValue("picture", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Title</label>
                    <select value={userData.title} onChange={(e)=>{changeValue("title", e.target.value)}}>
                        <option value="mr">mr</option>
                        <option value="miss">miss</option>                    
                        <option value="mrs">mrs</option>
                        <option value="ms">ms</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>City</label>
                    <input value={userData.location.city} onChange={(e)=>{changeLocationValue("city", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Country</label>
                    <input value={userData.location.country} onChange={(e)=>{changeLocationValue("country", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>State</label>
                    <input value={userData.location.state} onChange={(e)=>{changeLocationValue("state", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>street</label>
                    <input value={userData.location.street} onChange={(e)=>{changeLocationValue("street", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Timezone</label>
                    <input value={userData.location.timezone} onChange={(e)=>{changeLocationValue("timezone", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input value={userData.phone} onChange={(e)=>{changeValue("phone", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Date of birth</label>
                    <DatePicker onChange={(value) => {
                    if(value instanceof Date) changeValue("dateOfBirth", value.toISOString())}} 
                    selected={userData.dateOfBirth !== "" ? new Date(userData.dateOfBirth) : null} 
                    onKeyDown={(e) => {e.preventDefault()}}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" value={userData.email} onChange={(e)=>{changeValue("email", e.target.value)}} disabled={props.userId ? true : false}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Gender</label>
                    <select value={userData.gender} onChange={(e)=>{changeValue("gender", e.target.value)}}>
                        <option value="male">male</option>
                        <option value="female">female</option>  
                    </select>
                </div>
                <div className={styles.buttonWrap}>
                    <button type="submit" className={styles.submitButton}>{props.userId ? `Update User` : `Create User`}</button>
                    {props.userId ? <button onClick={(e) => onDelete(e)} className={styles.deleteButton}>Delete User</button> : <></>}
                </div>
            </form>
        </div>
    </>
}

export default UserForm;